"use client";
import { Box, Modal, Typography, IconButton, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "0px solid #FFFF",
  bReservationRadius: 2,
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  maxHeight: 600,
  overflowY: 'auto',
};

export const ModalFrame = ({ open, handleClose, title, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack 
          direction="row"  
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4
          }}>
          <Typography gutterBottom variant="h4" sx={{ marginBottom: 0 }}>{title}</Typography>
          <IconButton onClick={handleClose} color="primary">
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </Modal>
  );
}