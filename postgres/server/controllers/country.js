// Country controller file

// Imports Country model
const Country = require('../models').Country;

module.exports = {
  // Function to display all countries and population 
  listAll(req, res) {
    return Country
      .all()
      .then(country => res.status(200).send(country))
      .catch(error => res.status(400).send(error));
  },
  // Function to display countries and population via their country code in JSON
  listByCode(req, res) {
  return Country
    .findAll({
    where: {code: req.params.code}
    })
    .then(country => {
      if (!country) {
        return res.status(404).send({
          message: 'Country Not Found',
        });
      }
      return res.status(200).send(country);
    })
    .catch(error => res.status(400).send(error));
  },
  // Function that parses in the CSV file and store into the database
  createCSV(req, res) {
	  var fs = require('fs');
  	var stream = fs.createReadStream("static/csv/worldpop.csv");
  	var csv = require("fast-csv");
  	csv
  	.fromStream(stream, {headers : true})
  	.on("data", function(data){
      		var countryName = data.CountryName;
      		var countryCode = data.CountryCode;
      		var country1960 = data.populationOf1960;
      		var country1970 = data.populationOf1970;
      		var country1980 = data.populationOf1980;
      		var country1990 = data.populationOf1990;
          var country2000 = data.populationOf2000;
      		var country2010 = data.populationOf2010;
          var country2016 = data.populationOf2016;
          const bulidString = Country.create({
              name: countryName,
              code: countryCode,
              in1960: country1960,
              in1970: country1970,
              in1980: country1980,
              in1990: country1990,
              in2000: country2000,
              in2010: country2010,
              in2016: country2016,
          })
      .then(country => res.status(201).send(country))
      .catch(error => res.status(400).send(error))
  	})
  	.on("end", function(){
      	console.log("Finished reading country file into the database");
  	})
  },

  // ---------------------------PUG OUTPUTS--------------------------- //
  // Function that displays the home page
  showHomePage(req, res) {
  return Country
    .all()
    .then(country => res.render('index', { countries: country }))
    .catch(error => res.status(400).send(error));
  },
  // Function to display all countries and their population
  showAllCountries(req, res) {
  return Country
    .all()
    .then(country => res.render('showAll', { countries: country }))
    .catch(error => res.status(400).send(error));
  },
};

