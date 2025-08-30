import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from './pages/Register';
import Recipes from './pages/Recipes';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<h2>Page not found</h2>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/recipes/*" element={<Recipes/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
