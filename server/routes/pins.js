const express = require('express');
const router = express.Router();

module.exports = ({
  addPin,
  getTravelPlanById
}) => {
  router.post('/', (req, res) => {
    console.log(req.body);
    const {id, name, lat, lng, date} = req.body;
    addPin(id, name, lat, lng, date)
      .then((pins) => {
        res.status(204).json({});
      })
      .catch((err) => res.json({
        error: err.message
      })); 
  });

  router.get('/:id', (req, res) => {
    getTravelPlanById(req.params.id)
      .then((travel) => res.json(travel))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};
