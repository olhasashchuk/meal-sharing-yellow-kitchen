# Yellow Kitchen API

Welcome to the **Yellow Kitchen** API, a backend service for the meal-sharing application built with **Node.js**, **Express**, **Knex**, and **MySQL**. This API allows users to manage meals, reservations, and reviews efficiently.

## Features

- **Meal Management**: Create, read, update, and delete meals.
- **Reservations**: Make reservations for meals and manage them.
- **Reviews**: Add and manage reviews for meals.
- **Filtering & Sorting**: Filter and sort meals based on various criteria.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js to build APIs.
- **Knex.js**: SQL query builder for Node.js.
- **MySQL**: Database management system.
- **dotenv**: Module to manage environment variables.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Getting Started

To run the Yellow Kitchen API locally, follow these steps:

1. Clone the repository:
git clone https://github.com/yourusername/yellow-kitchen-api.git

2. Navigate into the project directory:
cd api

3. Install dependencies:
npm install

4. Create a `.env` file in the root directory and configure your database connection:
DB_CLIENT=mysql DB_HOST=localhost DB_USER=your_db_user DB_PASSWORD=your_db_password DB_NAME=your_db_name PORT=3001

markdown
Copy code
5. Start the server:
npm start

markdown
Copy code

The server will start running on `http://localhost:3001`.

## API Endpoints

### Meals
- `GET /api/meals`: Retrieve all meals with optional filters.
- `POST /api/meals`: Create a new meal.
- `GET /api/meals/:id`: Get a meal by ID.
- `PUT /api/meals/:id`: Update a meal by ID.
- `DELETE /api/meals/:id`: Delete a meal by ID.

### Reservations
- `GET /api/reservations`: Retrieve all reservations.
- `POST /api/reservations`: Create a new reservation.
- `GET /api/reservations/:id`: Get a reservation by ID.
- `PUT /api/reservations/:id`: Update a reservation by ID.
- `DELETE /api/reservations/:id`: Delete a reservation by ID.

### Reviews
- `GET /api/reviews`: Retrieve all reviews or filter by average stars.
- `POST /api/reviews`: Create a new review.
- `GET /api/meals/:mealId/reviews`: Get all reviews for a specific meal.
- `GET /api/reviews/:id`: Get a review by ID.
- `PUT /api/reviews/:id`: Update a review by ID.
- `DELETE /api/reviews/:id`: Delete a review by ID.

## Data Models

### Meal
- `id`: Integer, Primary Key
- `title`: String, Meal title
- `price`: Float, Meal price
- `when`: DateTime, Date and time of the meal
- `max_reservations`: Integer, Maximum number of reservations

### Reservation
- `id`: Integer, Primary Key
- `contact_name`: String, Name of the contact person
- `contact_email`: String, Email of the contact person
- `contact_phonenumber`: String, Phone number of the contact person
- `total_amount`: Float, Total amount for the reservation

### Review
- `id`: Integer, Primary Key
- `meal_id`: Integer, Foreign Key (references Meal)
- `title`: String, Title of the review
- `stars`: Integer, Rating (1-5)
- `comment`: String, Review comment

## Contributing

Contributions are welcome! If you encounter any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## Contact

If you have any questions or need further assistance, feel free to reach out to me via GitHub.
