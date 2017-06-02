import React from 'react';
import {apiGET} from "../hoc/get";

const _Users = ({data}) =>
  <div>
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.displayName}</li>
      ))}
    </ul>
  </div>;

export const Users = apiGET('/users')(_Users);
