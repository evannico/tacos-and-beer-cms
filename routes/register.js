var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/user");

/* GET dashboard page. */
router.get('/', function(req, res, next) {
    res.render('register');
});


router.post('/', function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("articleDashboard");
        });
    });
});

module.exports = router;
