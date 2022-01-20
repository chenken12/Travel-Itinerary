const express = require('express');
const router = express.Router();

module.exports = ({
  addPin
}) => {
  router.post('/', (req, res) => {
    console.log(req.body);
    const {id, name, lat, lng} = req.body;
    addPin(id, name, lat, lng)
      .then((pins) => {
        res.status(204).json({});
      })
      .catch((err) => res.json({
        error: err.message
      })); 
  });

  return router;
};
