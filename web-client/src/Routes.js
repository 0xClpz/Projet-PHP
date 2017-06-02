import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Landing} from "./components/Landing";
import {Users} from "./components/Users";
import {Dogs} from "./components/Dogs";
import {User} from "./components/User";
import {Dog} from "./components/Dog";
import {Signup} from "./components/Signup";

export const Routes = () =>
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/users" component={Users}/>
    <Route path="/users/:id" component={User}/>
    <Route path="/dogs" component={Dogs}/>
    <Route path="/dogs/:id" component={Dog}/>
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Signup} />
  </Switch>;
