// import React, {Component} from 'react';
// import {Text, StyleSheet, View} from 'react-native';

// export default class Edit extends Component {
//   render() {
//     console.log('data pass: ', this.props.navigation.state);
//     return (
//       <View>
//         <Text> This is edit page </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({});

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Button,
} from 'react-native';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions';
const {width, height} = Dimensions.get('window');

class Edit extends Component {
  state = {
    title: this.props.navigation.state.params.title,
    content: this.props.navigation.state.params.content,
  };
  _submit = () => {
    const {editActionCreators} = this.props;
    const {editBlog} = editActionCreators;
    const {key} = this.props.navigation.state.params;
    const {title, content} = this.state;
    editBlog(key, title, content);
    this.props.navigation.goBack();
  };
  render() {
    console.log('data pass: ', this.props.navigation.state);
    const {title, content} = this.state;
    const {_submit} = this;
    console.log(title, content);
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
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
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editActionCreators: bindActionCreators(actions, dispatch),
  };
};
const mapStateToProps = state => {
  return state;
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Edit);
