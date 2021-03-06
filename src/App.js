import React from "react";
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';

import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

import PropTypes from 'prop-types';


const App=({location})=>(
  <div className="ui container">
    
      <Route location={location} path="/" exact component={HomePage }/>
      <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage }/>

      <GuestRoute location={location} path="/login" exact component={LoginPage } /> 
      <GuestRoute location={location} path="/signup" exact component={SignupPage } /> 
      <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage } /> 
      <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage } /> 
      <UserRoute location={location} path="/dashboard" exact component={DashboardPage } />

  </div>);

  App.propTypes={
    location:PropTypes.shape({
      pathname:PropTypes.string.isRequired
    }).isRequired
  };


export default App;
