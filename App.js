import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './login';
import Register from './register';



const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
//Prueba