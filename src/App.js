import React from 'react';
import Main from './components/pages/Main.js';
import Login from './components/pages/Login.js';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import logo from './logo.svg';
import './styles/App.css';

function App() {

  let redirect;
  if (window.location.pathname === "/") {
    redirect = <Redirect to="/login" />
  }
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          {redirect}
          <Route path="/login" component={Login} />
          <Route path="/home" component={Main} />
      </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
