import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

import Crud from './src/navigation';
import store from './src/helper/ReduxConfiguration';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Crud />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({});
