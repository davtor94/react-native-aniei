import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView } from 'react-native';

import Student   from './student';
export default class Register extends Component {
  static navigationOptions = {
  title: 'Registrate',
};

  render() {
        const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
        <Student/>
        <TextInput
                  style = {styles.input}
                   autoCapitalize="none"
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   placeholder='CODIGO'>
                  </TextInput>

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
},
  buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2980b6',
        height: 30,
        marginTop: 15,
        borderRadius: 25,
        width: 60 + "%"
    },
    buttonSignin:{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#84a5ba',
          height: 30,
          marginTop: 15,
          borderRadius: 25,
          width: 60 + "%"
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  input : {
    textAlign: 'center',
    marginTop: 5,
    height: 30,
    width: 60 + "%",
    borderColor: 'gray',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth
  },
});
