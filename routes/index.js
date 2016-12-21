var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://evannico:tacoandbeeradmin1@ds015774.mlab.com:15774/tacos-and-beer';

/* GET Home Page. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var col = db.collection('articles');
        //get home page articles
        col.find({}).toArray(function(err, docs) {
            db.close();
            res.render('index', {posts: docs});
        });
    });

});


module.exports = router;
