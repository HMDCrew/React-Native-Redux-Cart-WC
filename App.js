import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Provider } from 'react-redux';

import AppNavigation from './navigation'
import { store } from './store';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  };
};