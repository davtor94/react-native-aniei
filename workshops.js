import React from 'react';
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
  RefreshControl, } from 'react-native';
  import { createBottomTabNavigator } from 'react-navigation';
  import { Card, ListItem, Button,} from 'react-native-elements';
  import ActionButton from 'react-native-action-button';
  import Icon from 'react-native-vector-icons/Ionicons';
  import * as links from './links.js';


  const fileName = "talleres";
  const locationNames = ["Alfa","Beta","T24"];
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

  class MyWorkshopCard extends React.Component{
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
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.item.companyName}</Text>
              </View>
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

  class BaseScreenWorkshop extends React.Component {
    constructor(props,locationName,imagePath){
      super(props);
      this.state = {
        refreshing: false,
        data: null,
        isVisible: true,
      };
      this.locationName=locationName;
      this._downloadWorkshopsData = _downloadWorkshopsData.bind(this);
      this._loadWorkshopsData = _loadWorkshopsData.bind(this);
      this._loadWorkshopsData(this.locationName);
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
                onRefresh={() => {this._downloadWorkshopsData(this.locationName)}}
              />
            }
            data={this.state.data}
            renderItem={({item}) =>
            	 <MyWorkshopCard
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

  _downloadWorkshopsData= function(locationName) {
      this.setState({refreshing: true});
      fetch(links.GET_ALL_WORKSHOPS_LINK, {
      method: 'POST',
      headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json',
          }
        }).then((response) =>  response.json())
        .then((responseJson) => {
          const bases = JSON.stringify(responseJson);
          const filteredWorkshops = _filterWorkshops(locationName,responseJson);
          _saveDatabases(bases);
          this.setState({refreshing: false});
          this.setState({data:filteredWorkshops});
        })
        .catch((error) => {
          this.setState({refreshing: false});
        });
  }
  _loadWorkshopsData = async function(locationName){
    try {
      const value = await AsyncStorage.getItem(fileName);
      if (value !== null) {
        const valueJson = JSON.parse(value);
        const filteredWorkshops = _filterWorkshops(locationName,valueJson);
        this.setState({data:filteredWorkshops});
      }else{
        this._downloadWorkshopsData();
      }
     } catch (error) {
     }
  }
  _filterWorkshops = function(locationName,conferences){
    var filtered = [];
    var i, filteredCount=0;
    const size = conferences.length;
    var currentDate = new Date();
      for(i=0;i<size;i++){
        if(conferences[i]['locationName']==locationName){
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
       <Text style={{textAlign: 'center', margin:20}}>Parece que no hay talleres, desliza hacia abajo para actualizar</Text>
     </View>
   );
  }


  class AlfaScreen extends BaseScreenWorkshop {
    constructor(props){
      super(props,locationNames[0],require('./alfa_logo.jpg'));
    }
  }
  class BetaScreen extends BaseScreenWorkshop {
    constructor(props){
      super(props,locationNames[1],require('./beta_logo.jpg'));
    }
  }
  class T24Screen extends BaseScreenWorkshop {
    constructor(props){
      super(props,locationNames[2],require('./t_logo.jpg'));
    }
  }

  export default createBottomTabNavigator(
    {
      Alfa: AlfaScreen,
      Beta: BetaScreen,
      T24: T24Screen,
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconPath;
          let size;
          let selected = 40;
          let unselected = 30;
          if (routeName === 'Alfa') {
            iconPath = require('./iconos-lugares/alfa.png');
            focused ? size = selected : size = unselected;
          } else if (routeName === 'Beta') {
            iconPath = require('./iconos-lugares/beta.png');
            focused ? size = selected : size = unselected;
          } else if (routeName === 'T24') {
            iconPath = require('./iconos-lugares/t.png');
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
