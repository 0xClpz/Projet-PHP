import React, {Component} from 'react';
import {apiGET} from "../hoc/get";
import {connect} from "react-redux";

class _User extends Component {

  componentDidMount(){
    this.props.makeRequest('get', `/users/${this.props.match.params.id}`, null, 'user');
  }

  render(){
    const {user, isAdmin} = this.props;
    if(!user) return null;
    return (
      <div className="section">
        <div className="card">
          <figure className="card-profile-image">
            <img
              className="circle z-depth-2 responsive-img activator"
              src={user.photoURL}
              alt="profile image"/>
          </figure>
          <div className="card-content">
            <div className="row">
              <div className="col s3 offset-s2">
                <h4 className="card-title grey-text text-darken-4">
                  {user.displayName}
                </h4>
                <p className="medium-small grey-text">
                  {user.isAdmin ? 'Administrateur' : 'Utilisateur'}
                </p>
              </div>
              <div className="col s2 cent-align">
                <h4 className="card-title grey-text text-darken-4">
                  {user.dogs.length}
                </h4>
                <p className="medium-small grey-text">
                  Chiens
                </p>
              </div>
            </div>
            <button className="btn">Voir les chiens</button>
          </div>
        </div>
      </div>
    );
  }
}

export const User = apiGET('/users')(_User);
