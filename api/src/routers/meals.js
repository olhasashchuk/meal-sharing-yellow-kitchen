import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Get all meals
mealsRouter.get("/", async (req, res) => {
  try {
    const meals = await knex.select("*").from("meal");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Adds a new meal to the database
const validParam = (meal) => {
   const { title, description, location, max_reservations, price } = meal;
   if(!title || typeof title !== "string") return ('Invalid title');
   if(!description || typeof description !== "string") return ('Invalid description');
   if(!location || typeof location !== "string") return ('Invalid location');
   if(!location || typeof max_reservations !== "number") return ('Invalid max_reservations');
   if(!location || typeof price !== "number") return ('Invalid price');

   return null
 }


mealsRouter.post("/", async (req, res) => {
   const validError = validParam(req.body);
   const existedMeal = await knex("meal").where({ title: req.body.title }).first();
   
   try {
      if(validError) {
         return res.status(404).json({ message: validError });
      }
      
      if(existedMeal) {
         return res.status(404).json({ message: 'Meal with this title was existed' });
      }

      const [newMeal] = await knex('meal').insert(req.body);
      res.status(201).json(newMeal);
      
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });

// Returns the meal by id
mealsRouter.get("/:id", async (req, res) => {
   try {   
      const { id } = req.params;
      const mealID = await knex("meal").where({ id }).first();
      if(mealID) {
         res.json(mealID);
      } else {
         res.status(404).json({ message: "Meal can't find" });
      } 
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
 });

 //Updates the meal by id

 mealsRouter.put("/:id", async (req, res) => {
   try {   
      const { id } = req.params;
      const mealUpdate = await knex("meal").where({ id }).update(req.body);
  
      if(mealUpdate) {
         res.json(mealUpdate);
      } else {
         res.status(404).json({ message: "Meal can't find" });
      } 
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
 });

 mealsRouter.delete("/:id", async (req, res) => {
   try {   
      const { id } = req.params;
      const mealDelete = await knex("meal").where({ id }).del();
  
      if(mealDelete) {
         res.json({ message: 'Meal was deleted'});
      } else {
         res.status(404).json({ message: "Meal can't find" });
      } 
   } catch (error) {
      res.status(404).json({ error: error.message });
   }
 });

export default mealsRouter;