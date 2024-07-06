import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'; // Import BrowserRouter

import './App.css';
import Home from './screens/Home';
import AdminOrder from './components/AdminOrder1';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // Import Bootstrap CSS file
import 'bootstrap';

function App() {
  return (
    <Router> {/* Wrap your application in BrowserRouter */}
      <div>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path='/adminorder' element={<AdminOrder/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

