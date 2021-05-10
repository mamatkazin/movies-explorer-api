const cookieParser = require('cookie-parser');

const routerAuth = require('./auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const router404 = require('./404');
const auth = require('../middlewares/auth');

module.exports.router = function router(app) {
  app.all('/sign*', routerAuth);

  app.use(cookieParser());
  app.use(auth);

  app.use('/users', routerUsers);
  app.use('/movies', routerMovies);
  app.use('*', router404);
};
