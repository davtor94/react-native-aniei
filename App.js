import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './login';
import Register from './register';
import Main from './main';



const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Main: Main,
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      title: 'Conferencias "Aniei 2018"',
      headerStyle: {
        backgroundColor: '#2980b6',
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
