'use strict';
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import { AsyncStorage } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import * as links from './links.js';

const userKey = "usuario";

export default class QrScanner extends Component {
  static navigationOptions = {
  title: 'Tomar asistencia',
  headerRight: '',
  };

  constructor(props){
    super(props);
    this.state = {
      lastScannedUrl: null,
      username:null,
      conferenceId:this.props.navigation.getParam('conferenceId', ''),
    }
    this._getUserName()
    .then((user)=> {
      this.setState({
        username:user,
      });
      console.log(this.state.username);
      console.log(this.state.conferenceId);
    })
    .catch((error) => {
    });
  };

  _getUserName = async() =>{
    try {
      const value = await AsyncStorage.getItem(userKey);
      if (value !== null) {
        return value;
      }else{
        return false;
      }
     } catch (error) {
       return false;
     }
  };

  onSuccess(e) {
      if (e.data != this.state.lastScannedUrl) {
        this.state.lastScannedUrl = e.data;
        this._onQRDetected();
      }

  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        showMarker={true}
        checkAndroid6Permissions={true}
        permissionDialogTitle="Uso de cámara"
        permissionDialogMessage="Necesitas dar permisos de cámara"
        topViewStyle={{backgroundColor:"#000"}}
        bottomViewStyle={{backgroundColor:"#000"}}
        notAuthorizedView={
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 16,
            }}>
              Parece que no tenemos permisos de cámara
            </Text>
          </View>
        }
        topContent={
          <Text style={styles.centerText}>
            Escanea el código que se encuentra en el auditorio
          </Text>
        }
      />
    );
  }
  _onQRDetected = () => {
    if (this.state.lastScannedUrl) {
      AsyncStorage.setItem("UnValor",this.state.lastScannedUrl);
      console.log('QR detectado');
      fetch(links.ASSISTANCE_LINK, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        username: this.state.username,
        idConference: this.state.conferenceId,
        qr: this.state.lastScannedUrl,
      })}
      ).then((response) =>  response.text())
      .then((responseText) => {
        Alert.alert(responseText);
        console.log(responseText);
        this.props.navigation.goBack();
      }).catch((error) => {
        Alert.alert("Ocurrió un error");
        this.props.navigation.goBack();
      });
    }
  };
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#fff',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
