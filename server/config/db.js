const mongoose = require('mongoose'); // connection to Database

const connectDB = () => { // The function at the end I will run
  mongoose
    .connect('mongodb://127.0.0.1:27017/finalProject3_MERN_Stack_RestApi') // Returns a promise, so I will register with then (if it succeeds):
    .then(() => {
      console.log('Connected to finalProject3_MERN_Stack_RestApi');
    })
    .catch((error) => { // and register with catch (if it doesn't work)
      console.error('Error connecting to database:', error);
    });
};

module.exports = connectDB;




