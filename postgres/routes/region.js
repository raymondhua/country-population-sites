//Imports region controller
const CountryController = require('../server/controllers').region;

//Imports express
var express = require('express');
var router = express.Router();

// Returns region page from the regions controller file
router.get('/', CountryController.showRegionPage);
/*router.get('/', function(req, res, next) {
  var pop = PopulationController.listInHTML;
  console.log(pop);
  res.render('index', { population: pop });
});*/

module.exports = router;
