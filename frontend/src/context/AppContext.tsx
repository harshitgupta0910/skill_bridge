import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skills: string[];
  wantToLearn: string[];
  rating?: number;
  location?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      axios
        .get("https://skill-bridge-7de9.onrender.com/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = res.data;
          setUser({
            id: userData._id,
            name: userData.name,
            email: userData.email,
            avatar: userData.photo
              ? `https://skill-bridge-7de9.onrender.com${userData.photo}`
              : "",
            skills: userData.skills || [],
            wantToLearn: userData.wantToLearn || [],
            rating: 4.8,
            location: userData.location || "",
          });
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalid or expired", err);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
