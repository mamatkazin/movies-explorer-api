const { isCelebrateError } = require('celebrate');

module.exports.HTTPError = class HTTPError extends Error {
  constructor(code, message) {
    super(message);

    this.statusCode = code;
    this.name = 'HTTPError';
  }
};

module.exports.parseError = (err, req, res, next) => {
  let statusCode;
  let message;

  if (isCelebrateError(err)) {
    statusCode = 400;
    message = err.details.get('body').message;
  } else {
    // const { statusCode, message } = err;
    statusCode = err.statusCode || 500;
    message = err.message;
  }

  res.status(statusCode).send({
    message:
      statusCode === 500 ? `На сервере произошла ошибка: ${message}` : message,
  });

  next();
};

// module.exports.parseModelError = function parseModelError(err) {
//   if (isCelebrateError(err)) {
//     return [
//       400,
//       `Переданы некорректные данные в методы создания карточки, пользователя,
// обновления аватара пользователя или профиля. Текст ошибки: ${err.message}`,
//     ];
//   }

//   switch (err.name) {
//     case 'ValidationError':
//     case 'CastError':
//       return [
//         400,
//         `Переданы некорректные данные в методы создания карточки, пользователя,
// обновления аватара пользователя или профиля. Текст ошибки: ${err.message}`,
//       ];
//     case 'HTTPError':
//       return [err.code, err.message];
//     case 'MongoError':
//       if (err.code === 11000) {
//         return [409, 'Пользователь с таким емайл уже существует'];
//       }

//       return [500, `Произошла ошибка: ${err.message}.`];
//     default:
//       return [500, `Произошла ошибка: ${err.message}.`];
//   }
// };
