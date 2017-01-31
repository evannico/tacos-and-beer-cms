var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var ObjectID = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://evannico:tacoandbeeradmin1@ds015774.mlab.com:15774/tacos-and-beer';

/* GET correct article. */
router.get('/:id', function(req, res, next) {
  console.log(req.params);
  var articleID = req.params.id;
  console.log(articleID);


  MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");

      var col = db.collection('articles');
      //get correct article
      col.find({_id: new ObjectID(articleID)}).limit(1).toArray(function(err, docs) {
          db.close();
          console.log(docs);
          return res.render('article', {posts: docs});
      });
  });
});

router.get('/list/:id', function(req, res, next) {
    var articleID = req.params.id;
    console.log(articleID);

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var col = db.collection('articles');
        //get correct article
        col.find({_id: new ObjectID(articleID)}).limit(1).toArray(function(err, docs) {
            db.close();
            console.log(docs);
            return res.render('list', {list: docs});
        });
    });
});

//todo add star path



module.exports = router;
