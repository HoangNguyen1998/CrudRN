import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={{flex: 1, marginTop: 50}}>
        <Button
          title="Sign out"
          onPress={() => this.props.navigation.navigate('SigninScreen')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
