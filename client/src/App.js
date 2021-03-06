import './App.css';
import useApplicationData from './hooks/useApplicationData';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Slideshow from './components/Slideshow';
import picture4 from './pictures/img4.jpg';
import picture5 from './pictures/img5.jpg';
import picture6 from './pictures/img6.jpg';
import picture1 from './pictures/picture1.jpeg';
import picture2 from './pictures/picture2.jpeg';
import picture3 from './pictures/picture3.jpeg';

const App = () => {

  const [cookies] = useCookies(['user']);

  const { user = {} } = cookies;
  const { firstName } = user;

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
        <h2 className='create-title'>Create Your Itinerary Today!</h2>
        <Slideshow images={[picture1, picture2, picture3]} />
        {firstName && (
                <>
                <button onClick={() => handleRouteClick("/newItinerary")} type="button">Create Now</button>
                </>)}
        
        <br></br><br></br><br></br><br></br><br></br>
        <h2 className='title'>View Other Itinerary</h2>
        <br></br><br></br><br></br>
        <div className='itinerary-button'>
          <div className='picture4'>
            <button onClick={() => handleRouteClick("/view/1")} type="button"><img src={picture4} /></button>
          </div>
          <br></br><br></br>
          <div className='picture5'>
            <button onClick={() => handleRouteClick("/view/2")} type="button"><img src={picture5} /></button>
          </div>
          <br></br><br></br>
          <div className='picture6'>
            <button onClick={() => handleRouteClick("/view/3")} type="button"><img src={picture6} /></button>
          </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br>
      </div>
    </div>
  );
};

export default App;
