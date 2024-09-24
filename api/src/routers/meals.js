import express from "express";
import knex from "../database_client.js";
import { getTableSchema, validParam } from "../valid_data.js";

const mealsRouter = express.Router();

mealsRouter.get("/", async (req, res) => {
   try {
      const { 
         maxPrice, 
         availableReservations,
         title,
         dateAfter,
         dateBefore,
         limit,
         sortKey,
         sortDir
      } = req.query;
  
      let query = knex("meal").select("*");

      const queryAvailableReservations = knex('meal')
      .select('meal.*')
      .leftJoin('reservation', 'meal.id', 'reservation.meal_id')
      .groupBy('meal.id');

      //Returns all meals that are cheaper than maxPrice
      if (maxPrice) {
        query = query.where("price", "<=", maxPrice);
      }
      
      //Returns all meals that still have available spots left, if true. If false, return meals that have no available spots left.1	api/meals?availableReservations=true
      switch (availableReservations){
         case true:
            query = queryAvailableReservations
            .havingRaw('SUM(reservation.number_of_guests) < meal.max_reservations');
            break;
         case false:
            query = queryAvailableReservations
            .havingRaw('SUM(reservation.number_of_guests) >= meal.max_reservations');
      }

      //Returns all meals that partially match the given title
      if (title) {
        query = query.where("title", "like", `%${title}%`);
      }

      //Returns all meals where the date for when is after the given date.	api/meals?dateAfter=2022-10-01
      if (dateAfter) {
         query = query.where("when", ">=", dateAfter);
      }

      //Returns all meals where the date for when is before the given date. api/meals?dateBefore=2022-08-08
      if (dateBefore) {
         query = query.where("when", "<=", dateBefore);
      } 

      //Returns the given number of meals. api/meals?limit=7
      if (limit) {
         query = query.limit(limit);
      } 

      //Returns all meals sorted by the given key. Allows when, max_reservations and price as keys. Default sorting order is asc(ending).	api/meals?sortKey=price 
  
      // Returns all meals sorted in the given direction. Only works combined with the sortKey and allows asc or desc.	api/meals?sortKey=price&sortDir=desc
       
      const validQuery = ["when", "max_reservations", "price"];
      const validDirection = ["ASC", "DESC"];
      
      if (sortKey && sortDir) {
        if (validQuery.includes(sortKey) && validDirection.includes(sortDir.toUpperCase())) {
          query = query.orderBy(sortKey, sortDir.toUpperCase());
        }
      } else if (sortKey) {
        if (validQuery.includes(sortKey)) {
          query = query.orderBy(sortKey);
        }
      }
      
      const meals = await query;
      
      // Check if any meals are found
      if (meals.length === 0) {
         return res.status(404).send("No meals found for the given criteria");
      }
      res.json(meals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Adds a new meal to the database
mealsRouter.post("/", async (req, res) => {
   const dataSchema = await getTableSchema("meal"); 
   const validError = validParam(req.body, dataSchema);
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
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
   }
});

export default mealsRouter;

