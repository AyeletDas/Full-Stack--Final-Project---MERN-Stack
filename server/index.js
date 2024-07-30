const express = require('express'); // $ npm i express
const cors = require('cors');
const connectDB = require('./config/db'); // Connection to the data base - so I will create the config folder first
require('dotenv').config();  // $ npm install dotenv


const app = express(); // Creating an object of Express 
app.use(cors());

app.use(express.json()); // Converts to JSON

const PORT = process.env.PORT;

// models -> Repo -> Service - > Controller - > index.js

connectDB(); // Connect to the database - run the function
app.use('/users', require('./controllers/usersController')); 
app.use('/movies', require('./controllers/moviesController')); 
app.use('/subscriptions', require('./controllers/subscriptionsController'));
app.use('/members', require('./controllers/membersController')); 

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT} /users OR /movies OR /subscriptions OR /members`);
});

//$ npm start - Running the server with nodemon
// http://localhost:4000/users - Postman
// https://freetestapi.com/api/v1/movies - The link from which I take the names of the movies



