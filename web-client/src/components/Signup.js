import React from 'react';

export const Signup = () =>
  <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s12">
          <input
            name="displayName"
            placeholder="Nom et prénom"
            type="text"
            className="validate" />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input
            name="email"
            placeholder="Adresse email"
            type="email"
            className="validate" />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input
            name="password"
            placeholder="Mot de passe"
            type="password"
            className="validate" />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input
            name="confirmPassword"
            placeholder="Mot de passe"
            type="password"
            className="validate" />
        </div>
      </div>
      <div className="row">
        <button className="btn">S'inscrire</button>
      </div>
    </form>
  </div>;
