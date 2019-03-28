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

router.get('/cates/add', function(req, res, next){
  res.render('category/add-form');
});

router.post('/cates/save-add', function(req, res, next){
  var {name, image, description} = req.body;
  var model = new Category();
  model.name = name;
  model.image = image;
  model.description = description;

  model.save();
  res.redirect('/cates');
});

module.exports = router;
