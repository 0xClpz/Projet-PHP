import React from 'react';

export const Login = () =>
  <div className="row">
    <form className="col s12">
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
        <button className="btn">Se connecter</button>
      </div>
    </form>
  </div>;
