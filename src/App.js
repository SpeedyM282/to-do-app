import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Admin from './pages/Admin';
import UserPage from './pages/UserPage';
import ErrorPage from "./pages/ErrorPage";
import './App.scss';

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route exact path='/*' element={<ErrorPage />} />
        <Route exact path='/to-do-app' element={<Login />} />
        <Route path='/to-do-app/user' element={<UserPage />} />
        <Route path='/to-do-app/admin' element={<Admin />} />
        <Route path='/to-do-app/admin/todos-list' element={<Admin />} />
        <Route path='/to-do-app/admin/users-list' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
