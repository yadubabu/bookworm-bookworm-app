import React from "react";
import {Routes,Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';


const App=()=>
  <div className="ui container">
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<LoginPage />} />
    </Routes>

  </div>


export default App;
