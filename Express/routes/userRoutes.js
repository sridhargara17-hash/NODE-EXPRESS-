const express = require("express");
const { getUser, getAllUsers, CreateUser, updateUser, deleteUser } = require('../Controllers/usersController')
const Router = express.Router();
Router.route('/')
    .get(getAllUsers)
    .post(CreateUser)


Router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports =Router