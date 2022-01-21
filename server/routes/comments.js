const express = require('express');
const router = express.Router();

module.exports = ({
  getCommentsById,
  addComment
}) => {
  router.get('/:id', (req, res) => {
    getCommentsById(req.params.id)
      .then((comments) => res.json(comments))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.post('/', (req, res) => {
    const {user_id, td_id, sendComment} = req.body;
    addComment(user_id, td_id, sendComment)
      .then((comments) => {
        res.status(204).json({});
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};