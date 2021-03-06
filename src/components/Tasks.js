import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
const {width, height} = Dimensions.get('window');

class Tasks extends Component {
  _isComplete = item => {
    const {taskActionCreators} = this.props;
    const {isComplete} = taskActionCreators;
    const setComplete = !item.isComplete;
    const {key} = item;

    Alert.alert(
      'Do you complete this task?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => isComplete(key, setComplete)},
      ],
      {cancelable: false},
    );
  };
  _deleteBlog = id => {
    const {taskActionCreators} = this.props;
    const {deleteBlog} = taskActionCreators;
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteBlog(id)},
      ],
      {cancelable: false},
    );
  };
  _navigateEdit = item => {
    const {navigation} = this.props;
    navigation.navigate('Edit', {...item});
  };
  _renderFlatList = item => {
    const {_deleteBlog, _navigateEdit, _isComplete} = this;
    return (
      <View
        style={{
          backgroundColor: '#6495ed',
          flex: 1,
          margin: 10,
          padding: 10,
          borderRadius: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            justifyContent: 'center',
            fontSize: 20,
          }}>
          {item.title}
        </Text>
        <Divider style={{backgroundColor: 'white', margin: 5}} />
        <Text style={{lineHeight: 20, fontSize: 15, color: 'white'}}>
          {item.content}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableHighlight
            onPress={() => _isComplete(item)}
            underlayColor="#6495ed">
            <View style={{marginRight: 10}}>
              <Icon name="check-square" size={20} color="white"></Icon>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => _navigateEdit(item)}
            underlayColor="#6495ed">
            <View style={{marginRight: 10}}>
              <Icon name="edit" size={20} color="white"></Icon>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#6495ed"
            onPress={() => {
              _deleteBlog(item.key);
            }}>
            <View style={{marginRight: 5}}>
              <Icon name="trash" size={20} color="white"></Icon>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  };
  componentDidMount() {
    const {taskActionCreators} = this.props;
    const {getBlogs} = taskActionCreators;
    getBlogs();
  }
  render() {
    const {_navigateEdit, _renderFlatList, _deleteBlog} = this;
    const {listBlogs, loading} = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        {loading ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading data.....</Text>
          </View>
        ) : (
          <FlatList
            style={{width: '100%'}}
            data={listBlogs}
            keyExtractor={item => item.key}
            renderItem={({item}) => {
              if (item.isComplete == false) {
                return _renderFlatList(item);
              }
              return null;
            }}
          />
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    taskActionCreators: bindActionCreators(actions, dispatch),
  };
};
const mapStateToProps = state => {
  const data = _.map(state.Blog.blogs, (val, key) => {
    return {...val, key: key};
  });
  return {listBlogs: data, loading: state.Loading.loading};
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Tasks);
