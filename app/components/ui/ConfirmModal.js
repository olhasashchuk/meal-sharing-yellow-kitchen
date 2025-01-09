"use client";
import { Typography } from "@mui/material";
import { ModalFrame } from "../frames/ModalFrame";

export default function ConfirmModal({ open, handleClose, name }) {
  return (
    <ModalFrame open={open} handleClose={handleClose} title="Message">
        <Typography variant="body1" sx={{ marginBottom: 4 }}>Thank you! Your {name} was successfully registered!</Typography>
    </ModalFrame>
  );
}