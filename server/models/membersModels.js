const mongoose = require('mongoose'); 

const membersSchema = new mongoose.Schema( // Create an object by create a schema
  {
    firstName : String,
    lastName : String,
    email : String,
    city : String
  },
  { versionKey: false } // If I don't want _ line
);

module.exports = mongoose.model('Member', membersSchema); // I need to provide: 1. name of the collection in the singular (Capital letter) 
                                                                             // 2. name of schema
