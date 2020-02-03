import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Dimensions,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Images from '../constants/images';

const {width, height} = Dimensions.get('window');

class Logout extends Component {
  state = {
    username: '',
    password: '',
  };
  _loginFacebook = navigation => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          navigation.navigate('AppScreen');
          console.log('Hello');
        }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  render() {
    const {username, password} = this.state;
    const {navigation} = this.props;
    const {_loginFacebook} = this;
    return (
      <ImageBackground
        resizeMode="cover"
        source={Images.images.loginBackground}
        style={{height: '100%'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            placeholderTextColor="white"
            maxLength={100}
            placeholder="Username"
            onChangeText={username => this.setState({username})}
            value={username}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            onChangeText={password => this.setState({password})}
            value={password}
            style={styles.textInput}
          />
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigation.navigate('AppScreen')}>
            <View
              style={{
                marginTop: 50,
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6495ed',
                opacity: 0.8,
                height: 50,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>OK</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => _loginFacebook(navigation)}>
            <View
              style={{
                marginTop: 20,
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6495ed',
                opacity: 0.8,
                height: 50,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>
                <Icon name="facebook-f" size={20} />
                {'     '}
                Login with Facebook
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'white',
    width: width - 20,
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
});

export default Logout;
