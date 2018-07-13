import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';  

import {
  Alert,
  FlatList,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
TouchableOpacity, } from 'react-native';
  import { createBottomTabNavigator } from 'react-navigation';
  import { Card, ListItem, Button } from 'react-native-elements';
   import ActionBar from 'react-native-action-bar';
  import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


  
  class FButton extends React.Component {
    render(){
      return(
        <ActionButton buttonColor="#009999" onPress={() => this.props.navegador.navigate('Login')} 
        renderIcon = {()=>(<Icon name="md-person" style={styles.actionButtonIcon} />)} 
        />
      
        );
    }
  }


  class OracleScreen extends React.Component {
  render() {
    return (
      <View
        style={styles.container}>
        
        <Text>¡Bienvenido!</Text>
        <TouchableOpacity style={styles.buttonSignin}
                    onPress={() =>this.props.navigation.navigate('Login')}
                       >
               <Text  style={styles.buttonText}>Inicia Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignin}
                    onPress={() =>this.props.navigation.navigate('QrScreen')}
                       >
               <Text  style={styles.buttonText}>Asistencia</Text>
        </TouchableOpacity>
        <FButton navegador={this.props.navigation}/>
        </View>
    );
  }
}

class IbmScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Esto es de Intel</Text>
        <FButton navegador={this.props.navigation}/>
      </View>
    );
  }
}
class HpScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Esto es de HP</Text>
        <FButton navegador={this.props.navigation}/>
      </View>
    );
  }
}

class IntelScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={[
            {
              key: 'El internet de las cosas', 
              descripcion: 'Que equivocados estabamos Al pensar que la eternidad iba a ser Para siempre estare'
            },
            {
              key: 'How to be happy in a depressing world',
              descripcion: 'me prometiste why me mentiste Te prometi nunca mentir fijate Un castigo haz de merecer'
            },
            {
              key: '5 pasos para no ser un ingeniero',
              descripcion: 'decepcion es algo que no hubo entre los dos Why al final tu lo hiciste algo real Tacha todas las veces que te dije algo de este corazon Retiro lo dicho'
            },
            {
              key: 'Medicina alternativa y remedios caseros', 
              descripcion: 'recuerda que siempre tu fuiste Quien me daba ganas de ser un hombre de bien No tienes mas corazon lo diste a beneficencia de el Pobre de el'
            },
            {
              key: 'Cómo generar dinero con dos sencillas aplicaciones desde casa', 
              descripcion: 'Pinche chango'
            },
            {
              key: 'INSERTE TEXTO AQUI', 
              descripcion: 'Quiero comer comida comestible'
            },
            {
              key: 'No puedo creer que leiste todo', 
              descripcion: 'Otro item generico con la misma imagen'
            },
            {
              key: 'Tardé mucho en escribirlo, gracias :D', 
              descripcion: 'Puto :)'
            },
          ]}
          renderItem={({item}) => 
          	<View style={{width: Dimensions.get('window').width}}>
          		<Card
				  title={item.key}
				  image={require('./Conferencia.jpg')}>
				  <Text style={{fontWeight: 'bold'}}>
				  	Descripción:
				  </Text>
				  <Text style={{marginBottom: 10}}>
				   	{item.descripcion}
				  </Text>
				  <Button
				    backgroundColor='#03A9F4'
				    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
				    title='Más información'
				    onPress={()=>{Alert.alert("Aqui debe enviarte a la conferencia "+item.key)}} 
				    />
				</Card>
          	</View>}
        />
        <FButton navegador={this.props.navigation}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});

export default createBottomTabNavigator({
  Oracle: OracleScreen,
  IBM: IbmScreen,
  Intel: IntelScreen,
  HP: HpScreen,
},
);


