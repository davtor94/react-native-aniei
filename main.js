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
const companyNames = ["Oracle","IBM","Intel","HP","Continental"];
const noCompany = "Others";
const userKey = "usuario";


class FButton extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        navigateTo: 'Login',
        renderAgain: false,
      };
    }

    render(){
      this._loadData().then((res) => (res===true)? this.state.navigateTo="Profile" : this.state.navigateTo="Login");
      
      return(
        <ActionButton buttonColor="#009999" onPress={() => this.props.navegador.navigate(this.state.navigateTo)}
        renderIcon = {()=>(<Icon name="md-person" style={styles.actionButtonIcon} />)}
        />
        );
    }
    componentDidMount(){
      Alert.alert("Montado");
    }

    _loadData = async() =>{
      try {
        const value = await AsyncStorage.getItem(userKey);
        if (value !== null) {
          //Alert.alert("Logueado Value "+value)
          return true;
        }else{
          return false;
        }
       } catch (error) {
         console.error(error);
         return false;
       }
    }

  }

class MyCard extends React.Component{
    render(){
      const user = this._getUserName();
      return(
        <View style={{width: Dimensions.get('window').width}}>
          <Card
            title={this.props.item.title}
            image={this.props.imagePath}>
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
              onPress={() => this.props.navegador.navigate('Conference', {
                conferenceData: this.props.item,
                username: user,
              })}
              />
         </Card>
        </View>

      );
    }
    _getUserName = async() =>{
      try {
        const value = await AsyncStorage.getItem(userKey);
        if (value !== null) {
          return value;
        }else{
          return false;
        }
       } catch (error) {
         console.error(error);
         return false;
       }
    }
  }
class BaseScreen extends React.Component {

  constructor(props,companyName,imagePath){
    super(props);
    this.state = {
      refreshing: false,
      data: null,
    };
    this.companyName = companyName;
    this._downloadConferencesData = _downloadConferencesData.bind(this);
    this._loadConferencesData = _loadConferencesData.bind(this);
    this._loadConferencesData(this.companyName);
    this.imagePath = imagePath;

    willFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
          this.forceUpdate();
          //this._loadData().then((res) => (res===true)? this.setState({navigateTo:"Profile"}) : this.setState({navigateTo:"Login"}) );
          //Alert.alert("Aquí se debe de actualizar");
        }
      );

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
          	 <MyCard item={item} navegador={this.props.navigation} imagePath={this.imagePath}/>
          }
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyView}
        />
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
  if(companyName!=noCompany)
  {
    for(i=0;i<size;i++){
      if(conferences[i]['companyName']==companyName){
        filtered[filteredCount]=conferences[i];
        filteredCount++;
      }
    }
  }else{
    var j, existent;
    const companiesCount = companyNames.length;
    for(i=0;i<size;i++){
      existent=false;
      for(j=0;j<companiesCount;j++){
        if(conferences[i]['companyName']==companyNames[j]){
          existent=true;
          break;
        }
      }
      if(!existent){
        filtered[filteredCount]=conferences[i];
        filteredCount++;
      }
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
}//Esta funcion no es usada, pero sirve de ejemplo
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

class OracleScreen extends BaseScreen {
  constructor(props){
    super(props,companyNames[0],require('./oracle_logo.jpg'));
  }
}
class IbmScreen extends BaseScreen {
  constructor(props){
    super(props,companyNames[1],require('./ibm_logo.png'));
  }
}
class IntelScreen extends BaseScreen {
  constructor(props){
    super(props,companyNames[2],require('./intel_logo.png'));
  }
}
class HpScreen extends BaseScreen {
  constructor(props){
    super(props,companyNames[3],require('./hp_logo.jpg'));
  }
}
class ContinentalScreen extends BaseScreen {
  constructor(props){
    super(props,companyNames[4],require('./continental_logo.png'));
  }
}
class OthersScreen extends BaseScreen {
  constructor(props){
    super(props,noCompany,require('./Conferencia.jpg'));
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
  Continental: ContinentalScreen,
  Más: OthersScreen,
},
);
