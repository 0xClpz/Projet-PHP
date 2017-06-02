import React, {Component} from 'react';
import {apiGET} from "../hoc/get";
import {connect} from "react-redux";

const BreedLine = ({data, isAdmin, deleteBreed}) =>
  <tr>
    <td>{data.id}</td>
    <td>{data.name}</td>
    <td>{isAdmin ? <button onClick={deleteBreed} className="btn">Delete</button> : null}</td>
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

  deleteBreed = (id) => {
    this.props.makeRequest('delete', `/breeds/${id}`);
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
          {data.map(breed =>
            <BreedLine
              isAdmin={this.props.isAdmin}
              deleteBreed={() => this.deleteBreed(breed.id)}
              key={breed.id}
              data={breed}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({...auth});

export const Breeds = connect(mapStateToProps)(apiGET('/breeds')(_Breeds));
