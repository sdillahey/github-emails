var express = require('express');
var router = express.Router();
var githubCtrl = require('../controller/github');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: []});
});

router.post('/', githubCtrl.findEmail)

module.exports = router;
