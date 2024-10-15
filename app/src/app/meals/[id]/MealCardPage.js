"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  Divider,
  Box,
  Rating,
  CircularProgress
} from "@mui/material";

import { useModal } from "../../../../components/contexts/ModalContext";
import CartModal from "../../../../components/meals/CartModal";
import { useCart } from "../../../../components/contexts/CartContext";
import ReviewModal from "../../../../components/reviews/ReviewModal";
import { useMeal } from "../../../../components/fetches/useMeal";
import { useReviewsMealId } from "../../../../components/fetches/useReviewsMealId";
import { useAvailableSpots } from "../../../../components/contexts/AvailableSpotsContext";
import { useReviewsAvgStars } from "../../../../components/fetches/useReviewsAvgStars";
import ReviewCard from "../../../../components/reviews/ReviewCard";


export default function MealCardPage() {
  const params = useParams();
  const id = params.id;
  const { meal, loading, error } = useMeal(id);
  const { reviews, loading: loadingReviews, error: reviewsError} = useReviewsMealId(id);
  const { availableSpots, loading: loadingAvailableSpots, error: availableSpotsError} = useAvailableSpots();
  const { mealAvgStars } = useReviewsAvgStars();
  const { addToCart } = useCart();
  const { open, handleOpen, handleClose } = useModal();
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  
  const mealDataWithAvailableSpots = availableSpots && availableSpots.length > 0 
  ? availableSpots.find(mealItem => mealItem.id === Number(id)) 
  : null;

  const mealDataWithAvgStars = mealAvgStars && mealAvgStars.length > 0 
  ? mealAvgStars.find(mealItem => mealItem.meal_id === Number(id)) 
  : null;

  const handleReviewModalOpen = () => {setReviewModalOpen(true)}
  const handleReviewModalClose = () => {setReviewModalOpen(false)}

  const handleAddToCart = () => {
    if (meal && mealDataWithAvailableSpots && mealDataWithAvailableSpots.available_quantity > 0) {
      addToCart(meal);
      handleOpen();
    } 
  }
  
  if (loading || loadingAvailableSpots || loadingReviews) {
    return <CircularProgress size="3rem" color="secondary" />;
  }
  if (error || availableSpotsError || reviewsError) {
    return <Typography color="error">{error || availableSpotsError || reviewsError}</Typography>;
  }
  if (!meal) {
    return <Typography>No meal data available</Typography>;
  }

  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ paddingBottom: 8 }}
      >
        <CardMedia
          sx={{
            height: 500,
            flex: "50%",
            border: "0px solid #ccc",
            borderRadius: "10px",
            boxShadow: 4,
          }}
          image={meal.image}
          title={meal.title}
        />
        <Stack direction="column" spacing={1} sx={{ flex: "50%" }}>
          <CardContent sx={{ paddingBottom: 0, flex: "50%" }}>
            <Typography
              gutterBottom
              variant="h4"
              component="h4"
              sx={{ color: "text.primary" }}
            >
              {meal.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ paddingBottom: 2 }}>
              {mealDataWithAvgStars ? (
                  <>
                    <Rating name="read-only" value={mealDataWithAvgStars.average_stars} readOnly/> 
                    <Typography variant="body1" component="span">{parseFloat(mealDataWithAvgStars.average_stars).toFixed(1)}</Typography>
                  </>
                ) : (
                  <Rating name="disabled" value={null} disabled />
                )
              }
            </Stack>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="p"
              sx={{ marginBottom: "0" }}
            >
              {meal.location}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              sx={{ color: "text.primary", marginBottom: "10px" }}
            >
              €{meal.price}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary", paddingBottom: "10px" }}
            >
              {meal.description}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary", paddingBottom: "10px" }}
            >
              {meal.details}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ color: "text.secondary", paddingBottom: "10px" }}
            >
              <Typography
                variant="body1"
                component="span"
                sx={{ color: "text.primary", paddingBottom: "10px" }}
              >
                Ingredients: {}
              </Typography>
              {meal.ingredients}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary", paddingBottom: "10px" }}
            >
              {meal.weight} gr.
            </Typography>
            {mealDataWithAvailableSpots && mealDataWithAvailableSpots.available_quantity > 0 ? (
                <Typography
                  component="p"
                  variant="body1"
                  gutterBottom
                  sx={{ color: "green" }}
                >
                  {mealDataWithAvailableSpots.available_quantity} spots left
                </Typography>
                ) : (
                  <Typography
                    component="p"
                    variant="body1"
                    gutterBottom
                    sx={{ color: "red" }}
                  >
                    Not available
                  </Typography>
                )
            }            
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              size="small" 
              onClick={handleAddToCart} 
              disabled={!mealDataWithAvailableSpots || mealDataWithAvailableSpots.available_quantity === 0}
            >
              Add to cart
            </Button>
            <Button variant="contained" color="secondary" size="small" onClick={handleReviewModalOpen}>
              Leave review
            </Button>
          </CardActions>
        </Stack>
      </Stack>
      <Box sx={{ marginBottom: 8 }}>
          {reviews.length ? (
            <>
              {reviews.map((review => <ReviewCard key={review.id} {...review} />))}
            </>
          ) : (
            <Typography>No reviews found.</Typography>
          )}
      </Box>
      <CartModal open={open} handleClose={handleClose} />
      <ReviewModal open={isReviewModalOpen} handleClose={handleReviewModalClose} meal={meal}/>
    </>
  );
}
