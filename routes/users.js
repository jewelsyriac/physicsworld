const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../models/utils/catchAsync');
const users = require('../controllers/users');


router.get('/register', users.register);

router.post('/register', catchAsync(users.signUp));

router.get('/login', users.loginForm);

router.post('/login', passport.authenticate('local',{failureFlash : true , failureRedirect : '/login'}),users.logIn);

router.get('/logout', users.logOut); 

module.exports = router;