var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    res.render('login');
});


router.post('/', passport.authenticate("local", {
    successRedirect: "articleDashboard",
    failureRedirect: "login"
}) ,function(req, res) {
});

module.exports = router;
