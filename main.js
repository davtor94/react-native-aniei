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
  RefreshControl,
  NetInfo,
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Card, ListItem, Button,} from 'react-native-elements';
import ActionBar from 'react-native-action-bar';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as links from './links.js';


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
        offsetY={15} offsetX={15}
        />
        );
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
         //console.error(error);
         return false;
       }
    }

  }
class MyCard extends React.Component{
    constructor(props){
      super(props);
      dateValues = String(this.props.item.date).split('-');
      startTimeValues = String(this.props.item.startTime).split(':');
      var conferenceYear = dateValues[0];
      var conferenceMonth = dateValues[1];
      var conferenceDay = dateValues[2];
      this.state = {
        year: conferenceYear,
        month: conferenceMonth,
        day: conferenceDay,
        hour: startTimeValues[0],
        minute: startTimeValues[1],
      }
    }

    render(){
      return(
        <View style={{width: Dimensions.get('window').width}}>
          <Card
            title={this.props.item.title}
            image={null}
          >
            {this.props.companyName == noCompany ?
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.item.companyName}</Text>
            </View>
            : <View/>}
            <Text style={{fontWeight: 'bold'}}>
              Dia: {this.state.day}/{this.state.month}/{this.state.year}
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              Hora: {this.state.hour}:{this.state.minute}
            </Text>
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
              })}
              />
         </Card>
        </View>

      );
    }
  }
class BaseScreen extends React.Component {
  constructor(props,company,imagePath){
    super(props);
    this.state = {
      refreshing: false,
      data: null,
      isVisible: true,
    };
    this.companyName=company;
    this._downloadConferencesData = _downloadConferencesData.bind(this);
    this._loadConferencesData = _loadConferencesData.bind(this);
    this._loadConferencesData(this.companyName);
    this.imagePath = imagePath;

    willFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
          this.forceUpdate();
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
          	 <MyCard
               item={item} navegador={this.props.navigation}
               imagePath={this.imagePath}
               companyName={this.companyName}
             />
          }
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyView}
          ListHeaderComponent={this.renderHeader}
        />
        <FButton navegador={this.props.navigation}/>
        <ActionButton buttonColor="#00a35b" onPress={() => this.props.navigation.navigate('About')}
          renderIcon = {()=>(<Icon name="md-information" style={styles.actionButtonIcon} />)}
          offsetY={85}
          offsetX={24}
          size={35}
        />
      </View>
    );
  }
  renderHeader = () =>{
    return(
      <View style={{width: Dimensions.get('window').width}}>
        <Card
          title={null}
          image={this.imagePath}>
       </Card>
      </View>
    );
  }
}

_downloadConferencesData= function(companyName) {
    this.setState({refreshing: true});
    fetch(links.GET_ALL_CONFERENCES_LINK, {
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
      })
      .catch((error) => {
        this.setState({refreshing: false});
      });
}
_loadConferencesData = async function(companyName){
  try {
    const value = await AsyncStorage.getItem(fileName);
    if (value !== null) {
      const valueJson = JSON.parse(value);
      const filteredConferences = _filterConferences(companyName,valueJson);
      this.setState({data:filteredConferences});
    }else{
      this._downloadConferencesData();
    }
   } catch (error) {
   }
}
_filterConferences = function(companyName,conferences){
  var filtered = [];
  var i, filteredCount=0;
  const size = conferences.length;
  var currentDate = new Date();
  if(companyName!=noCompany)
  {
    for(i=0;i<size;i++){
      if(conferences[i]['companyName']==companyName){
        dateValues = String(conferences[i]['date']).split('-');
        var conferenceYear = dateValues[0];
        var conferenceMonth = dateValues[1];
        var conferenceDay = dateValues[2];
        if(Number(currentDate.getFullYear()<=Number(conferenceYear))
            && ((Number(currentDate.getMonth()+1)<Number(conferenceMonth))
              || ((Number(currentDate.getMonth()+1)==Number(conferenceMonth)) &&
                  (Number(currentDate.getDate())<=Number(conferenceDay)))) ){
              filtered[filteredCount]=conferences[i];
              filteredCount++;
            }
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
        dateValues = String(conferences[i]['date']).split('-');
        var conferenceYear = dateValues[0];
        var conferenceMonth = dateValues[1];
        var conferenceDay = dateValues[2];
        if(Number(currentDate.getFullYear()<=Number(conferenceYear))
            && ((Number(currentDate.getMonth()+1)<Number(conferenceMonth))
              || ((Number(currentDate.getMonth()+1)==Number(conferenceMonth)) &&
                  (Number(currentDate.getDate())<=Number(conferenceDay)))) ){
              filtered[filteredCount]=conferences[i];
              filteredCount++;
            }
      }
    }
  }

  return filtered;
}
_saveDatabases = async(basesString) => {
  try {
    await AsyncStorage.setItem(fileName, basesString);
  } catch (error) {
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
export default createBottomTabNavigator(
  {
    Oracle: OracleScreen,
    IBM: IbmScreen,
    Intel: IntelScreen,
    HP: HpScreen,
    Continental: ContinentalScreen,
    Más: OthersScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconPath;
        let size;
        let selected = 40;
        let unselected = 30;
        if (routeName === 'Oracle') {
          iconPath = require('./iconos-empresas/oracle.png');
          focused ? size = selected : size = unselected;
        } else if (routeName === 'IBM') {
          iconPath = require('./iconos-empresas/ibm.png');
          focused ? size = selected : size = unselected;
        } else if (routeName === 'Intel') {
          iconPath = require('./iconos-empresas/intel.png');
          focused ? size = selected : size = unselected;
        } else if (routeName === 'HP') {
          iconPath = require('./iconos-empresas/hp.png');
          focused ? size = selected : size = unselected;
        } else if (routeName === 'Continental') {
          iconPath = require('./iconos-empresas/continental.png');
          focused ? size = selected : size = unselected;
        } else if (routeName === 'Más') {
          iconPath = require('./iconos-empresas/mas.png');
          focused ? size = selected : size = unselected;
        }
        return (
          <Image
            style={{width: size, height: size}}
            source={iconPath}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);
