const router404 = require('express').Router();
const { HTTPError } = require('../services/error');

router404.all('/', () => {
  throw new HTTPError(404, 'Запрашиваемая страница не найдена.');
});

module.exports = router404;
