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
  class MyCard extends React.Component{
    render(){
      return(
        <View style={{width: Dimensions.get('window').width}}>
          <Card
            title={this.props.item.title}
            image={require('./Conferencia.jpg')}>
            <Text style={{fontWeight: 'bold'}}>
              Descripción:
            </Text>
            <Text numberOfLines={3} style={{marginBottom: 10}}>
              {this.props.item.description}
            </Text>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              title='Más información'
              onPress={()=>{this.props.navegador.navigate('Conference', this.props.item)}}
              />
         </Card>
        </View>

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

_downloadConferencesData= function(companyName) {
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
          const filteredConferences = _filterConferences(companyName,responseJson);
          _saveDatabases(bases);
          this.setState({refreshing: false});
          this.setState({data:filteredConferences});
          //Alert.alert("Desde api")
        })
        .catch((error) => {
          console.error(error);
        });
}
_loadConferencesData = async function(companyName){
  try {
    const value = await AsyncStorage.getItem(fileName);
    if (value !== null) {
      const valueJson = JSON.parse(value);
      const filteredConferences = _filterConferences(companyName,valueJson);
      this.setState({data:filteredConferences});
      //Alert.alert("Desde local")
    }else{
      this._downloadConferencesData();
    }
   } catch (error) {
     console.error(error);
   }
}
_filterConferences = function(companyName,conferences){
  var filtered = [];
  var i, filteredCount=0;
  const size = conferences.length;
  for(i=0;i<size;i++){
    if(conferences[i]['companyName']==companyName){
      filtered[filteredCount]=conferences[i];
      filteredCount++;
    }
  }
  return filtered;
}
_saveDatabases = async(basesString) => {
  try {
    await AsyncStorage.setItem(fileName, basesString);
  } catch (error) {
      console.console.error();
  }
}
_getLocalDatabases = async() =>{ //Esta funcion es de prueba
  try {
    const value = await AsyncStorage.getItem(fileName);
    if (value !== null) {
      const valueJson = JSON.parse(value);
      Alert.alert(valueJson[0].title);
    }
   } catch (error) {
     console.error(error);
   }
}
ListEmptyView = () => {
 return (
   <View style={{margin: 20, backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
     <Text style={{textAlign: 'center', margin:20}}>Parece que no hay conferencias, desliza hacia abajo para actualizar</Text>
   </View>
 );
}
class IbmScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      data: null,
    };
    this.companyName = "IBM";
    this._downloadConferencesData = _downloadConferencesData.bind(this);
    this._loadConferencesData = _loadConferencesData.bind(this);
    this._loadConferencesData(this.companyName);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {this._downloadConferencesData(this.companyName)}}
            />
          }
          data={this.state.data}
          renderItem={({item}) =>
          	 <MyCard item={item} navegador={this.props.navigation}/>
          }
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyView}
        />
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
  this.companyName = "Intel";//Cambiar por Intel o como esté en la base
  this._downloadConferencesData = _downloadConferencesData.bind(this);
  this._loadConferencesData = _loadConferencesData.bind(this);
  this._loadConferencesData(this.companyName);

  //this._downloadConferencesData();
}
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {this._downloadConferencesData(this.companyName)}}
            />
          }
          data={this.state.data}
          renderItem={({item}) =>
          	 <MyCard item={item} navegador={this.props.navigation}/>
          }
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyView}

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
