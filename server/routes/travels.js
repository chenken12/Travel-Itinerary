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
    const {users_id, name, description, city_name, country_name, travel_start_date, travel_end_date} = req.body;
    addItinerary(users_id, name, description, city_name, country_name, travel_start_date, travel_end_date)
      .catch((err) => res.json({
        error: err.message
      }));
  })

  return router;
};