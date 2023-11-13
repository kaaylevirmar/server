const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const PORT = 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
.then((res)=>{
    console.log('Connected to Server');
}).catch((err)=>{
    console.log(err);
})

app.get('/all-movies', async(req,res)=>{
    
    const movies = await Movie.find();
    res.json({movies})
})


app.get('/edit-movie/:id', async(req,res)=>{
        const {id}=req.params;
        const editMovie = await Movie.findById(id)
        res.json({editMovie});
})

app.get('/update-movie/:id', async(req,res)=>{
    const {id}=req.params;
    const {name, genre, directorName, movieBudget} = req.body;
    const editMovie = await Movie.findByIdAndUpdate({_id: id},{name: name, genre: genre, directorName: directorName, movieBudget})
    res.json({message: 'updated data'});
})


app.post('/add-movie', async(req,res)=>{
    const {name, genre, directorName, dateRelease, dateStarted, movieBudget} = req.body;
    const data = new Movie({
        name: name,
        genre: genre,
        directorName: directorName,
        dateRelease: dateRelease,
        dateStarted: dateStarted,
        movieBudget: movieBudget
    })

    const addMovie = await data.save();
    res.json({message: "added movie"})
})

app.post('/search',async(req,res)=>{
    const {search} = req.body;
    const movieSearch = await Movie.findOne({name: search})
    res.json({movieSearch});
})


app.post('/delete-movie/:id', async(req,res)=>{
    const {id}=req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id)
    res.json({deleteMovie})
   
})






app.listen(PORT,()=>{
    console.log(`Server is up and running in port ${PORT}`);
})