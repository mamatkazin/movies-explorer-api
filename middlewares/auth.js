const jwt = require('jsonwebtoken');
const { HTTPError } = require('../services/error');
const { JWT_SECRET_DEV } = require('../services/const');

const { JWT_SECRET = JWT_SECRET_DEV } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    next(new HTTPError(401, 'Необходима авторизация'));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new HTTPError(401, 'Необходима авторизация'));
    }

    req.user = payload;

    next();
  }
};

// const { authorization } = req.headers;
// if (!authorization || !authorization.startsWith('Bearer ')) {
//   return res.status(401).send({ message: 'Необходима авторизация' });
// }
// const token = authorization.replace('Bearer ', '');
