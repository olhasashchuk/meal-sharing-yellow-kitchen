"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const AvailableSpotsContext = createContext();

export const AvailableSpotsProvider = ({ children }) => {
  const [availableSpots, setAvailableSpots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAvailableSpots = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meals?availableReservations=true`);
        if (!response.ok) {
          throw new Error (`Failed to fetch available spots, status: ${response.status}`);
        }
        const mealsWithAvailableSpots = await response.json();
        setAvailableSpots(mealsWithAvailableSpots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailableSpots()
  }, []);

  const value = {
    availableSpots, 
    loading, 
    error
  };

  return (
    <AvailableSpotsContext.Provider value={value}>
      {children}
    </AvailableSpotsContext.Provider>
  );
}

export const useAvailableSpots = () => {
  return useContext(AvailableSpotsContext);
};