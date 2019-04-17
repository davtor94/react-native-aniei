import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  RefreshControl,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Card, ListItem, Button,} from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as links from './links.js';

const fileNameVisit = "visitas";
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
  class MyCardVisit extends React.Component{
      constructor(props){
        super(props);
        dateValues = String(this.props.item.date).split('-');
        startTimeValues = String(this.props.item.startTime).split(':');
        endTimeValues = String(this.props.item.endTime).split(':');
        var conferenceYear = dateValues[0];
        var conferenceMonth = dateValues[1];
        var conferenceDay = dateValues[2];
        this.state = {
          year: conferenceYear,
          month: conferenceMonth,
          day: conferenceDay,
          hour: startTimeValues[0],
          minute: startTimeValues[1],
          endHour: endTimeValues[0],
          endMinute: endTimeValues[1],
        }
      }

      render(){
        return(
          <View style={{width: Dimensions.get('window').width}}>
            <Card
              title={this.props.item.title}
              image={null}
            >
              <Text style={{fontWeight: 'bold'}}>
                Dia: {this.state.day}/{this.state.month}/{this.state.year}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                Hora: {this.state.hour}:{this.state.minute} - {this.state.endHour}:{this.state.endMinute}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                Cupo: {this.props.item.room}
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                Punto de reunión:
              </Text>
              <Text numberOfLines={3} style={{marginBottom: 10}}>
                {this.props.item.locationName}
              </Text>
           </Card>
          </View>

        );
      }
    }
    class BaseScreenVisit extends React.Component {
      constructor(props,company,imagePath){
        super(props);
        this.state = {
          refreshing: false,
          data: null,
          isVisible: true,
        };
        this.companyName=company;
        this._downloadVisitsData = _downloadVisitsData.bind(this);
        this._loadVisitsData = _loadVisitsData.bind(this);
        this._loadVisitsData(this.companyName);
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
                  onRefresh={() => {this._downloadVisitsData(this.companyName)}}
                />
              }
              data={this.state.data}
              renderItem={({item}) =>
              	 <MyCardVisit
                   item={item} navegador={this.props.navigation}
                   imagePath={this.imagePath}
                   companyName={this.companyName}
                 />
              }
              keyExtractor={item => item.id}
              ListEmptyComponent={ListEmptyViewVisit}
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
    _downloadVisitsData= function(companyName) {
        this.setState({refreshing: true});
        fetch(links.GET_ALL_VISITS_LINK, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json',
            }
          }).then((response) =>  response.json())
          .then((responseJson) => {
            const bases = JSON.stringify(responseJson);
            _saveDatabasesVisit(bases);
            this.setState({refreshing: false});
            this.setState({data:responseJson});
          })
          .catch((error) => {
            this.setState({refreshing: false});
          });
    }
    _loadVisitsData = async function(companyName){
      try {
        const value = await AsyncStorage.getItem(fileNameVisit);
        if (value !== null) {
          //Alert.alert("Value no null");
          const valueJson = JSON.parse(value);
          this.setState({data:valueJson});
        }else{
          //Alert.alert("Value null");

          this._downloadVisitsData();
        }
       } catch (error) {
       }
    }
    _saveDatabasesVisit = async(basesString) => {
      //Alert.alert("Inicio guardar visit");

      try {
        await AsyncStorage.setItem(fileNameVisit, basesString);
      } catch (error) {
      }
    }
    ListEmptyViewVisit = () => {
     return (
       <View style={{margin: 20, backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
         <Text style={{textAlign: 'center', margin:20}}>Parece que no hay visitas a empresas, desliza hacia abajo para actualizar</Text>
       </View>
     );
    }

export default class Visits extends BaseScreenVisit {
  static navigationOptions = {
  title: 'Visitas',
  };
  constructor(props) {
    super(props,noCompany,require('./visitas.jpg'));
  };
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
