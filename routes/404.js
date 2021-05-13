const router404 = require('express').Router();
const { HTTPError } = require('../services/error');
const { PAGE_NOT_FOUND } = require('../services/const');

router404.all('/', () => {
  throw new HTTPError(404, PAGE_NOT_FOUND);
});

module.exports = router404;
