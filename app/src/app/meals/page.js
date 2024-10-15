"use client";
import { useState } from "react";
import {Container, Typography, CircularProgress} from "@mui/material";
import { MealsCards } from "../../../components/meals/MealsCards";
import { SearchForm } from "../../../components/ui/SearchForm";
import { useMeals } from "../../../components/fetches/useMeals";
import { useSearchingMeals } from "../../../components/fetches/useSearchMeals";
import { useSortingMeals } from "../../../components/fetches/useSortingMeals";
import { SortingMeal } from "../../../components/ui/SortingMeal";
import { TitlePage } from "../../../components/ui/TitlePage";


export const Meals = () => {
  
  const { meals, loading: mealsLoading, error: mealsError } = useMeals();
  const [searchValue, setSearchValue] = useState('');
  const [sortingValue, setSortingValue] = useState('');
  const { searchingMeals, loading: searchLoading, error: searchError } = useSearchingMeals({searchValue});
  const { sortingMeals, loading: sortingLoading, error: sortingError } = useSortingMeals({sortingValue});

  if (mealsLoading || searchLoading || sortingLoading) {
    return <CircularProgress size="3rem" color="secondary" />;
  }
  if (mealsError || searchError || sortingError) {
    return <Typography color="error">{mealsError || searchError || sortingError}</Typography>;
  }
  
  let displayedMeals = meals;

  if (searchValue) {
    displayedMeals = searchingMeals;
  } else if (sortingValue) {
    displayedMeals = sortingMeals;
  }


  return (

    <main>
      <Container style={{ marginTop: "6rem" }}>
        <TitlePage title="Meals of the day"/>
        <SearchForm setSearchValue={setSearchValue} />
        <SortingMeal setSortingValue={setSortingValue}/>
        <MealsCards displayedMeals={displayedMeals} /> 
      </Container>
    </main>
  );
};

export default Meals;