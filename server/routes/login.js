const express = require('express');
const router = express.Router();
const app = express();

const {
    getUserLogin,
    getUserDetails
} = require('../helpers/dataHelpers');


module.exports = ({
    getUserLogin,
    getUserDetails
}) => {
    router.post('/', (req, res) => {
        const {email, password} = req.body;
        getUserLogin(email, password)
          .then((response) => {
            res.json({
                response: {
                    id: response.id,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email
                }
            });
          })
          .catch((err) => res.json({
            error: err.message
          }));
      });

    return router;
};

