
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema( // Create an object by create a schema
  {
    fullname: String,
    username: String,
    password: String
  },
  { versionKey: false }  // If I don't want _ line
);



module.exports = mongoose.model('User', usersSchema); // I need to provide: 1. name of the collection in the singular (Capital letter) 
                                                                          // 2. name of schema




