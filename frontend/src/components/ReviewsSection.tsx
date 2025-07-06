import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Heart, Share2 } from 'lucide-react';

interface Review {
  _id: string;
  reviewer: { name: string; avatar: string };
  reviewee: { name: string; avatar: string };
  rating: number;
  skill: string;
  comment: string;
  date: string;
  helpful: number;
}

const ReviewsSection: React.FC<{ userId: string }> = ({ userId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    axios.get(`proxy/api/reviews/${userId}`).then((res) => {
      setReviews(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, [userId]);

  return (
    <div className="bg-white rounded-2xl shadow-sm mt-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Recent Reviews</h3>
          <span className="text-sm text-gray-600">{reviews.length} total reviews</span>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-start space-x-4">
                <img 
                  src={review.reviewer.avatar} 
                  alt={review.reviewer.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.reviewer.name}</h4>
                      <p className="text-sm text-gray-600">
                        for {review.skill}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                        <Heart className="w-4 h-4" />
                        <span>{review.helpful}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary-600">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
