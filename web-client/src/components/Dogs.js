import React, {Component} from 'react';
import {apiGET} from "../hoc/get";
import {Link, NavLink} from "react-router-dom";

const DogLine = ({data}) =>
  <tr>
    <td><img width="50" src={data.photoURL}/></td>
    <td>
      <Link to={`/dogs/${data.id}`}>{
        data.displayName}
      </Link>
    </td>
    <td>{data.breed.name}</td>
  </tr>;

class _Dogs extends Component {
  state = {
    displayName: ''
  };

  render() {
    const {data} = this.props;
    return (
      <div>
        <div className="row">
          <input onChange={event => this.setState({displayName: event.target.value})}
                 type="text"
                 value={this.state.displayName}
                 placeholder="Ajouter un chien"/>
        </div>
        <div className="row">
          <button onClick={this.addBreed}
                  className="btn">Ajouter
          </button>
        </div>
        <div className="row">
          <table>
            <thead>
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Race</th>
            </tr>
            </thead>
            <tbody>
            {data.map(dog => <DogLine key={dog.id} data={dog}/>)}
            </tbody>
          </table>
        </div>
      </div>
        );
        }
        }

        export const Dogs = apiGET('/dogs')(_Dogs);
