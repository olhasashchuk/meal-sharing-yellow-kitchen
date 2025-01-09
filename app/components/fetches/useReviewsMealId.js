import { useEffect, useState } from "react";

export const useReviewsMealId = (id) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!reviews) {
      setError('No reviews provided');
      setLoading(false);
      return;
    }

    const fetchReviewsMealId = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}/reviews`);
        if (!response.ok) {
          throw new Error(`Failed to fetch reviews for meal with ID ${id}, status: ${response.status}`);
        }
        const reviewsData = await response.json();
        setReviews(reviewsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsMealId();
  }, [id]);

  return { reviews, loading, error };
};