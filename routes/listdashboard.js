var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var config = require('../config/config');
var misc = require('../config/misc');

// Connection URL
var url = config.mlabarticle;

/* GET dashboard page. */
router.get('/', misc.isLoggedIn, function(req, res, next) {
    res.render('listDashboard');
});


router.post('/addArticle', misc.isLoggedIn, function(req, res) {

    console.log(req.body);

    var city = req.body.city;
    var date = req.body.date;
    var smallTitle = req.body.smallTitle;
    var longTitle = req.body.longTitle;
    var author = req.body.author;
    var list = true;
    var featured;
    if (req.body.Featured == "true") {
        featured = true;
    } else {
        featured = false;
    }
    var restaurantsArray = [];

    for (var i=0; i<req.body.imageLink.length; i++) {
        restaurantsArray.push({
            "restName": req.body.restName[i],
            "restImageLink": req.body.imageLink[i],
            "restDescription": req.body.paragraph[i],
            "restAddress": req.body.restLocation[i],
            "restPhone": req.body.restPhone[i],
            "restURL": req.body.restURL[i]
        })
    }

    var tags = req.body.tags.toLowerCase();

    var tagsArray = [];

    var nowhite = tags.replace(/ /g,'');
    var split = nowhite.split(',');

    for (var i=0; i<split.length;i++) {
        tagsArray.push(split[i]);
    }



    // var saved = false;

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        // Insert a single document
        db.collection('articles').insertOne({
            city: city,
            date: date,
            smallTitle: smallTitle,
            longTitle: longTitle,
            author: author,
            featured: featured,
            list: list,
            restaurants: restaurantsArray,
            tags: tagsArray
        }
        , function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            console.log("entry saved");

            saved = true;
        });
    });
    if (true) {
        res.redirect('/saved');
    } else {
        res.redirect('/failed');
    }



});


module.exports = router;
