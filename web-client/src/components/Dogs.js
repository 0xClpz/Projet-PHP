import React from 'react';
import {apiGET} from "../hoc/get";

const _Dogs = ({data}) =>
  <div>
    <ul>
      {data.map(dog => (
        <li key={dog.id}>{dog.displayName}</li>
      ))}
    </ul>
  </div>;

export const Dogs = apiGET('/dogs')(_Dogs);
