"use client";
import { Container } from "@mui/material";
import { RestaurantsSection } from "../../../components/restaurants/RestaurantsSection";
import { TitlePage } from "../../../components/ui/TitlePage";

const Restaurants = () => {
  return (
    <main>
      <Container style={{ marginTop: "6rem" }}>
        <TitlePage title="Restaurants"/>
        <RestaurantsSection /> 
      </Container>
    </main>
  );
};

export default Restaurants;