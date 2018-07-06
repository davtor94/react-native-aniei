import React, { Component } from 'react';
import {
  Alert,
  Button,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { AsyncStorage } from "react-native"


export default class QrScanner extends Component {
  static navigationOptions = {
  title: 'Tomar asistencia',
  };

  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
    valorLeido: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      this.setState({ lastScannedUrl: result.data });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Pidiendo permisos de camara</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Se requieren permisos de cámara para tomar asistencia
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />
                }
        {this._onQRDetected()}
        {this._showInstructions()}
        {this._showTopBar()}

        <StatusBar hidden />
      </View>
     

    );
  }

  _showInstructions =() =>{
    return(
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url}>
          <Text style={styles.urlText}>
            Escanea el código que se encuentra en el auditorio
           
          </Text>
        </TouchableOpacity>
      
      </View>
      );
  }

  _showTopBar =() =>{
    return(
      <View style={styles.topBar}>
      </View>
      );
  }

  _showLeftBar =() =>{
    return(
      <View style={styles.leftBar}>
      </View>
      );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'En este lugar se debe guardar la hora y enviar al servidor',
      this.state.lastScannedUrl,
      [
        {
          text: 'Sí',
          onPress: this._handlePressCancel//() => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No', onPress: this._handlePressCancel },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _onQRDetected = () => {
    if (this.state.lastScannedUrl) {
      AsyncStorage.setItem("UnValor",this.state.lastScannedUrl);
      console.log('QR detectado');
      Alert.alert(
      '¿Abrir URL?',
      this.state.lastScannedUrl,
      [
        {
          text: 'Sí',
          onPress: () => Linking.openURL(this.state.lastScannedUrl),
        },
        { text: 'No',
         onPress: this._handlePressCancel 
        },
      ],
      { cancellable: false }
    );    
    }
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }
    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScannedUrl}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    flexDirection: 'row',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 50,
    flexDirection: 'row',
  },
  leftBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 50,
    flexDirection: 'column',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },

});