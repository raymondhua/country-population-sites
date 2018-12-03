//Imports country controller
const CountryController = require('../server/controllers').country;

//Imports express
var express = require('express');
var router = express.Router();

// Gets show all countries page from the country controller file
router.get('/', CountryController.showAllCountries);
/* GET home page. */
/*router.get('/output', function(req, res, next) {
  res.render('output', { title: 'Express' });
});*/

module.exports = router;
