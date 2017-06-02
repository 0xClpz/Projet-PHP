import React, {Component} from 'react';
import {backend_url} from "../constants/backend";

export const apiGET = (url, initialData = []) => WrappedComponent =>
  class GetHOC extends Component {
    state = {
      data: initialData,
      err: null,
    };

    componentWillMount(){
      fetch(`${backend_url}${url}`)
        .then(data => data.json())
        .then(data => this.setState({data}))
        .catch(err => this.setState({err}));
    }

    render(){
      const props = {...this.props, ...this.state};
      return <WrappedComponent {...props}/>
    }
  };
