"use client";
import { Card, CardContent, Typography, Rating } from "@mui/material";

const ReviewCard = ({ title, stars, description, created_date }) => {
  const formattedDate = new Date(created_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <>
      <Card sx={{ marginBottom: 2}} >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" component="h6">{title}</Typography>
          <Typography variant="body1" component="p" sx={{ paddingBottom: 2 }}>{formattedDate}</Typography>
          <Rating name="read-only" value={stars} readOnly sx={{ paddingBottom: 2 }}/>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ReviewCard