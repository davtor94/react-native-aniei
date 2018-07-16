import React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './login';
import Register from './register';
import Main from './main';
import QrScanner from './qr';
import ConferenceDescriptionScreen from './conference-description';

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Main: Main,
    QrScreen: QrScanner,
    Conference: ConferenceDescriptionScreen,
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

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default class App extends React.Component {
  render(){
    return (
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <RootStack/>
      </View>

      );

  }

}
//Prueba
