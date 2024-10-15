export const reservationSubmit = async (cartMeals, contactData, totalAmount) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact_name: contactData.name,
      contact_email: contactData.email,
      contact_phonenumber: contactData.phone,
      total_amount: totalAmount,
      meals: cartMeals.map((cartMeal) => ({
        id: cartMeal.meal.id,
        quantity: cartMeal.quantity,
      })),
    }),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "Failed to parse error message" };
    }
    throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
  }
};
   



