const express = require("express");
const { getUser, getAllUsers, CreateUser, updateUser, deleteUser,updateMe,deleteMe} = require('../Controllers/usersController')
const {signup,login,protect,restrictTo,forgetPassword,resetPassword,updatePassword}=require('../Controllers/authController')
const Router = express.Router();
// --------user param midlleware----------------
Router.post('/signup', signup)
Router.post('/login', login)

Router.post('/forgetPassword', forgetPassword)
Router.patch('/resetPassword/:token', resetPassword)
Router.patch('/updatePassword',protect,updatePassword)
Router.patch('/updateMe', protect, updateMe)
Router.delete('/deleteMe',protect,deleteMe)
Router.route('/') 
    .get(getAllUsers)
    .post(CreateUser)
Router.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports =Router