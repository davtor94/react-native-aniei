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
  Keyboard,
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
    keyboard: false,
    usuario: "",
    password: "",
    password2: "",
    correo: "",
    nombre: "",
    institucion: "",
  }
}

handleChange = (event) => {
  const target = event.target;
  const name = target.name;
  Alert.alert(event.typedText + name)
  this.setState({
    [name]: event.typedText
  });
}
componentDidMount () {
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
}
componentWillUnmount () {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
}
_keyboardDidShow = () =>{
  this.setState({
    keyboard: true,
  });
}
_keyboardDidHide = () => {
  this.setState({
    keyboard: false,
  });
}
toggleiAmStudent = () => {
  if(!this.state.iAmStudent){
    Alert.alert("Ingrese codigo y nip correspondiendtes a siiau")
  }
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
    if(responseText == "0"){
      Alert.alert("Codigo o nip invalido")
      this.setState({
        iAmStudent: false,
      });
    }else{
      var res = responseText.split(",")
      this.setState({
        usuario: res[1],
        password: this.state.nip,
        password2: this.state.nip,
        nombre: res[2],
        institucion: res[3] + "(" + res[4] +")",
        iAmStudent: false,
        });
    }})
    .catch((error) => {
      console.error(error);
      Alert.alert("Conexion a internet interrumpida")
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
                               onSubmitEditing={() => this.nipInput.focus()}
                               autoCorrect={false}
                               keyboardType='default'
                               returnKeyType="next"
                               onChangeText={(typedText) => {
                                 this.setState({
                                   codigo: typedText,
                                 });
                               }}
                               value={this.state.codigo}
                               placeholder='CODIGO'>
                      </TextInput>
                      <TextInput style = {styles.input}
                              autoCapitalize="none"
                              returnKeyType="go"
                              ref={(input)=> this.nipInput = input}
                              placeholder='NIP'
                              onChangeText={(typedText) =>{
                                this.setState({
                                  nip: typedText,
                                });
                              }}
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
        style={styles.container}
        behavior="padding"
        >
        {this.renderiAmStudent()}
        <TouchableOpacity style={styles.buttonStudent}
          onPress={this.toggleiAmStudent}>
            <Text  style={styles.buttonText}>Soy UDG</Text>
        </TouchableOpacity>
        <TextInput
                  style = { this.state.keyboard ? styles.inputSmall : styles.input}
                   autoCapitalize="words"
                   onSubmitEditing={() => this.nombreInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   value={this.state.usuario}
                   onChangeText={(typedText) =>{
                     this.setState({
                       usuario: typedText,
                     });
                   }}
                   value={this.state.usuario}
                   placeholder='Usuario'>
        </TextInput>

        <TextInput
          style = { this.state.keyboard ? styles.inputSmall : styles.input}
                   autoCapitalize="none"
                   ref={(input)=> this.nombreInput = input}
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   onChangeText={(typedText) =>{
                     this.setState({
                       nombre: typedText,
                     });
                   }}
                   returnKeyType="next"
                   value={this.state.nombre}
                   placeholder='Nombre'>
        </TextInput>

        <TextInput
          style = { this.state.keyboard ? styles.inputSmall : styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput2.focus()}
                ref={(input)=> this.passwordInput = input}
                placeholder='Contraseña'
                onChangeText={(typedText) =>{
                  this.setState({
                    password: typedText,
                  });
                }}
                value={this.state.password}
                secureTextEntry>
        </TextInput>

        <TextInput
          style = { this.state.keyboard ? styles.inputSmall : styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                ref={(input)=> this.passwordInput2 = input}
                placeholder='Repetir Contraseña'
                onChangeText={(typedText) =>{
                  this.setState({
                    password2: typedText,
                  });
                }}
                onSubmitEditing={() => this.institucionInput.focus()}
                value={this.state.password2}
                secureTextEntry>
      </TextInput>

        <TextInput
          style = { this.state.keyboard ? styles.inputSmall : styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => this.correoInput.focus()}
                ref={(input)=> this.institucionInput = input}
                placeholder='Institucion'
                onChangeText={(typedText) =>{
                  this.setState({
                    institucion: typedText,
                  });
                }}
                value={this.state.institucion}
                value={this.state.institucion}>
      </TextInput>

        <TextInput
          style = { this.state.keyboard ? styles.inputSmall : styles.input}
                autoCapitalize="none"
                returnKeyType="go"
                ref={(input)=> this.correoInput = input}
                placeholder='Correo'
                onChangeText={(typedText) =>{
                  this.setState({
                    correo: typedText,
                  });
                }}
                value={this.state.correo}
            >
      </TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress = {this.onPressRegistrar}>
             <Text  style={styles.buttonText}>Registrate</Text>
         </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  onPressRegistrar = () => {
    var sha1 = require('sha1');
    var encryptedPassword = sha1(this.state.password);
    fetch('https://javiermorenot96.000webhostapp.com/aniei/register.php', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      username: this.state.usuario,
      name: this.state.nombre,
      password: encryptedPassword,
      institution: this.state.institucion,
      email: this.state.correo,
    })}
  ).then((response) =>  response.text())
    .then((responseText) => {
    //Alert.alert(responseText)
    if(responseText == "registrado"){
      Alert.alert("Registado correctamente");
    }else if(responseText == "usuario repetido"){
      Alert.alert("Usuario repetido");
    }else{
      Alert.alert(responseText);
    }
      }).catch((error) => {
        console.error(error);
        Alert.alert("Conexion a internet interrumpida")
      });
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
        height: 40,
        marginTop: 25,
        borderRadius: 25,
        width: 200,
      alignContent: 'flex-end',
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
    padding: 5,
    marginTop: 20,
    height: 40,
    width: 300,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth
  },

  inputSmall : {
    textAlign: 'center',
    marginTop: 5,
    height: 10 ,
    width: 300,
    borderColor: 'black',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth
  },
});
