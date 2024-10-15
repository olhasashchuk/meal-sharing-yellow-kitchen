"use client";
import { useEffect, useState } from "react";

export const useReviewsAvgStars = () => {
  const [mealAvgStars, setMealsAvgStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealAvgStars) {
      setMealsAvgStars([]);
      setLoading(false);
      return;
    }

    const fetchReviewsAvgStars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews?averageStars=true`);
        if (!response.ok) {
            throw new Error(`Failed to fetch average stars, status: ${response.status}`);
        }
        const mealAvgStarsData = await response.json();
        setMealsAvgStars(mealAvgStarsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAvgStars();
  }, []);

  return { mealAvgStars, loading, error };
};