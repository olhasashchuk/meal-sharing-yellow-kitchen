"use client";
import { useEffect, useState } from "react";

export const sortingOptions = [
  { value: 'sort by A-Z', label: 'Sort by A-Z', sortKey: 'title', sortDir: 'asc' },
  { value: 'sort by Z-A', label: 'Sort by Z-A', sortKey: 'title', sortDir: 'desc' },
  { value: 'high price', label: 'High price', sortKey: 'price', sortDir: 'desc' },
  { value: 'low price', label: 'Low price', sortKey: 'price', sortDir: 'asc' }
];

export const useSortingMeals = ({ sortingValue }) => {
  const [sortingMeals, setSortingMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sortingValue) {
      setSortingMeals([]);
      setLoading(false);
      return;
    }

    const fetchSortingMeals = async () => {
      try {
        const selectedOption = sortingOptions.find(option => option.value === sortingValue);
        const { sortKey, sortDir } = selectedOption || {};

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/meals?sortKey=${sortKey}&sortDir=${sortDir}`
        );
      
        if (!response.ok) {
            throw new Error(`Failed to fetch meals, status: ${response.status}`);
        }
          const mealsData = await response.json();
          setSortingMeals(mealsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };
    fetchSortingMeals();
  }, [sortingValue]);

  return { sortingMeals, loading, error };
};

