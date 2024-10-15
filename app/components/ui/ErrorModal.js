"use client";
import { Typography } from "@mui/material";
import { ModalFrame } from "../frames/ModalFrame";

const ErrorModal = ({ open, onClose, message }) => {
  return (
    <ModalFrame open={open} handleClose={onClose} title="Error">
      <Typography variant="body1">Opps! {message}</Typography>
    </ModalFrame>
  );
};

export default ErrorModal;