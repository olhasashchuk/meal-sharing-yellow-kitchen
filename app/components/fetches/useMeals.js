"use client";
import { useEffect, useState } from "react";

export const useMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!meals) {
      setError('No meals provided');
      setLoading(false);
      return;
    }

    const fetchMeals = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals`);
        if (!response.ok) {
          throw new Error(`Failed to fetch meals, status: ${response.status}`);
        }
        const mealsData = await response.json();
        setMeals(mealsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return { meals, loading, error };
};
