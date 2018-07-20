import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Button,
  ScrollView } from 'react-native';


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
    <View style={{flex: 1}}>
      <ScrollView style={{margin: 10}}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./src/components/images/logo-udg.png')}
            resizeMode="cover"
          />

        <TextInput
                  style = {styles.input}
                  underlineColorAndroid = "transparent"
                   autoCapitalize="none"
                   onSubmitEditing={() => this.passwordInput.focus()}
                   autoCorrect={false}
                   keyboardType='default'
                   returnKeyType="next"
                   onChangeText={this.handleChangeCodigo}
                   value={this.state.codigo}
                   placeholder='USUARIO'>
                  </TextInput>

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
    justifyContent: 'center',
  },

  logo: {
      width: 150,
      height: 500,
      opacity: .5,
      padding: 10,
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
