"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartMeals, setCartMeals] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartMeals');
    if (savedCart) {
      setCartMeals(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cartMeals.length > 0) {
      localStorage.setItem('cartMeals', JSON.stringify(cartMeals));
    }
  }, [cartMeals]);

  const addToCart = (meal) => {
    const existingMealIndex = cartMeals.findIndex(item => item.meal.id === meal.id);
 
   if (existingMealIndex !== -1) {
     const updatedCartMeals = [...cartMeals];
     updatedCartMeals[existingMealIndex].quantity += 1;
     updatedCartMeals[existingMealIndex].totalPrice += parseFloat(meal.price);
     setCartMeals(updatedCartMeals);
     localStorage.setItem('cartMeals', JSON.stringify(updatedCartMeals));
   } else {
    const newMeal = {
      meal,
      quantity: 1,
      totalPrice: parseFloat(meal.price),
    };
    setCartMeals(prevCartMeals => {
      const newCartMeals = [...prevCartMeals, newMeal];
      localStorage.setItem('cartMeals', JSON.stringify(newCartMeals));
      return newCartMeals;
    });
   } 
  };

  const incrementQuantity = (mealId) => {
    const updatedCartMeals = cartMeals.map(item => {
      if (item.meal.id === mealId) {
        return {
          ...item,
          quantity: item.quantity + 1,
          totalPrice: item.totalPrice + parseFloat(item.meal.price),
        };
      }
      return item;
    });
    setCartMeals(updatedCartMeals); 
  };

  const decrementQuantity = (mealId) => {
    const updatedCartMeals = cartMeals.map(item => {
      if (item.meal.id === mealId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
          totalPrice: item.totalPrice - parseFloat(item.meal.price),
        };
      }
      return item;
    });
    setCartMeals(updatedCartMeals);
  };

  const deleteMeal = (mealId) => {
    const deleteMeal = cartMeals.filter(item => item.meal.id !== mealId)
    setCartMeals(deleteMeal);
    localStorage.removeItem('cartMeals', deleteMeal);
  }

  const clearCart = () => {
    setCartMeals([]);
    localStorage.removeItem('cartMeals');
  };
 
  useEffect(() => {
    const newTotalAmount = cartMeals.reduce((total, item) => total + item.totalPrice, 0);
    setTotalAmount(newTotalAmount);
  }, [cartMeals]);
 
  
  const value = {
    cartMeals,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    deleteMeal,
    totalAmount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
