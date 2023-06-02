import Dashboard from './components/Admin/Dashboard/Dashboard';
import Event from './components/Admin/Event/Event';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import setAuthToken from './utils/auth';
import { Toaster } from 'react-hot-toast';
import CreateEvent from './components/Admin/Event/CreateEvent';
import UpdateEvent from './components/Admin/Event/UpdateEvent';
import ViewEvent from './components/Admin/Event/ViewEvent';
import User from './components/Admin/User/User';
import ViewUser from './components/Admin/User/ViewUser';
import UpdateUser from './components/Admin/User/UpdateUser';
import ViewAppUser from './components/Admin/User/ViewAppUser';
import Registeration from './components/Admin/User/Registeration';
import UpdateAppUser from './components/Admin/User/UpdateAppUser';
import Header from './components/Header';
import './App.css';
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={true} />
      {isAuthenticated && <Header user={user} />}
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/admin'>
            <Route exact path='' element={<Dashboard />} />
            <Route exact path='events' element={<Event />} />
            <Route exact path='users' element={<User />} />
            <Route exact path='user/:id' element={<ViewUser />} />
            <Route exact path='appuser/:id' element={<ViewAppUser />} />
            <Route exact path='register' element={<Registeration />} />
            <Route exact path='user/update/:id' element={<UpdateUser />} />
            <Route exact path='appuser/update/:id' element={<UpdateAppUser />} />
            <Route exact path='event/new' element={<CreateEvent />} />
            <Route exact path='event/update/:id' element={<UpdateEvent />} />
            <Route exact path='event/:id' element={<ViewEvent />} />
          </Route>
          <Route exact path='/logout' element={<Logout />} />
        </Routes>
      </main>
    </Router>

  );
}

export default App;
