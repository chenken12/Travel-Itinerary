
// const { response } = require('express');
// const express = require('express');
// const router = express.Router();

// module.exports = ({
//   userLogin
// }) => {
//   router.post('/', (req, res) => {
//     return res.status(200).json({test: "Test"})
//     const {email, userPassword} = req.body;
//     userLogin(email, userPassword)
//       .then((login) => {
//         response.status(204).json({});
//       })
//       .catch((err) => res.json({
//         error: err.message
//       }));
//   });

//   return router;

// };



const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const app = express();
app.use(cookieParser());

app.use(
    cookieSession({
      name: "session",
      keys: ["key1", "key2"]
    })
  );

const {
    getUserLogin,
    getUserDetails
} = require('../helpers/dataHelpers');



module.exports = ({
    getUserLogin,
    getUserDetails
}) => {
    router.post('/', (req, res) => {
        // console.log("Post login route", req.body);
        // const {email, password} = req.body;
        // return res.status(200).json({test: "Test"})
        const {email, password} = req.body;
        getUserLogin(email, password)
          .then((response) => {
              console.log("This is in the response", response.id);

              req.session["userId"] = response.id;

            res.json({response});
            // if(response.data.length > 0) {
            //     console.log("This is a testt in the if blockkkk!!", response);
            //     res.redirect("/");
            // }
          })
          .catch((err) => res.json({
            error: err.message
          }));
      });

      router.get('/get_login', function (req, res) {
        const id = req.session.userId;
        console.log("This is the id", id);
        getUserDetails(id).then((response) => {
          res.json({ response });
        })
          .catch((err) => res.json({
            error: err.message
          }));
      })
    return router;
};

