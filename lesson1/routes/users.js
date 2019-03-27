var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('truy cap localhost:3000/users');
});

router.get('/thienth', function(req, res, next) {
  res.send('truy cap localhost:3000/users/thienth');
});

module.exports = router;
