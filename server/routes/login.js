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
const {
    getUserLogin
} = require('../helpers/dataHelpers');


module.exports = ({
    getUserLogin
}) => {
    router.post('/', (req, res) => {
        // console.log("Post login route", req.body);
        // const {email, password} = req.body;
        // return res.status(200).json({test: "Test"})
        const {email, password} = req.body;
        getUserLogin(email, password)
          .then((response) => {
            //   console.log("This is in the response", response);
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
    return router;
};
