import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, connect } from 'react-redux';
import configureStore from './configureStore';
// Define the root element.
import SWAGGER from './swagger.js';
import PetList from './views/PetList';

import API from 'redux-api-middleware-addon';
const store = configureStore();
// import * as Action from 'actions';
// import { BASIC, entity } from 'helpers/api';

//

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <PetList />
        </div>
      </Provider>
    );
  }
  async componentDidMount() {
    console.log('API.Action', API.Action.setProtocol('https'));
    store.dispatch(API.Action.setProtocol('https'));
    store.dispatch(API.Action.setSwagger(SWAGGER));
    store.dispatch(
      API.Action.setHeaders({
        // 'X-Token': 'base64TokenForApiCall',
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
      })
    );

    store
      .dispatch(
        await API.Action.request(
          '/pet/findByStatus',
          {
            method: 'get',
            data: { status: 'available' },
            subst: null,
          },
          API.Helper.BASIC
        )
      )
      .then(res => console.log(res));

    store
      .dispatch(
        await API.Action.request(
          '/pet',
          {
            method: 'post',
            data: {
              name: 'ronald',
              id: 3,
              photoUrls: [
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Letter_d.svg/1200px-Letter_d.svg.png',
              ],
            },
          },
          API.Helper.BASIC
        )
      )
      .then(res => console.log(res));
    store
      .dispatch(
        await API.Action.request(
          '/pet/findByStatus',
          {
            method: 'get',
            data: { status: 'available' },
            subst: null,
          },
          API.Helper.entity('PETS_BY_ID')
        )
      )
      .then(res => console.log(res));
    store
      .dispatch(
        await API.Action.request(
          '/pet/{id}',
          {
            method: 'get',
            data: { status: 'available' },
            subst: { id: 1 },
          },
          API.Helper.BASIC
        )
      )
      .then(res => console.log(res));
  }
}

export default App;
