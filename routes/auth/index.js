const routerAuth = require('express').Router();

const { validatorLogin, validatorCreateUser } = require('./shema');
const { login, createUser, logout } = require('../../controllers/auth');
const auth = require('../../middlewares/auth');

routerAuth.post('/signin', validatorLogin, login);
routerAuth.post('/signup', validatorCreateUser, createUser);
routerAuth.post('/signout', auth, logout);

module.exports = routerAuth;
