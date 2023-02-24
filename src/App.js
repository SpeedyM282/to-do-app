import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import TodoList from './pages/TodoList';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/to-do-app/' element={<Login />} />
        <Route path='/to-do-app/user' element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
