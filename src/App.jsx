import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Apartments from './pages/Apartments';

import ApartmentDetails from "./components/ApartmentDetails"
const App = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apartments' element={<Apartments />} />
        <Route path="/apartments/:id" element={<ApartmentDetails />} /> {/* New route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
