"use client";
import { Box, Typography, IconButton, Button, Stack, Link, List, ListItem} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../contexts/CartContext';
import { ModalFrame } from "../frames/ModalFrame";
import { useAvailableSpots } from "../contexts/AvailableSpotsContext";

const CartModal = ({ open, handleClose }) => {
  const { cartMeals, incrementQuantity, decrementQuantity, totalAmount, deleteMeal } = useCart();
  const { availableSpots } = useAvailableSpots()

  return (
    <ModalFrame open={open} handleClose={handleClose} title="Cart">
        <Box>
          {cartMeals.length > 0 ? (
            <>
              {cartMeals.map(cartMeal => {
              const mealDataWithAvailableSpots = availableSpots && availableSpots.length > 0 
              ? availableSpots.find(mealItem => mealItem.id === cartMeal.meal.id)
              : null;
              return (
                <List key={cartMeal.meal.id}>
                <ListItem 
                  disablePadding 
                  direction={{ xs: "column", md: "row" }}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                  <img
                    src={cartMeal.meal.image}
                    alt={cartMeal.meal.title}
                    style={{
                      width: "100px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />                  
                  <Typography>{cartMeal.meal.title}</Typography>
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <IconButton 
                      onClick={() => decrementQuantity(cartMeal.meal.id)} 
                      disabled={cartMeal.quantity <= 1}
                      >
                      <RemoveCircleIcon />
                    </IconButton>
                    <Typography>{cartMeal.quantity}</Typography>
                    <IconButton 
                      onClick={() => incrementQuantity(cartMeal.meal.id)}
                      disabled={mealDataWithAvailableSpots ? cartMeal.quantity >= mealDataWithAvailableSpots.available_quantity : true}
                      >
                      <AddCircleIcon />
                    </IconButton>
                  </Stack>
                  
                  <Typography>€{cartMeal.totalPrice.toFixed(2)}</Typography>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteMeal(cartMeal.meal.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                </List>
              )
              })}   
            </>
          ) : (
            <Typography>Your cart is empty.</Typography>
          )}
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ color: "text.primary", marginBottom: 4, textAlign: "right" }}  
        >
          Total amount: € {totalAmount.toFixed(2)}
        </Typography> 
        <Stack 
          direction="row" 
          spacing={3} 
          sx={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Link href={`/reservations`}>
            <Button variant="contained" disabled={cartMeals.length === 0}>Go to reservation</Button>
          </Link>
          <Link href={`/meals`}>
            <Button variant="contained" color="secondary">Continue shopping</Button>
          </Link>
        </Stack> 
    </ModalFrame>
  );
}

export default CartModal;


