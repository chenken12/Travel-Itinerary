const express = require('express');
const router = express.Router();

module.exports = ({
  getItinerary,
  getItineraryById,
  addItinerary
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
  
  router.post('/', (req, res) => {
    const {name, description, city, country, startDate, endDate} = req.body;
    console.log('post req: ', req.body);
    addItinerary(1, name, description, city, country, startDate, endDate)
      .then((newItinerary)=> {
        res.status(200).json(newItinerary);
      })
      .catch((err) => res.status(500).json({
        error: err.message
      }));
  })

  return router;
};