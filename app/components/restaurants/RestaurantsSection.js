import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import { RestaurantCard } from "./RestaurantCard";

const restaurantsData = [
  {  
    title: 'Believe Restaurant Veggie',
    image: './restaurants/image/image-believe.png', 
    imageName: './restaurants/name/name-believe.png', 
  },
  {  
    title: 'Burger D\'lice American Fooding',
    image: './restaurants/image/image-burger.png', 
    imageName: './restaurants/name/name-burger.png', 
  },
  {  
    title: 'Vietnamese Urban Food',
    image: './restaurants/image/image-vietnamese.png', 
    imageName: './restaurants/name/name-vietnamese.png', 
  },
  {  
    title: 'IL Pastificio Cucina Italiana',
    image: './restaurants/image/image-pastificio.png', 
    imageName: './restaurants/name/name-pastificio.png', 
  },
];

export const RestaurantsSection = ( ) => {
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: 8 }}>
        <Grid 
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 16 }}
        >
          {restaurantsData.length ? (
            <>
              {restaurantsData.map((restaurant, index) => (
                <Grid key={`restaurant-${index}`} size={{ xs: 2, sm: 4, md: 4 }}>
                  <RestaurantCard
                    title={restaurant.title}
                    imageName={restaurant.imageName}
                    image={restaurant.image}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <Typography>No restaurants found.</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};
