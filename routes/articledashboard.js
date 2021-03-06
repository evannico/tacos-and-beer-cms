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
    res.render('articleDashboard');
});


router.post('/addArticle',misc.isLoggedIn , function(req, res) {
    var smallTitle = req.body.smallTitle;
    var longTitle = req.body.longTitle;
    var author = req.body.author;
    var list;
    if (req.body.List == "true") {
        list = true;
    } else {
        list = false;
    }
    var featured;

    if (req.body.Featured == "true") {
        featured = true;
    } else {
        featured = false;
    }

    var imageLink = req.body.imageLink;
    var image = req.body.articleImage;
    var imageCaption = req.body.imageCaption;
    var paragraph = req.body.paragraph;
    var restName = req.body.restName;
    var restLocation = req.body.restLocation;
    var restPhone = req.body.restPhone;
    var restHours = req.body.restHours;
    var restMenuLink = req.body.restMenuLink;
    var taco = parseInt(req.body.taco);
    var beer = parseInt(req.body.beer);
    var money = parseInt(req.body.money);
    var lit = parseInt(req.body.lit);
    var tags = req.body.tags.toLowerCase();

    var tagsArray = [];

    console.log(req.body);

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
            smallTitle: smallTitle,
            longTitle: longTitle,
            author: author,
            featured: featured,
            list: list,
            imageLink: imageLink,
            image: image,
            imageCaption: imageCaption,
            paragraph: paragraph,
            restName: restName,
            restLocation: restLocation,
            restPhone: restPhone,
            restHours: restHours,
            restMenuLink: restMenuLink,
            taco: taco,
            beer: beer,
            money: money,
            lit: lit,
            tags: tagsArray
        }, function(err, r) {
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
