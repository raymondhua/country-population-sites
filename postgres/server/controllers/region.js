const Region = require('../models').Region;

module.exports = {
  listAll(req, res) {
    return Region
      .all()
      .then(region => res.status(200).send(region))
      .catch(error => res.status(400).send(error));
  },
  listByCode(req, res) {
  return Region
    .findAll({
    where: {code: req.params.code}
    })
    .then(region => {
      if (!region) {
        return res.status(404).send({
          message: 'Region Not Found',
        });
      }
      return res.status(200).send(region);
    })
    .catch(error => res.status(400).send(error));
  },
  createCSV(req, res) {
	var fs = require('fs');
  	var stream = fs.createReadStream("static/csv/regionpop.csv");
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
          const bulidString = Region.create({
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
      .then(region => res.status(201).send(region))
  	})
  	.on("end", function(){
      	console.log("Finished reading country file into the database");
  	})
  },
  //PUG OUTPUTS
  showRegionPage(req, res) {
  return Region
    .all()
    .then(region => res.render('regions', { regions: region }))
    .catch(error => res.status(400).send(error));
  },
};

