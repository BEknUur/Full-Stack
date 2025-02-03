import React from 'react';
import HomePage from './components/HomePage';


import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router';
function App(){
  return(
    <body >
      <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginForm/>} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/" element={<HomePage />}/>
            </Routes>
           </BrowserRouter>
      </body>
  );
}
export default App;