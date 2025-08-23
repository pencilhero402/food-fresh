import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";

import NavButtons from './components/Button';
import './App.css'

function App() {
    return (
        <BrowserRouter>
        <div className='App'>
            <header className='header'>
                <h1>Creatorverse</h1>
                <NavButtons/>
            </header>
            <main className='main'>
                <Routes>
                <Route path="/" element={<ShowCreators />} />
                <Route path="/creators" element={<ShowCreators />} />
                <Route path="/creators/:id" element={<ViewCreator />} />
                <Route path="/creators/:id/edit" element={<EditCreator />} />
                <Route path="/add" element={<AddCreator />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
            </main>
        </div>
        </BrowserRouter>
    );
}
export default App;
