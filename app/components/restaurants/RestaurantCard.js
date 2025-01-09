"use client";
import { Card, CardMedia } from "@mui/material";

export const RestaurantCard = ({ image, imageName, title }) => {
   return (
    <>
      <Card sx={{ maxWidth: '100%', backgroundColor: 'white' }}>
        <CardMedia sx={{ height: 260 }} image={image} title={title} />
        <CardMedia sx={{ height: 160 }} image={imageName} title={title} />
      </Card>
    </>
  );
};


