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
  TouchableOpacity,
  AsyncStorage,
  RefreshControl} from 'react-native';
  import { createBottomTabNavigator } from 'react-navigation';
  import { Card, ListItem, Button } from 'react-native-elements';
   import ActionBar from 'react-native-action-bar';
  import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const fileName = "conferencias";

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
        <TouchableOpacity style={styles.buttonSignin}
                    onPress= {_loadDatabases}
                       >
               <Text  style={styles.buttonText}>Cargar todas las bases de datos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSignin}
                    onPress= {_getLocalDatabases}
                       >
               <Text  style={styles.buttonText}>Mostrar datos desde local</Text>
        </TouchableOpacity>

        <FButton navegador={this.props.navigation}/>
        </View>
    );
  }
}

_loadDatabases= function() {
  this.setState({refreshing: true});
  fetch('https://javiermorenot96.000webhostapp.com/aniei/getAllConferences.php', {
  method: 'POST',
  headers: {
      'Accept': 'application/json, text/plain',
      'Content-Type': 'application/json',
      }
    }).then((response) =>  response.json())
      .then((responseJson) => {
          const bases = JSON.stringify(responseJson);
          _saveDatabases(bases);
          //Alert.alert(responseJson[0].title);
          this.setState({refreshing: false});
          this.setState({data:responseJson});
        Alert.alert(responseJson[0].title)
        })
        .catch((error) => {
          console.error(error);
        });
}
_saveDatabases = async(basesString) => {
  try {
    await AsyncStorage.setItem(fileName, basesString);
  } catch (error) {
      console.console.error();
  }
}
_getLocalDatabases = async() =>{
  try {
    const value = await AsyncStorage.getItem(fileName);
    if (value !== null) {
      // We have data!!
      const valueJson = JSON.parse(value);
      Alert.alert(valueJson[0].title);
      //console.log(value);
    }
   } catch (error) {
     // Error retrieving data
     console.error(error);
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
  constructor(props) {
  super(props);
  this.state = {
    refreshing: false,
    data: null,
  };
  this._loadDatabases = _loadDatabases.bind(this);
  this._loadDatabases();
}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._loadDatabases}
            />
          }
          data={this.state.data}
          renderItem={({item}) =>
          	<View style={{width: Dimensions.get('window').width}}>
          		<Card
				  title={item.title}
				  image={require('./Conferencia.jpg')}>
				  <Text style={{fontWeight: 'bold'}}>
				  	Descripción:
				  </Text>
				  <Text style={{marginBottom: 10}}>
				   	{item.description}
				  </Text>
				  <Button
				    backgroundColor='#03A9F4'
				    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
				    title='Más información'
				    onPress={()=>{this.props.navigation.navigate('Conference', {nombre:item.key})}}
				    />
				</Card>
          	</View>}
        />
        <FButton navegador={this.props.navigation}/>
      </View>
    );
  }

  _onRefresh = () => {
      this.setState({refreshing: true});
      fetch('https://javiermorenot96.000webhostapp.com/aniei/getAllConferences.php').then(() => {
        this.setState({refreshing: false});
      });
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
