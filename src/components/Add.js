import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Dimensions,
  TouchableHighlight,
  Keyboard,
} from 'react-native';

import * as actions from '../actions';

const {width, height} = Dimensions.get('window');
class Post extends Component {
  state = {
    title: '',
    content: '',
  };
  _submit = () => {
    const {postActionCreators} = this.props;
    const {navigation} = this.props;
    const {postBlogs} = postActionCreators;
    const {title, content} = this.state;
    postBlogs(title, content);
    console.log('Hello', this.state);
    this.setState({title: '', content: ''});
    navigation.navigate('Tasks');
  };
  render() {
    const {title, content} = this.state;
    const {_submit, _onChangeText} = this;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            inlineImageLeft="search_icon"
            maxLength={100}
            placeholder="Title"
            onChangeText={title => this.setState({title})}
            value={title}
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: 'gray',
              width: width - 20,
              padding: 10,
              borderRadius: 10,
            }}
          />
          <TextInput
            multiline
            numberOfLines={5}
            placeholder="Content"
            onChangeText={content => this.setState({content})}
            value={content}
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: 'gray',
              width: width - 20,
              padding: 10,
              borderRadius: 10,
              height: height / 4,
            }}
          />
          <TouchableHighlight onPress={() => _submit()}>
            <View
              style={{
                marginTop: 50,
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#6495ed',
                height: 50,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 20}}>OK</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postActionCreators: bindActionCreators(actions, dispatch),
  };
};
const mapStateToProps = state => {
  return state;
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Post);
