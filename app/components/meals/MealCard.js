"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating, Stack } from "@mui/material";
import CartModal from "./CartModal";
import { useCart } from "../contexts/CartContext";
import { useAvailableSpots } from "../contexts/AvailableSpotsContext";
import { useReviewsAvgStars } from "../fetches/useReviewsAvgStars";

export const MealCard = ({ id, title, location, price, description, max_reservations, image }) => {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();
  const { availableSpots } = useAvailableSpots();
  const { mealAvgStars } = useReviewsAvgStars();
  const meal = { id, title, location, price, description, max_reservations, image };
  
  const mealDataWithAvgStars = mealAvgStars && mealAvgStars.length > 0 
  ? mealAvgStars.find(mealItem => mealItem.meal_id === Number(id)) 
  : null;

  const mealDataWithAvailableSpots = availableSpots && availableSpots.length > 0 
  ? availableSpots.find(mealItem => mealItem.id === Number(id)) 
  : null;

  const handleAddToCart = () => {
    if (meal && mealDataWithAvailableSpots && mealDataWithAvailableSpots.available_quantity > 0){
      addToCart(meal);
      setOpen(true)
    }
  }
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: '100%', minHeight: 450}} >
        <CardMedia sx={{ height: 260 }} image={image} title={title} />
        <CardContent>
          <Typography variant="h6" component="h6" >{title}</Typography>
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
          <Typography variant="subtitle1" component="p">{location}</Typography>
          <Typography variant="h6"  sx={{ paddingBottom: 2 }}>€{price}</Typography>
          <Typography variant="body1" component="p" sx={{ 
            marginBottom: 2, 
            overflow: 'hidden', 
            display: '-webkit-box', 
            WebkitBoxOrient: 'vertical', 
            WebkitLineClamp: 1,
            maxHeight: '1.5em',
          }}>
            {description}
          </Typography>
          {mealDataWithAvailableSpots && mealDataWithAvailableSpots.available_quantity > 0 ? (
                <Typography
                  component="div"
                  variant="h7"
                  gutterBottom
                  sx={{ color: "green" }}
                >
                  {mealDataWithAvailableSpots.available_quantity} spots left
                </Typography>
            ) : (
              <Typography
                component="div"
                variant="h7"
                gutterBottom
                sx={{ color: "red" }}
              >
                Not available
              </Typography>
            )
          }
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleAddToCart} disabled={!mealDataWithAvailableSpots || mealDataWithAvailableSpots.available_quantity === 0}>
            Add to Cart
          </Button>
          <Link href={`/meals/${id}`}>
            <Button variant="contained" color="secondary">Read More</Button>
          </Link>
        </CardActions>
      </Card>
      <CartModal open={open} handleClose={handleClose} availableSpots={availableSpots}/>
    </>
  );
};


