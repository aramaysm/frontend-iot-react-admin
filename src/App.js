import Login from './Components/Login';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
 
  withRouter,
  useHistory,
} from "react-router-dom";
import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Devices_Operations from './Components/Devices_Operations';


export default function App(props) {
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState("");

  const handleLoggin = (data) => {
    setAuthed(true);
    setUser(data);
  };


  return (
    <Router>
      <Routes>
      <Route
          path='/login' element={<Login
            {...props}
            handleLoggin={handleLoggin}
            authed={authed}
          />}
          
        />
        <Route
          path='/devices' element={<Devices_Operations/>}
          
        />
      </Routes>
    </Router>
  )
}
