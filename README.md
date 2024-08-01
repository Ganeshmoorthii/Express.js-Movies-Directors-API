# Express.js-Movies-Directors-API

## Overview

This project is a simple Express.js application that interacts with an SQLite database to manage movies and directors. It provides a set of RESTful APIs to perform CRUD operations on the `movie` and `director` tables.

## Project Structure

- **app.js**: The main server file containing all the API routes.
- **moviesData.db**: SQLite database file containing the `movie` and `director` tables.

## API Endpoints

### Movie APIs

1. **Get All Movies**
   - **Path**: `/movies/`
   - **Method**: `GET`
   - **Description**: Returns a list of all movie names in the movie table.

2. **Create New Movie**
   - **Path**: `/movies/`
   - **Method**: `POST`
   - **Description**: Creates a new movie in the movie table. `movie_id` is auto-incremented.
   - **Request Body**:
     ```json
     {
       "director_id": 1,
       "movie_name": "Inception",
       "lead_actor": "Leonardo DiCaprio"
     }
     ```

3. **Get Movie by ID**
   - **Path**: `/movies/:movieId/`
   - **Method**: `GET`
   - **Description**: Returns a movie based on the movie ID.

4. **Update Movie**
   - **Path**: `/movies/:movieId/`
   - **Method**: `PUT`
   - **Description**: Updates the details of a movie in the movie table based on the movie ID.
   - **Request Body**:
     ```json
     {
       "director_id": 2,
       "movie_name": "The Matrix",
       "lead_actor": "Keanu Reeves"
     }
     ```

5. **Delete Movie**
   - **Path**: `/movies/:movieId/`
   - **Method**: `DELETE`
   - **Description**: Deletes a movie from the movie table based on the movie ID.

### Director APIs

6. **Get All Directors**
   - **Path**: `/directors/`
   - **Method**: `GET`
   - **Description**: Returns a list of all directors in the director table.

7. **Get Movies by Director**
   - **Path**: `/directors/:directorId/movies/`
   - **Method**: `GET`
   - **Description**: Returns a list of all movie names directed by a specific director.
