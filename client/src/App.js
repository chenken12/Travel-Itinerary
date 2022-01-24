import './App.css';
import useApplicationData from './hooks/useApplicationData';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Slideshow from './components/Slideshow';

const App = () => {

  const navigate = useNavigate();

  const {
    state,
    dispatch
  } = useApplicationData();
  const handleRouteClick = (path = '/') => {
    navigate(path);
  }
  const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
  ));


  return (
    <div className="App">
      <div className='background-main'>
        <button onClick={() => handleRouteClick("/edit/1")} type="button">Add Pins page</button>
        <button onClick={() => handleRouteClick("/usersTravels")} type="button">usersTravels page</button>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

        <h2>Create Your Itinerary Today!</h2>
        <Slideshow />

        <button onClick={() => handleRouteClick("/newItinerary")} type="button">Create Now</button>
        <br></br><br></br><br></br><br></br><br></br>

        <h2>View Other Itinerary</h2>
        <button onClick={() => handleRouteClick("/view/1")} type="button">View</button>
        <br></br><br></br>
        <button onClick={() => handleRouteClick("/view/2")} type="button">View</button>
        <br></br><br></br>
        <button onClick={() => handleRouteClick("/view/3")} type="button">View</button>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
    </div>
  );
};

export default App;
