"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  List,
  ListItem,
  Stack,
  Typography,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../../components/contexts/CartContext";
import { useModal } from "../../../components/contexts/ModalContext";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import { reservationSubmit } from "../../../components/fetches/reservationSubmit";
import ErrorModal from "../../../components/ui/ErrorModal";

export default function ReservationForm() {
  const { open, handleOpen, handleClose } = useModal();
  const { cartMeals, totalAmount, deleteMeal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const contactData = watch();

  const handleFormSubmit = async () => {
    if (cartMeals.length === 0) {
      setError("Your cart is empty. Please add some meals before submitting.");
      setErrorModalOpen(true);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      await reservationSubmit(cartMeals, contactData, totalAmount);
      handleOpen();
      clearCart();
    } catch (error) {
      setError(error.message);
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setErrorModalOpen(false);
    setError(null);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      autoComplete="off"
      sx={{ marginBottom: 8 }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Reservation
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={10}
        sx={{ flex: 1 }}
        marginBottom={4}
      >
        <Stack sx={{ flex: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Your details
          </Typography>

          <TextField
            error={!!errors.name}
            required
            id="name"
            label="Name"
            defaultValue="John Smith"
            {...register("name", {
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name can only contain letters and spaces",
              },
              required: "Name is required",
            })}
            helperText={errors.name ? errors.name.message : ""}
            fullWidth
            sx={{ m: 1 }}
          />

          <TextField
            error={!!errors.email}
            required
            id="email"
            label="E-mail"
            defaultValue="john.smith@mail.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            helperText={errors.email ? errors.email.message : ""}
            fullWidth
            sx={{ m: 1 }}
          />

          <TextField
            error={!!errors.phone}
            required
            id="phone"
            label="Phone"
            defaultValue="123-456-7890"
            {...register("phone", {
              pattern: {
                value: /^\d{3}-\d{3}-\d{4}$/,
                message: "Phone number must be in the format 123-456-7890",
              },
              maxLength: {
                value: 12,
                message: "Phone number cannot be longer than 12 characters",
              },
              required: "Phone number is required",
            })}
            helperText={errors.phone ? errors.phone.message : ""}
            fullWidth
            sx={{ m: 1 }}
          />
        </Stack>
        <Stack sx={{ flex: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Your order
          </Typography>
          {cartMeals.map((cartMeal) => (
            <List key={cartMeal.meal.id}>
              <ListItem
                disablePadding
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
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
                <Typography>x {cartMeal.quantity}</Typography>
                <Typography>€ {cartMeal.totalPrice.toFixed(2)}</Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteMeal(cartMeal.meal.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </List>
          ))}
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "text.primary", marginBottom: 0, textAlign: "right" }}
          >
            Total amount: € {totalAmount.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" type="submit" disabled={cartMeals.length === 0 || loading}>
          {loading ? "Submitting..." : "Confirm reservation"}
        </Button>
        <Link href={`/meals`}>
          <Button variant="contained" color="secondary">
            Continue shopping
          </Button>
        </Link>
      </Stack>
      <ErrorModal
        open={errorModalOpen}
        onClose={handleCloseModal}
        message={error}
      />
      <ConfirmModal 
        open={open} 
        handleClose={handleClose}
        name="reservation" 
      />
    </Stack>
  );
}
