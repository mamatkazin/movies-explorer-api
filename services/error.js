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
    const error = err.details.get('body') || err.details.get('params');

    statusCode = 400;
    message = error.message;
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
