var express = require('express');
var router = express.Router();

var Category = require('../models/category');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cates', function(req, res, next){
  Category.find({}, function(err, data){
    res.render('category/index', {cates: data});
  })
});

module.exports = router;
