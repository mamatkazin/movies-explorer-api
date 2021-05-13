const User = require('../../models/users');
const { HTTPError } = require('../../services/error');
const { USER_EXIST, NOT_FOUND } = require('../../services/const');

module.exports.showUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new HTTPError(404, NOT_FOUND);
      }

      res.send(data);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const data = { ...req.body };

  User.findByIdAndUpdate(req.user._id, data, { new: true })
    .then((user) => {
      if (!user) {
        throw new HTTPError(404, NOT_FOUND);
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(
          new HTTPError(409, USER_EXIST),
        );
      } else {
        next(err);
      }
    });
};
