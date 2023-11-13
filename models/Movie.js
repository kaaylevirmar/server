const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({

        name: String,
        genre: String,
        directorName: String,
        dateRelease: Date,
        dateStarted: Date,
        movieBudget: Number,
        search: String,

})

module.exports = mongoose.model('Movie', movieSchema )

