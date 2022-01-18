const express = require('express');
const router = express.Router();

module.exports = ({
  getCommentsById
}) => {
  router.get('/:id', (req, res) => {
    getCommentsById(req.params.id)
      .then((comments) => res.json(comments))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};