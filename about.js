import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import {
  Button,
  Tile,
} from 'react-native-elements';

class EasterEgg {
  constructor(rightCombination,message){
    this.rightCombination = rightCombination;
    this.message = message;
  }
  getCombination(){
    return this.rightCombination;
  }
  getMessage(){
    return this.message;
  }
}

export default class About extends React.Component{
  static navigationOptions = {
  title: 'Acerca de',
  };
  //Reglas para los EasterEgg, ninguna empieza con 1, ninguno empieza con uno ya existente completo (nunca se podría acceder a él)
  constructor(props){
    super(props);
    this.state={
      lastTextTouched:0,
      combination:[],
      easters:[new EasterEgg([0,1,2,3],"Creada por Javier Moreno, Josué Ruiz y David"),
                new EasterEgg([3,3,3,3,3,3],"Hay más huevos :D"),
                new EasterEgg([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"Eres muy persistente, sigue así"),
                new EasterEgg([3,2,1,0],"Desarrollada en CuceiMobile"),
                new EasterEgg([0,0,1,1,1,2,2,2,2,3,3,3,3,3],"Busca bien"),
                new EasterEgg([3,3,3,0,0,0],"No te ama"),
                new EasterEgg([2,3,1,1,2,0,2],"Deja de picarle al azar"),
                new EasterEgg([0,3,1,2],"Este estuvo fácil"),
                new EasterEgg([3,0,2,1],"Sencillo pero efectivo"),
                new EasterEgg([2,1,0,3],"Combinación correcta, ve a tu perfil"),
                new EasterEgg([2,3,0,1],"Todos los mensajes mentimos"),
                new EasterEgg([3,3,3,3,3,2,2,2,2,1,1,1,0,0],"Un mamut chiquitito quería volar"),
                new EasterEgg([2,2,2,2,2],"El número que usted marcó, no existe"),
                new EasterEgg([3,2,3,1,3,0,3],"Eres un genio de los patrones"),
                new EasterEgg([3,0,3,1,3,2,3],"Por tí tiendo a infinito, bb"),
                new EasterEgg([0,1,0,2,0,3,0],"Te debería dar un premio, pero no"),
                new EasterEgg([0,3,0,2,0,1,0],"Eres la base de mis datos"),
                new EasterEgg([0,0,3,3,1,1,2,2],"Hoy tu día será hermoso, bb <3"),
                new EasterEgg([0,0,3,3,0,0,2,2,0,0,1,1,0,0],"Tú eres importante, recuérdalo"),
                new EasterEgg([3,2,1,2,1,0],"Antes de criticarme intenta superarme"),
                new EasterEgg([0,1,2,1,2,3],"Black Mirror es real"),
                new EasterEgg([0,0,1,1,2,2,3,3],"Confía en el corazón de las cartas"),
                new EasterEgg([3,3,2,2,1,1,0,0],"Tú programas mi felicidad"),
                new EasterEgg([2,1,3,0],"Feliz día del taco"),
                new EasterEgg([2,2,3,3],"Pícale mucho al primero"),
                new EasterEgg([2,3,2,3],"Patrón = 1-2-4-3"),
                new EasterEgg([0,1,3,2],"Ahora = 1-1-4-2"),
                new EasterEgg([0,0,3,1],"Sigue = 4-2-3-2"),
                new EasterEgg([3,1,2,1],"Patrón = 3-3-4-4"),
              ],
    }
  }
  render(){
      return(
            <ImageBackground source={require('./technology.jpg')}
              style={{width: '100%', height: '100%', justifyContent: 'center',alignItems: 'center'}}
            >
              <View style={{padding:10, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <TouchableOpacity onPress={() => {this.touched(0)}}>
                  <Text style={styles.text}>XXXI Congreso Nacional y XVII Congreso Internacional de Informática y Computación de la ANIEI.</Text>
                </TouchableOpacity>
                <Text style={styles.text}>(CNCIIC-ANIEI 2018)</Text>
                <TouchableOpacity onPress={() => {this.touched(1)}}>
                  <Text style={styles.textMedium}>Emprendiendo innovaciones con tecnologías exponenciales</Text>
                </TouchableOpacity>
                <Text style={styles.textSmallBold}>Fecha del Congreso:</Text>
                <TouchableOpacity onPress={() => {this.touched(2)}}>
                  <Text style={styles.textSmall}>24 al 26 octubre de 2018, en Guadalajara, Jalisco.</Text>
                </TouchableOpacity>
                <Text style={styles.textSmallBold}>Sede del Congreso:</Text>
                <TouchableOpacity onPress={() => {this.touched(3)}}>
                  <Text style={styles.textSmall}>Universidad de Guadalajara</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
      );
  }
  touched = (value) =>{
    this.state.combination[this.state.combination.length] = value;
    var eggs = this.state.easters;
    var isAnyMatch = false;
    for(var i=0;i<eggs.length;i++){
      if(eggs[i].getCombination().length >= this.state.combination.length){
        var correctPart = eggs[i].getCombination().slice(0,this.state.combination.length);
        if(eggs[i].getCombination().toString() === this.state.combination.toString()){
          if(Platform.OS === 'android')
          {
            ToastAndroid.show(eggs[i].getMessage(), ToastAndroid.SHORT);
          }else{
            Alert.alert(eggs[i].getMessage());
          }
          isAnyMatch = false;
          break;
        }else if(correctPart.toString() === this.state.combination.toString()){
          isAnyMatch = true;
          break;
        }
      }
    }
    if(isAnyMatch == false){
      this.state.combination = [];
    }
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
