import React from 'react';

import RegistrationForm from './components/RegistrationForm';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
function App(){
  return(
    <body >
      <BrowserRouter>
            <Routes>
              <Route path="/login" element={<RegistrationForm />} />
              <Route path="/register" element={<RegistrationForm />} />
            </Routes>
           </BrowserRouter>
      </body>
  );
}
export default App;