const Movie = require('../../models/movies');
const { HTTPError } = require('../../services/error');

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
        throw new HTTPError(404, 'Карточка не найдена.');
      }

      if (String(data.owner) !== req.user._id) {
        throw new HTTPError(403, 'Удалять можно только свою карточку.');
      }

      data.remove(() => res.status(200).send(data));
    })
    .catch(next);
};

module.exports.listMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};
