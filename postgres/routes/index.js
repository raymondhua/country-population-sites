//Imports country controller
const CountryController = require('../server/controllers').country;

//Imports express
var express = require('express');
var router = express.Router();

// Gets home page from the country controller file
router.get('/', CountryController.showHomePage);
/*router.get('/', function(req, res, next) {
  var pop = PopulationController.listInHTML;
  console.log(pop);
  res.render('index', { population: pop });
});*/

module.exports = router;
