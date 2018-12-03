const country = require('../controllers').country;
const region = require('../controllers').region;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Web 3 API!',
  }));

  app.get('/api/countries', country.listAll);
  app.get('/api/countries/:code', country.listByCode);
  app.get('/api/add/countries', country.createCSV);
  
  app.get('/api/regions', region.listAll);
  app.get('/api/regions/:code', region.listByCode);
  app.get('/api/add/regions', region.createCSV);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/countries', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
  app.all('/api/regions', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};