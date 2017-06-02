import React, {Component} from 'react';
import Select from 'react-select';
import {Link} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";

import {apiGET} from "../hoc/get";
import {backend_url} from "../constants/backend";

import 'react-select/dist/react-select.css';

const shouldDisplayButton = (isAdmin, user_id, data) => data.user_id === user_id || isAdmin;

const DogLine = ({isAdmin, user_id, data, deleteDog, setEditMode}) =>
  <tr>
    <td><img width="50" src={data.photoURL}/></td>
    <td>
      <Link to={`/dogs/${data.id}`}>{
        data.displayName}
      </Link>
    </td>
    <td>{data.breed.name}</td>
    <td>{shouldDisplayButton(isAdmin, user_id, data) ?
      <span>
        <button className="btn" onClick={deleteDog}>Supprimer</button>
        <button className="btn" onClick={setEditMode}>Editer</button>
      </span>: null}</td>
  </tr>;

class _Dogs extends Component {
  state = {
    displayName: '',
    photoURL: '',
    user_id: this.props.user_id,
    editMode: false,
  };

  getBreeds = () =>
    axios({
      url: `${backend_url}/breeds`,
      headers: {
        'Authorization': this.props.token,
      }
    }).then(({data}) => {
        const res = data
          .map(breed => ({value: breed.id, label: breed.name}));
        console.log(res);
        return {options: res};
      })
      .catch(console.log);

  deleteDog = (id) => {
    this.props.makeRequest('delete', `/dogs/${id}`);
  };

  addDog = () => {
    this.props.makeRequest('post', '/dogs', this.state);
    this.setState({
      displayName: '',
      photoURL: '',
    });
  };

  setEditMode = id => {
    const dog = this.props.data.find(dog => dog.id === id);
    this.setState({
      ...dog,
      editMode: true
    });
  };

  setNormalMode = () => {
    this.setState({
      displayName: '',
      photoURL: '',
      user_id: this.props.user_id,
      editMode: false
    });
  };

  update = () => {
    console.log(this.state);
    this.props.makeRequest('put', `/dogs/${this.state.id}`, this.state);
    this.setNormalMode();
  };

  render() {
    const {data} = this.props;
    return (
      <div>
        <div className="row">
          <input onChange={event => this.setState({displayName: event.target.value})}
                 type="text"
                 value={this.state.displayName}
                 placeholder="Nom du chien"/>
          <input onChange={event => this.setState({photoURL: event.target.value})}
                 type="text"
                 value={this.state.photoURL}
                 placeholder="Photo du chien"/>
        </div>
        <Select.Async
          name="breed_id"
          value="one"
          onChange={({value: breed_id}) => this.setState({breed_id})}
          loadOptions={this.getBreeds}
        />
        <div className="row">
          {
            !this.state.editMode ?
              <button onClick={this.addDog}
                      className="btn">Ajouter
              </button>
              :
              <button
                className="btn"
                onClick={this.update}>
                Update
              </button>
          }
        </div>
        <div className="row">
          <table>
            <thead>
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Race</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map(dog =>
              <DogLine
                user_id={this.props.user_id}
                isAdmin={this.props.isAdmin}
                setEditMode={() => this.setEditMode(dog.id)}
                deleteDog={() => this.deleteDog(dog.id)}
                key={dog.id}
                data={dog}/>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => ({...auth});
export const Dogs = connect(mapStateToProps)(apiGET('/dogs')(_Dogs));
