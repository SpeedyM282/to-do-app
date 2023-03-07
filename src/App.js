import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import Admin from './pages/Admin';
import './App.scss';

// add 404 page path={*}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/to-do-app/' element={<Login />} />
        <Route path='/to-do-app/user' element={<UserPage />} />
        <Route path='/to-do-app/admin/*' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
