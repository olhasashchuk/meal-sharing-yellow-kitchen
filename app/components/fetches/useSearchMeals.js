"use client";
import { useEffect, useState } from "react";

export const useSearchingMeals = ({ searchValue }) => {
  const [searchingMeals, setSearchingMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      setSearchingMeals([]);
      setLoading(false);
      return;
    }

    const fetchSearchingMeals = async () => {
      try {
        if (searchValue) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals?title=${encodeURIComponent(searchValue)}`);
          if (!response.ok) {
              throw new Error(`Failed to fetch meals, status: ${response.status}`);
          }
          const mealsData = await response.json();
          setSearchingMeals(mealsData);
      }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchingMeals();
  }, [searchValue]);

  return { searchingMeals, loading, error };
};
