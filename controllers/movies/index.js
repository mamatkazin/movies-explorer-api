const Movie = require('../../models/movies');
const { HTTPError } = require('../../services/error');
const { NOT_FOUND, DONT_DELETE } = require('../../services/const');

module.exports.createMovie = (req, res, next) => {
  const body = { ...req.body };

  body.owner = req.user._id;

  Movie.create(body)
    .then((data) => res.status(201).send(data))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((data) => {
      if (!data) {
        throw new HTTPError(404, NOT_FOUND);
      }

      if (String(data.owner) !== req.user._id) {
        throw new HTTPError(403, DONT_DELETE);
      }

      return data.remove(() => res.send(data));
    })
    .catch(next);
};

module.exports.listMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.send(data))
    .catch(next);
};
