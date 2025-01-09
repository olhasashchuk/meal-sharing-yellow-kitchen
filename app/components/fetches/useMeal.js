import { useEffect, useState } from "react";

export const useMeal = (id) => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No meal ID provided');
      setLoading(false);
      return;
    }

    const fetchMeal = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch meal with ID ${id}, status: ${response.status}`);
        }
        const mealData = await response.json();
        setMeal(mealData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  return { meal, loading, error };
};
