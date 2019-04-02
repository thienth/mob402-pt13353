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

router.get('/cates/edit/:cId', (req, res, next) => {
  Category.findOne({_id: req.params.cId}, (err, data) => {
    if(err){
      res.send('Id khong ton tai');
    }

    res.render('category/edit-form', {cate: data});
  });
});

router.post('/cates/save-edit', upload.single('image'), (req, res, next) => {
  Category.findOne({_id: req.body.id}, (err, model) => {
    if(err){
      res.send('Id khong ton tai');
    }

    model.name = req.body.name;
    model.description = req.body.description;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    model.save((err) => {
      if(err){
        res.send('cap nhat khong thanh cong');
      }
      res.redirect('/cates');
    })
  });
});

router.get('/cates/remove/:cId', (req, res, next) => {
  Category.deleteOne({_id: req.params.cId}, (err) => {
    if(err){
      res.send('Xoa khong thanh cong');
    }

    res.redirect('/cates');
  });
})
module.exports = router;
