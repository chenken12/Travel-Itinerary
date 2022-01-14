import './App.css';
import axios from 'axios';
import {userState, useEffect} from 'react';

function App() {

  useEffect(() => {
    axios.get('http://localhost:8080/api/users').then(response => {
      console.log(response);
    })
  }, [])
  return (
    <div className="App">
      <h1>Travel Itinerary App</h1>
    </div>
  );
}

export default App;
