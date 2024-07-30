const mongoose = require('mongoose'); 

const subscriptionsSchema = new mongoose.Schema( // Create an object by create a schema
  {
    movieID : String,
    memberID : String,
    date : String
  },
  { versionKey: false } // If I don't want _ line
);

module.exports = mongoose.model('Subscription', subscriptionsSchema); // I need to provide: 1. name of the collection in the singular (Capital letter) 
                                                                                          // 2. name of schema



