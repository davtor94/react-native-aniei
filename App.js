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
import QrScanner from './qr'



const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Main: Main,
    QrScreen: QrScanner,
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
      headerRight: (
      <Button
        style
        onPress={() => alert('This is a button!')}
        title="Perfil"
        color="#207ab2"
      />
      ),
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
//Prueba
