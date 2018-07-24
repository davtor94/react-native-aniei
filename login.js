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
  AsyncStorage } from 'react-native';
  import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export default class Login extends React.Component {
  static navigationOptions = {
  title: 'Inicia Sesion',
  headerRight: '',
  };

  constructor(props){
    super(props)
    this.state = {
      nip: "",
      codigo : ""
    }
  }
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  handleChangeCodigo = (typedText) =>{
    this.setState({codigo: typedText});
  }

  handleChangeNip = (typedText) =>{
    this.setState({nip: typedText});
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
                       onChangeText={this.handleChangeCodigo}
                       value={this.state.codigo}
                       placeholder='USUARIO'/>

              <TextInput style = {styles.input}
                      autoCapitalize="none"
                      returnKeyType="go"
                      ref={(input)=> this.passwordInput = input}
                      placeholder='CONTRASEÑA'
                      onChangeText={this.handleChangeNip}
                      value={this.state.nip}
                      secureTextEntry/>
              <TouchableOpacity style={styles.buttonContainer}
                             onPress={this.onPressIngresar}
                             >
                     <Text  style={styles.buttonText}>INGRESAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSignin}
                          onPress={() =>this.props.navigation.navigate('Register')}
                             >
                     <Text  style={styles.buttonText}>REGISTRAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSignin}
                          onPress={() =>this.props.navigation.navigate('Profile')}
                             >
                     <Text  style={styles.buttonText}>Perfil</Text>
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
      height: 200,
      opacity: .5,
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
