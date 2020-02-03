import React from 'react';
import {
  TouchableHighlight,
  Text,
  Button,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import {Divider} from 'react-native-elements';
import NavStack from './Home';
import Login from '../components/Login';
import Completes from '../components/Completes';
import DrawerContent from '../components/DrawerContent';
import {ScrollView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const BottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: NavStack,
    },
    Completes: {
      screen: Completes,
      navigationOptions: () => ({
        title: 'Complete Task',
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;
        } else if (routeName === 'Completes') {
          iconName = `check`;
        }
        return (
          <Icon
            name={iconName}
            size={20}
            color={focused ? '#1e90ff' : '#a9a9a9'}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1e90ff',
      inactiveTintColor: '#a9a9a9',
    },
  },
);
const SigninScreen = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
});
const homeDrawer = createDrawerNavigator(
  {
    BottomTab: {
      screen: BottomTab,
      navigationOptions: ({navigation}) => ({
        drawerLabel: 'Home',
      }),
    },
  },
  {
    initialRouteName: 'BottomTab',
    contentComponent: props => (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <SafeAreaView>
          <DrawerItems {...props} />
        </SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            LoginManager.logOut();
            props.navigation.navigate('SigninScreen');
          }}>
          <View style={styles.item}>
            <Icon name="sign-out-alt" size={20} />
            <Text style={styles.label}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    ),
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      SigninScreen: SigninScreen,
      AppScreen: homeDrawer,
    },
    {initialRouteName: 'SigninScreen'},
  ),
);
