var express = require('express');
var router = express.Router();
// npm i --save multer
var multer = require('multer');
// npm i --save shortid
var shortid = require('shortid');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images');
  },
  filename: function(req, file, cb){
    
    cb(null, shortid.generate() + '-' + file.originalname);
  }
});
var upload = multer({storage: storage});


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

router.post('/cates/save-add', upload.single('image'),function(req, res, next){
  var {name, description} = req.body;
  var image = req.file.path.replace('public', '');
  var model = new Category();
  model.name = name;
  model.image = image;
  model.description = description;

  model.save(function(err){
    res.redirect('/cates');
  });
  
});

module.exports = router;
