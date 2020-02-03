import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableHighlight, Text} from 'react-native';

import Tasks from '../components/Tasks';
import Edit from '../components/Edit';
import Add from '../components/Add';

const NavStack = createStackNavigator({
  Tasks: {
    screen: Tasks,
    navigationOptions: ({navigation}) => ({
      headerTitle: 'Tasks',
      headerTintColor: '#6495ed',
      headerLeft: () => (
        <TouchableHighlight
          onPress={() => {
            navigation.openDrawer();
            //navigation.navigate('SigninScreen');
          }}>
          <Icon
            name="ellipsis-v"
            size={20}
            color="#6495ed"
            style={{marginLeft: 10}}></Icon>
        </TouchableHighlight>
      ),
      headerRight: () => (
        <TouchableHighlight onPress={() => navigation.navigate('Add')}>
          <Icon
            name="plus-circle"
            size={30}
            color="#6495ed"
            style={{marginRight: 10}}></Icon>
        </TouchableHighlight>
      ),
    }),
  },
  Edit: {
    screen: Edit,
    navigationOptions: () => ({
      headerTintColor: '#6495ed',
    }),
  },
  Add: {
    screen: Add,
  },
});

export default NavStack;
