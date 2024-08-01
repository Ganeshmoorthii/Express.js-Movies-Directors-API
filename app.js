const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const app = express()
const dbPath = path.join(__dirname, 'moviesData.db')

app.use(express.json())

let db = null

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const dbObjToJsonObjForMovies = movie => {
  return {
    movieId: movie.movie_id,
    directorId: movie.director_id,
    movieName: movie.movie_name,
    leadActor: movie.lead_actor,
  }
}

const dbObjToJsonObjForDirector = director => {
  return {
    directorId: director.director_id,
    directorName: director.director_name,
  }
}

// API 1: Get all movies
app.get('/movies/', async (req, res) => {
  const getMoviesQuery = `SELECT * FROM Movie;`
  const moviesArray = await db.all(getMoviesQuery)
  res.send(moviesArray.map(eachMovie => dbObjToJsonObjForMovies(eachMovie)))
})

// API 2: Add a new movie
app.post('/movies/', async (req, res) => {
  const {directorId, movieName, leadActor} = req.body
  const addMovieQuery = `
    INSERT INTO Movie (director_id, movie_name, lead_actor)
    VALUES ('${directorId}', '${movieName}', '${leadActor}');
  `
  await db.run(addMovieQuery)
  res.send('Movie Successfully Added')
})

// API 3
app.get('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const getMoviesQuery = `SELECT * FROM Movie
  where movie_id = ${movieId};`
  const movie = await db.get(getMoviesQuery)
  res.send(dbObjToJsonObjForMovies(movie))
})

// API 4
app.put('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const {directorId, movieName, leadActor} = req.body
  const updateQuery = `
    update Movie 
    set director_id = '${directorId}', movie_name = '${movieName}', lead_actor = '${leadActor}'
    where movie_id = ${movieId};`
  await db.run(updateQuery)
  res.send('Movie Details Updated')
})

// API 5
app.delete('/movies/:movieId/', async (req, res) => {
  const {movieId} = req.params
  const deleteQuery = `
    delete from Movie
    where movie_id = ${movieId};`
  await db.run(deleteQuery)
  res.send('Movie Removed')
})

// API 6
app.get('/directors/', async (req, res) => {
  const getdirectorsQuery = `SELECT * FROM Director;`
  const directorsList = await db.all(getdirectorsQuery)
  res.send(
    directorsList.map(eachdirector => dbObjToJsonObjForDirector(eachdirector)),
  )
})

// API 7
app.get('/directors/:directorId/movies/', async (req, res) => {
  const { directorId } = req.params
  const getdirectorsQuery = `SELECT movieName FROM Movie WHERE director_id = ${directorId};`
  const directorsList = await db.all(getdirectorsQuery)
  const movieNames = moviesArray.map(movie => movie.movie_name);
  res.send(
    movieNames
  )
})

module.exports = app
