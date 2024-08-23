import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import reviewsRouter from "./routers/reviews.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  const tables = await knex.raw(SHOW_TABLES_QUERY);
  res.json({ tables });
});


app.use("/api", apiRouter);
apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationsRouter);
apiRouter.use("/reviews", reviewsRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});


// /future-meals	Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  const futureMeals = await knex.raw("SELECT * FROM meal WHERE meal.when > NOW()");
  if (futureMeals.length > 0) {
      res.send(futureMeals);
  } else {
      res.send([]);
  }
});

// /past-meals	Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  const pastMeals = await knex.raw("SELECT * FROM meal WHERE meal.when < NOW()");
  if (pastMeals.length > 0) {
      res.send(pastMeals);
  } else {
      res.send([]);
  }
});

// /all-meals	Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  const meals = await knex.raw("SELECT * FROM meal ORDER BY id ASC");
  if (meals.length > 0) {
      res.send(meals);
  } else {
      res.send([]);
  }
});