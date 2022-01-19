const express = require('express');
const router = express.Router();

module.exports = ({
  getItinerary,
  getTravelPlanById,
  addItinerary
}) => {
  router.get('/:id', (req, res) => {
    getTravelPlanById(req.params.id)
      .then((travel) => res.json(travel))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  /* GET travels listing. */
  router.get('/', (req, res) => {
    getItinerary()
      .then((travels) => res.json(travels))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', (req, res) => {
    const {name, description, city, country, startDate, endDate} = req.body;
    addItinerary(name, description, city, country, startDate, endDate)
      .catch((err) => res.json({
        error: err.message
      }));
  })

  return router;
};