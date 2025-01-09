"use client";
import { useEffect, useState } from "react";

export const useMealsLimit = () => {
  const [mealsLimit, setMealsLimit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealsLimit) {
      setError('No meals provided');
      setLoading(false);
      return;
    }

    const fetchMealsLimit = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals?limit=3`);
        if (!response.ok) {
          throw new Error(`Failed to fetch meals, status: ${response.status}`);
        }
        const mealsLimitData = await response.json();
        setMealsLimit(mealsLimitData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsLimit();
  }, []);

  return { mealsLimit, loading, error };
};