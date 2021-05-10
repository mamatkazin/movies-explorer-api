const routerMovies = require('express').Router();
const { validatorCreateMovie, validatorMovieId } = require('./shema');
const {
  createMovie,
  deleteMovie,
  listMovies,
} = require('../../controllers/movies');

routerMovies.post('/', validatorCreateMovie, createMovie);
routerMovies.delete('/:movieId', validatorMovieId, deleteMovie);
routerMovies.get('/', listMovies);

module.exports = routerMovies;
