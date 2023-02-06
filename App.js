import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Provider } from 'react-redux';

import AppNavigation from './navigation'
import { store } from './store';

// TEST PART
import NetInfo from "@react-native-community/netinfo";

NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});
// end TEST PART
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