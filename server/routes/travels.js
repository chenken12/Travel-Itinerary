const express = require('express');
const router = express.Router();

module.exports = ({
  getItinerary
}) => {
  /* GET users listing. */
  router.get('/', (req, res) => {
    getItinerary()
      .then((travels) => res.json(travels))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};