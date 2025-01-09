import Container from "@mui/material/Container";
import MealCardPage from "./MealCardPage";

export const Meals = () => {
  return (
    <main>
      <Container style={{ marginTop: "6rem" }}>
        <MealCardPage />
      </Container>
    </main>
  );
};

export default Meals;
