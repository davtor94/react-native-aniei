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
    usuario: "",
    password: "",
    password2: "",
    correo: "",
    nombre: "",
    institucion: "",
  }
}
handleChangeCodigo = (typedText) =>{
  this.setState({codigo: typedText});
}

handleChangeNip = (typedText) =>{
  this.setState({nip: typedText});
}
toggleiAmStudent = () => {
    Alert.alert("Ingrese codigo y nip correspondiendtes a siiau")
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
//Alert.alert(responseText)
var res = responseText.split(",")
this.setState({
  usuario: res[1],
  password: this.state.nip,
  password2: this.state.nip,
  nombre: res[2],
  institucion: res[3] + "(" + res[4] +")",
  iAmStudent: false,
  });
  })
  .catch((error) => {
    console.error(error);
  });
}

renderiAmStudent() {
    if (this.state.iAmStudent) {
        return (
          <View
            style = {styles.containerStudent}>

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

                       <TouchableOpacity style={styles.buttonContainer}
                          onPress={this.onPressIngresar}>
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
        <TouchableOpacity style={styles.buttonStudent}
          onPress={this.toggleiAmStudent}>
            <Text  style={styles.buttonText}>Soy UDG</Text>
        </TouchableOpacity>
        <TextInput
                  style = {styles.input}
                   autoCapitalize="words"
                   onSubmitEditing={() => this.nombreInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   value={this.state.usuario}
                   placeholder='Usuario'>
        </TextInput>

        <TextInput
                  style = {styles.input}
                   autoCapitalize="none"
                   ref={(input)=> this.nombreInput = input}
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   value={this.state.nombre}
                   placeholder='Nombre'>
        </TextInput>

        <TextInput style = {styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput2.focus()}
                ref={(input)=> this.passwordInput = input}
                placeholder='Contraseña'
                value={this.state.password}
                secureTextEntry>
      </TextInput>

      <TextInput style = {styles.input}
              autoCapitalize="none"
              returnKeyType="next"
              ref={(input)=> this.passwordInput2 = input}
              placeholder='Repetir Contraseña'
              onSubmitEditing={() => this.institucionInput.focus()}
              value={this.state.password2}
              secureTextEntry>
    </TextInput>

    <TextInput style = {styles.input}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.correoInput.focus()}
            ref={(input)=> this.institucionInput = input}
            placeholder='Institucion'
            value={this.state.institucion}
            value={this.state.institucion}>
  </TextInput>

  <TextInput style = {styles.input}
          autoCapitalize="none"
          returnKeyType="go"
          ref={(input)=> this.correoInput = input}
          placeholder='Correo'
          value={this.state.correo}
          secureTextEntry>
</TextInput>
<TouchableOpacity style={styles.buttonContainer}>
     <Text  style={styles.buttonText}>Registrate</Text>
 </TouchableOpacity>
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
        width: 200,
        alignSelf: 'flex-end',
    },
    buttonStudent:{
          alignItems: 'center',
          marginTop: 15,
          justifyContent: 'center',
          backgroundColor: '#84a5ba',
          height: 50,
          marginTop: 15,
          borderRadius: 25,
          width: 200
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  containerStudent: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  input : {
    textAlign: 'center',
    marginTop: 25,
    height: 40,
    width: 300,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth
  },
});
