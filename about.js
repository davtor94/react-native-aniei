import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View
} from 'react-native';
import {
  Button,
  Tile,
} from 'react-native-elements';

export default class About extends React.Component{
  static navigationOptions = {
  title: 'Acerca de',
  };
  constructor(props){
    super(props);
  }
  render(){
      return(
            <ImageBackground source={require('./technology.jpg')} style={{width: '100%', height: '100%', justifyContent: 'center',alignItems: 'center'}}>
              <View style={{padding:10, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <Text style={styles.text}>XXXI Congreso Nacional y XVII Congreso Internacional de Informática y Computación de la ANIEI.</Text>
                <Text style={styles.text}>(CNCIIC-ANIEI 2018)</Text>
                <Text style={styles.textMedium}>Emprendiendo innovaciones con tecnologías exponenciales</Text>
                <Text style={styles.textSmallBold}>Fecha del Congreso:</Text>
                <Text style={styles.textSmall}>24 al 26 octubre de 2018, en Guadalajara, Jalisco.</Text>
                <Text style={styles.textSmallBold}>Sede del Congreso:</Text>
                <Text style={styles.textSmall}>Universidad de Guadalajara</Text>
              </View>
            </ImageBackground>
      );
  }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 25,
        fontWeight:'bold',
    },
    textMedium: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 20
    },
    textSmall: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 15
    },
    textSmallBold: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 15,
        fontWeight:'bold',
    }
});
