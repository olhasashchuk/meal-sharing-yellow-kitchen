import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { MealCard } from "./MealCard";

export const MealsCards = ( {displayedMeals} ) => {
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: 8 }}>
        <Grid 
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {displayedMeals.length ? (
            <>
              {displayedMeals.map((meal, index) => (
                <Grid key={`meal-${index}`} size={{ xs: 2, sm: 4, md: 4 }}>
                  <MealCard
                    id={meal.id}
                    title={meal.title}
                    location={meal.location}
                    price={meal.price}
                    description={meal.description}
                    max_reservations={meal.max_reservations}
                    image={meal.image}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <Typography>No meals found.</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};
