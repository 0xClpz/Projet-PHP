import React, { Component } from 'react';
import {NavLink, Link, BrowserRouter as Router} from 'react-router-dom';
import {Routes} from "./Routes";

import './Routing.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">Dogemon Go</Link>
              <ul className="right hide-on-med-and-down">
                <li><NavLink to="/dogs">Chiens</NavLink></li>
                <li><NavLink to="/users">Utilisateurs</NavLink></li>
                <li><NavLink to="/login">Se connecter</NavLink></li>
                <li><NavLink to="/signup">S'inscrire</NavLink></li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
