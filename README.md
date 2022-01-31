# Travel-Itinerary 
Travel-Itinerary is full stack web application built with React and Nodejs. 

## Images of Product

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
