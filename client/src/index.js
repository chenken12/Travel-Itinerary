import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';
import Login from "./routes/login";
import Register from "./routes/register";
import NewItinerary from "./routes/newItinerary";
import UsersTravels from "./routes/usersTravels";
import AddPins from "./routes/addPins";
import ViewOtherItinerary from './routes/viewOtherItinerary';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/navBar';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <CookiesProvider>
      <NavBar  />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="newItinerary" element={<NewItinerary />} />
        <Route path="usersTravels" element={<UsersTravels />} />
        <Route path="addPins/:id" element={<AddPins />} />
        <Route path="viewOtherItinerary/:id" element={<ViewOtherItinerary />} />
      </Routes>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
