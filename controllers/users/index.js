const User = require('../../models/users');
const { HTTPError } = require('../../services/error');

module.exports.showUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new HTTPError(404, 'Пользователь не найден.');
      }

      res.status(200).send(data);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const data = { ...req.body };

  User.findByIdAndUpdate(req.user._id, data, { new: true })
    .then((user) => {
      if (!user) {
        throw new HTTPError(404, 'Пользователь не найден.');
      }

      res.status(200).send(user);
    })
    .catch(next);
};

// module.exports.updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;

//   User.findByIdAndUpdate(
//     req.user._id,
//     { avatar },
//     { new: true, runValidators: true },
//   )
//     .then((data) => {
//       if (!data) {
//         throw new HTTPError(404, 'Пользователь не найден.');
//       }

//       res.status(200).send(data);
//     })
//     .catch(next);
// };
