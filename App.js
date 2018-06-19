import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView } from 'react-native';
import Login from './src/components/login/login';
export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./src/components/images/logo-udg.png')}
            resizeMode="contain"
          />

        <TextInput
                  style = {styles.input}
                  underlineColorAndroid = "transparent"
                   autoCapitalize="none"
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   placeholder='username'/>

          <TextInput style = {styles.input}
                  autoCapitalize="none"
                  returnKeyType="go"
                  ref={(input)=> this.passwordInput = input}
                  placeholder='Password'
                  secureTextEntry/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
      position: 'relative',
      width: 40 + "%",
      height: 40 + "%",
      opacity : .5,
      margin: 0
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
