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

export default class Student extends Component{

  constructor(props){
    super(props)
    this.state = {
      iAmStudent: false
    }
  }

    toggleiAmStudent = () => {
        this.setState({
            iAmStudent: !this.state.iAmStudent
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
                                   placeholder='CODIGO'>
                          </TextInput>
            </View>

            );
        } else {
            return (
              null
            );

        }
    }

    render() {
        return (
          <View>
            <TouchableOpacity style={styles.buttonSignin}
              onPress={this.toggleiAmStudent}
            >
                <Text  style={styles.buttonText}>REGISTRAR</Text>
            </TouchableOpacity>
            {this.renderiAmStudent()}
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
