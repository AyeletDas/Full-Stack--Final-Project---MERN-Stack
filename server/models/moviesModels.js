
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({ // Create an object by create a schema
    name: String,
    year_premiered: String,
    genres: [String],
    an_image_url: String
}, { versionKey: false }); // If I don't want _ line

module.exports = mongoose.model('Movie', movieSchema); // I need to provide: 1. name of the collection in the singular (Capital letter) 
                                                                            // 2. name of schema

