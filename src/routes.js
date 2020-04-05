const routes = require('express').Router();
const { User } = require('./app/models');

User.create({ name: 'Diego', email: 'diego@rocketseat.com.br', password_hash: '123456' })

module.exports = routes;