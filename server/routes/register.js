const express = require('express');
const router = express.Router();

module.exports = ({
    addUserRegistration
}) => {
    router.post('/', (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        addUserRegistration(firstName, lastName, email, password)
            .then((response) => {
                console.log("This is a response from the server---", response);
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