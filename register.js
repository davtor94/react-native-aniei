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
constructor(props){
  super(props)
  this.state = {
    nip: "",
    codigo : "",
    iAmStudent: false,
  }
}
handleChangeCodigo = (typedText) =>{
  this.setState({codigo: typedText});
}

handleChangeNip = (typedText) =>{
  this.setState({nip: typedText});
}
toggleiAmStudent = () => {
    this.setState({
        iAmStudent: !this.state.iAmStudent
    });
}
onPressIngresar = () => {
  fetch('http://148.202.152.33/ws_general.php', {

method: 'POST',
headers: new Headers({
         'Content-Type': 'application/x-www-form-urlencoded',
}),
body: "codigo="+ this.state.codigo+ "&nip="+ this.state.nip
}).then((response) =>  response.text())
.then((responseText) => {
Alert.alert(responseText)
  })
  .catch((error) => {
    console.error(error);
  });
}

renderiAmStudent() {
    if (this.state.iAmStudent) {
        return (
          <View>

                    <TextInput
                               style = {styles.input}
                               autoCapitalize="none"
                               onSubmitEditing={() => this.passwordInput.focus()}
                               autoCorrect={false}
                               keyboardType='default'
                               returnKeyType="next"
                               onChangeText={this.handleChangeCodigo}
                               value={this.state.codigo}
                               placeholder='CODIGO'>
                      </TextInput>
                      <TextInput style = {styles.input}
                              autoCapitalize="none"
                              returnKeyType="go"
                              ref={(input)=> this.passwordInput = input}
                              placeholder='NIP'
                              onChangeText={this.handleChangeNip}
                              value={this.state.nip}
                              secureTextEntry/>

                        <TouchableOpacity style={styles.buttonSignin}
                          onPress={this.onPressIngresar}
                        >
                            <Text  style={styles.buttonText}>ingresar</Text>
                        </TouchableOpacity>
        </View>

        );
    } else {
        return (
          null
        );

    }
}


  render() {
        const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
        {this.renderiAmStudent()}
        <TouchableOpacity style={styles.buttonSignin}
          onPress={this.toggleiAmStudent}
        >
            <Text  style={styles.buttonText}>Soy UDG</Text>
        </TouchableOpacity>

        <TextInput
                  style = {styles.input}
                   autoCapitalize="none"
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   placeholder='NOMBRE'>
        </TextInput>

        <TextInput style = {styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput2.focus()}
                ref={(input)=> this.passwordInput = input}
                placeholder='CONTRASEÑÑA'
                onChangeText={this.handleChangeNip}
                value={this.state.nip}
                secureTextEntry>
      </TextInput>

      <TextInput style = {styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              ref={(input)=> this.passwordInput2 = input}
              placeholder='REPETIR CONTRASEÑÑA'
              onChangeText={this.handleChangeNip}
              value={this.state.nip}
              secureTextEntry>
    </TextInput>

    <TextInput style = {styles.input}
            autoCapitalize="none"
            returnKeyType="next"
            ref={(input)=> this.passwordInput = input}
            placeholder='CONTRASEÑÑA'
            onChangeText={this.handleChangeNip}>
  </TextInput>

  <TextInput style = {styles.input}
          autoCapitalize="none"
          returnKeyType="next"
          ref={(input)=> this.passwordInput = input}
          placeholder='CONTRASEÑÑA'
          onChangeText={this.handleChangeNip}
          secureTextEntry>
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
        width: 200
    },
    buttonSignin:{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#84a5ba',
          height: 30,
          marginTop: 15,
          borderRadius: 25,
          width: 200
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
    width: 200,
    borderColor: 'gray',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth
  },
});
