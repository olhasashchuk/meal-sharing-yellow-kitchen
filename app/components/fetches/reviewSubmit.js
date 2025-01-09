export const reviewSubmit = async (meal, reviewData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: reviewData.title,
      description: reviewData.description,
      stars: reviewData.stars,
      meal_id: meal.id,
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