"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Typography,
  Button,
  Stack,
  TextField,
  Rating,
  Box,
} from "@mui/material";
import { ModalFrame } from "../frames/ModalFrame";
import { reviewSubmit } from "../fetches/reviewSubmit";
import ConfirmModal from "../ui/ConfirmModal";
import ErrorModal from "../ui/ErrorModal";

export default function ReviewModal({ open, handleClose, meal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const reviewData = watch();

  const handleReviewSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await reviewSubmit(meal, reviewData);
      setConfirmModalOpen(true);
    } catch (error) {
      setError(error.message);
      setErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
    setError(null);
  };

  const handleCloseConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  return (
    <ModalFrame open={open} handleClose={handleClose} title="Review">
      <Stack
        component="form"
        onSubmit={handleSubmit(handleReviewSubmit)}
        noValidate
        autoComplete="off"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={10}
          sx={{ flex: 1 }}
          marginBottom={4}
        >
          <Stack sx={{ flex: 1 }}>
            <Typography
              gutterBottom
              variant="body1"
              sx={{ color: "text.secondary" }}
            >
              Please review your experience with products and services that you
              purchased at Yellow Kitchen.
            </Typography>

            <Box sx={{ "& > legend": { mt: 2 } }}>
              <Controller
                name="stars"
                control={control}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={field.value || 0}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    size="large"
                    color="primary"
                  />
                )}
              />
              {errors.stars && (
                <Typography color="error">{errors.stars.message}</Typography>
              )}
            </Box>
            <TextField
              error={!!errors.title}
              required
              id="title"
              label="Title"
              {...register("title", {
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters long",
                },
                required: "Title is required",
              })}
              helperText={errors.title ? errors.title.message : ""}
              fullWidth
              sx={{ m: 1 }}
            />
            <TextField
              error={!!errors.description}
              required
              id="description"
              label="Your review"
              multiline
              rows={6}
              {...register("description", {
                minLength: {
                  value: 5,
                  message: "Your review must be at least 5 characters long",
                },
                required: "Your review is required",
              })}
              helperText={errors.description ? errors.description.message : ""}
              fullWidth
              sx={{ m: 1 }}
            />
          </Stack>
        </Stack>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit review"}
        </Button>
      </Stack>
      <ErrorModal
        open={errorModalOpen}
        onClose={handleCloseErrorModal}
        message={error}
      />
      <ConfirmModal
        open={confirmModalOpen}
        handleClose={handleCloseConfirmModal}
        name="review"
      />
    </ModalFrame>
  );
}
