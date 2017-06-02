import React, {Component} from 'react';
import {apiGET} from "../hoc/get";

const BreedLine = ({data}) =>
  <tr>
    <td>{data.id}</td>
    <td>{data.name}</td>
  </tr>;

class _Breeds extends Component {

  state = {
    name: ''
  };

  addBreed = () => {
    this.props.makeRequest('post', '/breeds', this.state);
    this.setState({
      name: ''
    });
  };

  render(){
    const {data} = this.props;
    return (
      <div>
        <input onChange={event => this.setState({name: event.target.value})}
               type="text"
               value={this.state.name}
               placeholder="Ajouter une race"/>
        <button onClick={this.addBreed}
                className="btn">Ajouter</button>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
          </tr>
          </thead>
          <tbody>
          {data.map(breed => <BreedLine key={breed.id} data={breed}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapRequestsToProps = request => ({
  create: name => request('post', '/breeds', {name})
});

export const Breeds = apiGET('/breeds')(_Breeds);
