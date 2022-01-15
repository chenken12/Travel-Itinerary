import './App.css';
import { Link } from "react-router-dom";
import useApplicationData from './hooks/useApplicationData';

const App = () => {
  const {
      state,
      dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));
return (<div className="App" >
  <h1> Users </h1>

  <ul> {userList} </ul>
  {/* <Link to="/login">Invoices</Link> |{" "}
  <Link to="/register">Expenses</Link> */}
</div >
);
};

export default App;
