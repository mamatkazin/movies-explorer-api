const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const { HTTPError } = require('../../services/error');
const { JWT_SECRET_DEV } = require('../../services/const');

const { JWT_SECRET = JWT_SECRET_DEV } = process.env;

module.exports.createUser = (req, res, next) => {
  const data = { ...req.body };

  bcrypt
    .hash(data.password, 10)
    .then((hash) => {
      data.password = hash;

      User.create(data)
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            next(
              new HTTPError(409, 'Пользователь с таким емайл уже существует.'),
            );
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.authenticator(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new HTTPError(404, 'Пользователь не найден.');
      }

      res.clearCookie('jwt').status(200).send(data);
    })
    .catch(next);
};
