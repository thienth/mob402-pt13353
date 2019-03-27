var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/show-info', (req, res, next) => {
  var users = [
    { id: 1, name: 'Nguyen Trung Son', gender: true },
    { id: 2, name: 'Nguyen Trung Ha', gender: false },
    { id: 3, name: 'Nguyen Trung Chung', gender: true },
    { id: 4, name: 'Nguyen Trung Thanh', gender: false }
  ];

  res.render('users/list', {data: users}); 
});

module.exports = router;
