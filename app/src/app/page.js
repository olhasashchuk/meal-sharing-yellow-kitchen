"use client";
import {
  Container, Typography, CircularProgress
} from "@mui/material";
import { MealsCards } from "../../components/meals/MealsCards";
import { TitleCard } from "../../components/main/TitleCard";
import { TitleMainSection } from "../../components/ui/TitleMainSection";
import { useMealsLimit } from "../../components/fetches/useMealsLimit";
import { RestaurantsSection } from "../../components/restaurants/RestaurantsSection";
import { Work } from "../../components/main/Work";
import { Social } from "../../components/main/Social";


const Home = () => {
  const { mealsLimit, loading: mealsLimitLoading, error: mealsLimitError } = useMealsLimit();

  if (mealsLimitLoading) {
    <CircularProgress size="3rem" color="secondary" />;
  }

  if (mealsLimitError) {
    return <Typography color="error">{mealsLimitError}</Typography>;
  }

  return (
    <>
      <main>
        <Container style={{ marginTop: "6rem" }}>
          <TitleCard />
          <TitleMainSection title="Restaurants" link={`/restaurants`}/>
          <RestaurantsSection />
          <Work />
          <TitleMainSection title="Meals of the day" link={`/meals`}/>
          <MealsCards displayedMeals={mealsLimit}/> 
          <Social />
        </Container>
      </main>
    </>
  );
}

export default Home;