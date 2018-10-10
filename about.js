import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert,
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
  constructor(props){
    super(props);
    this.state={
      lastTextTouched:0,
      combination:[],
      rightCombination:[0,0,0,3,2],
      easters:[new EasterEgg([0,1,2,3],"Creada por Javier Moreno y Josué Ruiz"),
                new EasterEgg([3,2,1,0],"Hay más huevos :D"),
                new EasterEgg([0,0,0,1,3],"Programado en React Native"),
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
/*
  touched = (value) =>{
    var eggsCount = this.state.easters.length;
    var isAnyMatch = false;
    for(var i=0;i<eggsCount;i++){
      var length = this.state.combination.length;
      if(length < this.state.easters[i].getCombination().length){
        if(this.state.easters[i].getCombination()[length] == value){
          this.state.combination[length]=value;
          isAnyMatch = true;
        }
        length = this.state.combination.length;
        if(length == this.state.easters[i].getCombination().length){
          Alert.alert(this.state.easters[i].getMessage());
          isAnyMatch = false;
          break;
        }
      }
    }
    if(isAnyMatch == false){
      this.state.combination = [];
    }
    //Alert.alert(""+eggsCount);

  }
*/
  touched = (value) =>{
    /*
    var eggs = this.state.easters;
    var eggsCount = eggs.length;
    var combinationLenght = this.state.combination.length;
    var isAnyMatch = false;
    var combination = this.state.combination;
    combination[combinationLenght]=value;

    for(var i=0;i<eggsCount;i++){
      if(combination.length <= eggs[i].getCombination().length){
        var rightOne = eggs[i].getCombination().slice(0,combinationLenght-1);
        Alert.alert(rightOne+"/"+combination);
        if(rightOne == combination){
          Alert.alert("Encontrada");
        }
      }
    }
    */
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
