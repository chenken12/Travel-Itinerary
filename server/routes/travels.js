const express = require('express');
const router = express.Router();

module.exports = ({
  getItinerary,
  getItineraryById
}) => {
  /* GET travels listing. */
  router.get('/', (req, res) => {
    getItinerary()
      .then((travels) => res.json(travels))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/:id', (req, res) => {
    getItineraryById(req.params.id)
      .then((travel) => res.json(travel))
      .catch((err) => res.json({
        error: err.message
      }));
  });
  
  return router;
};