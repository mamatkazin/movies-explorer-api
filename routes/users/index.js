const routerUsers = require('express').Router();
const { validatorUser } = require('./shema');
const { showUser, updateUser } = require('../../controllers/users');

routerUsers.get('/me', showUser);
routerUsers.patch('/me', validatorUser, updateUser);

module.exports = routerUsers;
