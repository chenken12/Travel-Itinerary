const express = require('express');
const router = express.Router();
// const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
const app = express();
// app.use(cookieParser());

// app.use(
//     cookieSession({
//       name: "session",
//       keys: ["key1", "key2"]
//     })
//   );


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
              console.log("This is in the response", response);

            //   req.session["userId"] = response.id;

            // res.json({response});
            res.json({
                response: {
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

    //   router.get('/get_login', function (req, res) {
    //     const id = req.session.userId;
    //     console.log("This is the id", id);
    //     getUserDetails(id).then((response) => {
    //       res.json({ response });
    //     })
    //       .catch((err) => res.json({
    //         error: err.message
    //       }));
    //   })
    return router;
};

