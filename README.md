# Travel-Itinerary 
Travel-Itinerary is full stack web application built with React and Nodejs. 
Travel-Itinerary allow users to view other user's itinerary or create their own itinerary. Users in the view map page can add comments for other users to see. In the edit map page user can click on the map then add a name and date to save the markers on the server.

## Images of Product
!["Nav-Signup"](https://github.com/chenken12/Travel-Itinerary/blob/main/docs/Nav-Signup.png?raw=true)
!["Nav-Signin"](https://github.com/chenken12/Travel-Itinerary/blob/main/docs/Nav-Signin.png?raw=true)

!["Map-Edit"](https://github.com/chenken12/Travel-Itinerary/blob/main/docs/Map-edit.png?raw=true)
!["Map-View"](https://github.com/chenken12/Travel-Itinerary/blob/main/docs/Map-view.png?raw=true)

<img src="https://github.com/chenken12/Travel-Itinerary/blob/main/docs/User-Signup.png?raw=true" width="49%"> <img src="https://github.com/chenken12/Travel-Itinerary/blob/main/docs/User-Signin.png?raw=true" width="49%">

<img src="https://github.com/chenken12/Travel-Itinerary/blob/main/docs/Home-Top.png?raw=true" width="49%"> <img src="https://github.com/chenken12/Travel-Itinerary/blob/main/docs/Home-Bottom.png?raw=true" width="49%">

<img src="https://github.com/chenken12/Travel-Itinerary/blob/main/docs/User-Create.png?raw=true" width="49%"> <img src="https://github.com/chenken12/Travel-Itinerary/blob/main/docs/User-Edit.png?raw=true" width="49%">


## Stack
- Axios, Psql
- Express
- React
- Node

## Dependencies

### client
- @reach/combobox
- axios
- bootstrap
- dotenv
- google-map-react
- react
- react-bootstrap
- react-cookie
- react-datepicker
- react-dom
- react-router-dom
- react-scripts
- react-toastify
- use-places-autocomplete

### server
- bcrypt
- cookie-parser
- cookie-session
- cors
- express
- express-basic-auth
- morgan
- pg
- pg-native
 
## Getting Started

### client

* `npm install`
* go to https://console.cloud.google.com/ for api key
* For Api Credentials make sure Geocoding, Places, and Maps JavaScipt is enable
* create .env file with the following
```
REACT_APP_PLACEKEY="YOUR_KEY_HERE"
```
* `npm run start`

### server
* `npm install`
* create .env file with the following

```
DB_HOST = localhost
DB_USER = labber
DB_PASS = labber
DB_NAME = final_project
DB_PORT = 5432
```
* `npm db:reset`
* `npm run start`
