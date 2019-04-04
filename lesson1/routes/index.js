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
var Product = require('../models/product');
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({})
          .populate('cate_id')
          .exec((err, data) => {
            res.render('product/index', { products: data });
          });
});

router.get('/products/add', async (req, res, next) => {
  var cates = await Category.find({});
  res.render('product/add-form', {cates: cates});
});

router.get('/products/edit/:pId', async (req, res, next) => {
  var cates = await Category.find({});
  var product = await Product.findOne({_id: req.params.pId});

  for (let i = 0; i < cates.length; i++) {
    if(cates[i]._id == product.cate_id.toString()){
      cates[i].selected = true;
      break;
    }
  }

  res.render('product/edit-form', {cates: cates, product: product});
});

router.post('/products/save-add', upload.single('image'), async (req, res, next) => {
  var model = new Product();
  model.name = req.body.name;
  model.price = req.body.price;
  model.cate_id = req.body.cate_id;
  model.detail = req.body.detail;
  model.image = req.file.path.replace('public', '');
  var rs = await model.save();

  // var cate = await Category.findOne({_id: rs.cate_id.toString()});
  // if(cate.products == undefined){
  //   cate.products = [];
  // }
  // cate.products.push({
  //   pro_id: rs._id,
  //   pro_name: model.name,
  //   pro_img: model.image
  // });
  // await cate.save();
  res.redirect('/');
});

router.post('/products/save-edit', upload.single('image'), (req, res, next) => {
  Product.findOne({_id: req.body.id}, (err, model) => {
    if(err){
      res.send('Id khong ton tai');
    }

    model.name = req.body.name;
    model.price = req.body.price;
    model.detail = req.body.detail;
    model.cate_id = req.body.cate_id;
    if(req.file != null){
      model.image = req.file.path.replace('public', '');
    }

    model.save((err) => {
      if(err){
        res.send('cap nhat khong thanh cong');
      }
      res.redirect('/');
    })
  });
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
