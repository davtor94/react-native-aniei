import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  NetInfo} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

const SIGN_IN_LINK = 'https://javiermorenot96.000webhostapp.com/aniei/signIn.php';
const userKey = "usuario";

export default class Login extends React.Component {
  static navigationOptions = {
  title: 'Inicia Sesion',
  headerRight: '',
  };

  constructor(props){
    super(props)
    this.state = {
      user: "",
      password : ""
    }
  }

  handleChangeUser = (typedText) =>{
    this.setState({user: typedText});
  }

  handleChangePassword = (typedText) =>{
    this.setState({password: typedText});
  }
  onPressIngresar = () => {
        var sha1 = require('sha1');
        var encryptedPassword = sha1(this.state.password);
        fetch(SIGN_IN_LINK, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          username: this.state.user,
          password: encryptedPassword,
        })}
        ).then((response) =>  response.text())
        .then((responseText) => {
        if(responseText == "correcto"){
          this._saveData(this.state.user);
          Alert.alert("Ya has ingresado");
          this.props.navigation.goBack();
          //Guardado con exito
        }else if(responseText == "error en datos"){
          Alert.alert("Combinación de usuario/contraseña incorrecta");
        }else{
          Alert.alert("Error al intentar ingresar")
        }
        }).catch((error) => {
          console.error(error);
        });
  }

  _saveData = async(username) => {
    try {
      await AsyncStorage.setItem(userKey,username);
    } catch (error) {
        console.console.error();
    }
  }
onPressRegistrar(routeName){
  this.props.navigator.push({
    name: routeName
  })
}
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: 15}}>
          <KeyboardAvoidingView
            behavior="position"
          >
            <Image
              style={styles.logo}
              source={require('./src/components/images/logo-udg.png')}
              resizeMode="contain"
            />
            <View style={{flex: 1, alignItems: 'center',}}>
            <TextInput style = {styles.input}
                       underlineColorAndroid = "transparent"
                       autoCapitalize="none"
                       onSubmitEditing={() => this.passwordInput.focus()}
                       autoCorrect={false}
                       keyboardType='default'
                       returnKeyType="next"
                       onChangeText={this.handleChangeUser}
                       value={this.state.codigo}
                       placeholder='USUARIO'/>

              <TextInput style = {styles.input}
                      autoCapitalize="none"
                      returnKeyType="go"
                      ref={(input)=> this.passwordInput = input}
                      placeholder='CONTRASEÑA'
                      onChangeText={this.handleChangePassword}
                      value={this.state.nip}
                      secureTextEntry/>
              <TouchableOpacity style={styles.buttonContainer}
                             onPress={this.onPressIngresar}
                             >
                     <Text  style={styles.buttonText}>Ingresar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSignin}
                          onPress={() =>this.props.navigation.navigate('Register')}
                             >
                     <Text  style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
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
    margin: 15,
  },
  logo: {
      height: 150,
      opacity: .5,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 15,
      marginRight: 15,

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
