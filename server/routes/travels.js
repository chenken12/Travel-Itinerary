const express = require('express');
const router = express.Router();

module.exports = ({
  getItinerary,
  getTravelPlanById,
  getUserItinerary,
  getItineraryById,
  addItinerary,
  editItinerary
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
    console.log("req 1: ", req.body);
    const {users_id, name, description, location, startDate, endDate, lat, lng} = req.body;
    // console.log('post req: ', req.body);
    addItinerary(users_id, name, description, location, startDate, endDate, lat, lng)
      .then((itinerary)=> {
        console.log(itinerary);
        res.json({itinerary});
      })
      .catch((err) => res.status(500).json({
        error: err.message
      }));
  })
  
  router.put('/:id', (req, res) => {
    console.log("req 1: ", req.body);
    const {id, users_id, name, description, location, travel_start_date, travel_end_date, lat, lng} = req.body;
    // console.log('post req: ', req.body);
    editItinerary(id, users_id, name, description, location, travel_start_date, travel_end_date, lat, lng)
      .then((newItinerary)=> {
        res.status(200).json(newItinerary);
      })
      .catch((err) => res.status(500).json({
        error: err.message
      }));
  })
// read from the cookie
// Get User Itineraries
  router.get('/', (req, res) => {
    const {users_id} = req.body;
    console.log("get req: ", req.body);
    getUserItinerary(users_id)
      .then((Itinerary) => res.status(200).json(Itinerary))
      .catch(err => res.status(500).json({
        error: err.message
      }))
  })
  return router;
};