import express from "express";
import knex from "../database_client.js";

const reservationsmealRouter = express.Router();

// Get all reservations
reservationsmealRouter.get("/", async (req, res) => {
  try {
    const reservationsmeal = await knex.select("*").from("reservation_meal");
    res.json(reservationsmeal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default reservationsmealRouter;