import express from "express";
import knex from "../database_client.js";
import mealsRouter from "./meals.js";
import { getTableSchema, validParam } from "../valid_data.js"

const reviewsRouter = express.Router();

// Get all reviews
reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await knex.select("*").from("review");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Adds a new review to the database

reviewsRouter.post("/", async (req, res) => {
   const dataSchema = await getTableSchema("review"); 
   const validError = validParam(req.body, dataSchema);
   const existedReview = await knex("review").where({ title: req.body.title }).first();

   try {
      if(validError) {
         return res.status(404).json({ message: validError });
      }
      
      if(existedReview) {
         return res.status(404).json({ message: 'Review with this title was existed' });
      }

      const [newReview] = await knex('review').insert(req.body);
      res.status(201).json(newReview);
      
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

//api/meals/:meal_id/reviews	GET	Returns all reviews for a specific meal.
mealsRouter.get("/:meal_id/reviews", async (req, res) => {
   try {   
      const { meal_id } = req.params;
      const reviewsForMealID = await knex('review')
        .select('review.*')
        .join('meal', 'meal.id', 'review.meal_id')
        .where('review.meal_id', meal_id);

      if(reviewsForMealID.length > 0) {
         res.json(reviewsForMealID);
      } else {
         res.status(404).json({ message: "Review can't find" });
      } 
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
});

// Returns the review by id
reviewsRouter.get("/:id", async (req, res) => {
   try {   
      const { id } = req.params;
      const reviewID = await knex("review").where({ id }).first();
      if(reviewID) {
         res.json(reviewID);
      } else {
         res.status(404).json({ message: "Review can't find" });
      } 
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
 });

 //Updates the review by id

 reviewsRouter.put("/:id", async (req, res) => {
   try {   
      const { id } = req.params;
      const reviewUpdate = await knex("review").where({ id }).update(req.body);
  
      if(reviewUpdate) {
         res.json(reviewUpdate);
      } else {
         res.status(404).json({ message: "Review can't find" });
      } 
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
 });

 reviewsRouter.delete("/:id", async (req, res) => {
   try {   
      const { id } = req.params;
      const reviewDelete = await knex("review").where({ id }).del();
  
      if(reviewDelete) {
         res.json({ message: 'Review was deleted'});
      } else {
         res.status(404).json({ message: "Review can't find" });
      } 
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
 });

export default reviewsRouter;