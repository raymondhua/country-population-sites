//Imports express
var express = require('express');
var router = express.Router();

// Returns the inspirations page
router.get('/', function(req, res, next) {
  res.render('inspirations');
});

module.exports = router;
