import React, {Component} from 'react';
import {NavLink, Link, BrowserRouter as Router} from 'react-router-dom';
import {Routes} from "./Routes";

import './Routing.css';
import {connect} from "react-redux";

class _App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">Dogemon Go</Link>
              <ul className="right hide-on-med-and-down">
                <li><NavLink to="/dogs">Chiens</NavLink></li>
                <li><NavLink to="/breeds">Races</NavLink></li>
                <li><NavLink to="/users">Utilisateurs</NavLink></li>
                {!this.props.isLoggedIn ?
                  <span>
                    <li><NavLink to="/login">Se connecter</NavLink></li>
                    <li>< NavLink to = "/signup" > S'inscrire</NavLink></li>
                  </span>
                  :
                  <span>
                    <li><NavLink to={`users/${this.props.user_id}`}>Mon profil</NavLink></li>
                  </span>
                }
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


const mapStateToProps = ({auth}) => ({...auth});
export const App = connect(mapStateToProps)(_App);
