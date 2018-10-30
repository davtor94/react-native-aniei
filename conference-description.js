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
  Button,
  ScrollView,
  Platform,
  RefreshControl,
  FlatList,
} from 'react-native';
import { AsyncStorage } from "react-native";
import ActionButton from 'react-native-action-button';
import {OpenMapDirections} from 'react-native-navigation-directions';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { NavigationActions } from 'react-navigation';

import * as links from './links.js';

const userKey = "usuario";
const fileNameMain = "conferencias";
const minutosFaltantes = 15;

export default class ConferenceDescriptionScreen extends React.Component {
  static navigationOptions = {
  title: 'Descripción',
  };

  constructor(props) {
    super(props);
    const data = this.props.navigation.getParam('conferenceData', '');
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      destLatitude:20.658246,
      destLongitude:-103.326958,
      conferenceData: data,
      username:null,
      recomendationsData: null,
      refreshing: false,
    };
    this._downloadRecomendations();
    this._getUserName()
    .then((user)=> {
      this.setState({
        username:user,
      });
      console.log(this.state.username);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentDidMount() {
    if (Platform.OS === 'android'){
      this._getCurrentPosition();
    }
    this.setState({
      destLatitude:parseFloat(this.state.conferenceData.latitude),
      destLongitude:parseFloat(this.state.conferenceData.longitude),
    });
   }
   _getCurrentPosition = () => {
     navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
   }
   _callShowDirections = () => {
     const startPoint = {
       longitude: this.state.longitude,
       latitude: this.state.latitude
     }
     const endPoint = {
       longitude: this.state.destLongitude,
       latitude: this.state.destLatitude
     }
  		const transportPlan = 'w';

      OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
        console.log(res)
      });
    }
  _verifyDate = () => {
    const state = this.state;
    const conferenceDate = state.conferenceData.date;
    const startTime = state.conferenceData.startTime;
    const endTime = state.conferenceData.endTime;

    const startTimeArray = startTime.split(':');
    const endTimeArray = endTime.split(':');
    const startHour = startTimeArray[0];
    const endHour = endTimeArray[0];
    const startMinute = startTimeArray[1];
    const endMinute = endTimeArray[1];

    dateValues = conferenceDate.split('-');
    const conferenceYear = dateValues[0];
    const conferenceMonth = dateValues[1];
    const conferenceDay = dateValues[2];

    var currentDate = new Date();
    var totalCurrentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
    var totalStartMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    var totalEndMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

    if(conferenceYear==currentDate.getFullYear() &&
     conferenceMonth==(currentDate.getMonth()+1) &&
      conferenceDay==currentDate.getDate()){
        if (totalStartMinutes - totalCurrentMinutes <= minutosFaltantes ) {
          if (totalEndMinutes > totalCurrentMinutes ) {
            return true;
          }
          else {
            Alert.alert("La conferencia ya terminó o está por terminar");
            return false;
          }
        }
        else {
          Alert.alert("Solo te puedes registrar faltando "+minutosFaltantes+" minutos o menos");
          return false;
        }
      }
      else{
        Alert.alert("Hoy no es la conferencia");
        return false;
      }
  }
  _getUserName = async() =>{
    try {
      const value = await AsyncStorage.getItem(userKey);
      if (value !== null) {
        return value;
      }else{
        return null;
      }
     } catch (error) {
       console.error(error);
       return null;
     }
  };

  _verifyDateRecomendations = (recomendation) => {
    const state = this.state;
    const conferenceDate = recomendation.date;
    const startTime = recomendation.startTime;
    const endTime = recomendation.endTime;

    const startTimeArray = startTime.split(':');
    const endTimeArray = endTime.split(':');
    const startHour = startTimeArray[0];
    const endHour = endTimeArray[0];
    const startMinute = startTimeArray[1];
    const endMinute = endTimeArray[1];

    dateValues = conferenceDate.split('-');
    const conferenceYear = dateValues[0];
    const conferenceMonth = dateValues[1];
    const conferenceDay = dateValues[2];


    var currentDate = new Date();
    var totalCurrentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
    var totalStartMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    var totalEndMinutes = parseInt(endHour) * 60 + parseInt(endMinute);



    if(conferenceYear<=currentDate.getFullYear() &&
     conferenceMonth<=(currentDate.getMonth()+1)){
        if (conferenceDay==currentDate.getDate()) {//Hora mayor a actual
          if (startHour > currentDate.getHours() ) {
            //Alert.alert("Si");
            return true;
          }else{
            return false;
          }
        }
        else if(conferenceDay>currentDate.getDate()){
            return true;
          //Alert.alert("Si 2");
        }
        else {
          //Alert.alert("No 2");

          return false;
        }
      }
  }

  _filterRecomendations = async function(recomendations){
    try {
      const localValues = await AsyncStorage.getItem(fileNameMain);
      if (localValues !== null) {
        const allJSON = JSON.parse(localValues);
        //const filteredConferences = _filterConferences(companyName,valueJson);
        //this.setState({data:filteredConferences});
        var filteredData = [];
        var i,r, filteredCount=0;
        var actualId;
        const maxRecomendations = 5;
        const allSize = allJSON.length;
        const recomendationsSize = recomendations.length;
        var currentDate = new Date();
        //Alert.alert(""+recomendationsSize);
        for(r=0;r<recomendationsSize;r++){
          actualId = recomendations[r]['id'];
          for(i=0;i<allSize;i++){
              if(allJSON[i]['id'] === actualId){
                dateValues = String(allJSON[i]['date']).split('-');
                var conferenceYear = dateValues[0];
                var conferenceMonth = dateValues[1];
                var conferenceDay = dateValues[2];
                if(Number(currentDate.getFullYear()<=Number(conferenceYear))
                    && ((Number(currentDate.getMonth()+1)<Number(conferenceMonth))
                      || ((Number(currentDate.getMonth()+1)==Number(conferenceMonth)) &&
                          (Number(currentDate.getDate())<=Number(conferenceDay)))) ){
                            if(this._verifyDateRecomendations(allJSON[i])){
                              filteredData[filteredCount]=allJSON[i];
                              filteredCount++;
                              break;
                            }
                  }
                }
              }
            if(filteredCount>=maxRecomendations){
              break;
            }

        }
        this.setState({refreshing: false});
        this.setState({recomendationsData:filteredData});
        return filteredData;
      }else{
        //this._downloadConferencesData();
        Alert.alert("Sin local");

      }
     } catch (error) {
       //Alert.alert("Error en load");
     }
  }

  _downloadRecomendations = function(companyName) {
    try{
      this.setState({refreshing: true});
      fetch(links.GET_RECOMENDATIONS_LINK, {
      method: 'POST',
      headers: new Headers({
               'Accept': 'application/json, text/plain',
               'Content-Type': 'application/x-www-form-urlencoded',
      }),
        body: "conferenceId="+this.state.conferenceData.id
      }).then((response) =>  response.json())
        .then((responseJson) => {
          //Alert.alert(this.state.conferenceData.id+" - "+JSON.stringify(responseJson));
          this._filterRecomendations(responseJson);
          //const filteredRecomendations = responseJson;
          //this.setState({refreshing: false});
          //this.setState({recomendationsData:filteredRecomendations});
        })
        .catch((error) => {
          this.setState({refreshing: false});
        });
      }catch(erro){

      }
  }

  render() {
    const { navigation } = this.props;
    const state = this.state;

    const title = state.conferenceData.title;
    const company = state.conferenceData.companyName;
    const description = state.conferenceData.description;
    const speaker = state.conferenceData.speaker;
    const date = state.conferenceData.date;
    const startTime = state.conferenceData.startTime;
    const endTime = state.conferenceData.endTime;
    const locationName = state.conferenceData.locationName;

    return (
    <View style={styles.container}>
      <ScrollView style={{width: 100 + "%",}} contentContainerStyle={styles.contentContainer}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          width: 80 + "%",
          marginTop: 10,
        }}
        >{title}</Text>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 13,
          textAlign: 'center',
          width: 80 + "%",
          marginBottom: 10,
        }}
        >Impartida por {company}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={{
            fontSize: 16, borderRadius: 4, }}>{description}
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              if (this.state.username) {
                if (this._verifyDate()) {
                  this.props.navigation.navigate('QrScreen', {
                  conferenceId:state.conferenceData.id,
                  });
                }
              }
              else {
                Alert.alert("Necesitas iniciar sesión");
              }

            }}
          >
            <Text  style={styles.buttonText}>Asistir</Text>
          </TouchableOpacity>
          <View style={{flex: 1, backgroundColor: '#fff', width: 100 + "%"}}>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <TableWrapper style={styles.wrapper}>
                <Col data={["Ubicación","Ponente","Fecha","Hora"]}
                style={styles.title}  textStyle={styles.textTitleTable}/>
                <Rows data={[[locationName],[speaker],[date],[startTime+" - "+endTime]]}
                flexArr={[2]} style={styles.row} textStyle={styles.textTable}/>
              </TableWrapper>
            </Table>
          </View>
          {Platform.OS === 'android' ?
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              if (this.state.latitude != null){
                this._callShowDirections();
              }
              else {
                this._getCurrentPosition();
                Alert.alert("Enciende tu ubicación");
              }
            }}
          >
            <Text  style={styles.buttonText}>Cómo llegar</Text>
          </TouchableOpacity>
          : <View/>}
        </View>

        <View style={styles.conferencesContainer}>
          <Text style={styles.titleText}>Relacionadas:</Text>
          <FlatList style={{width:100 + '%'}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {this._downloadRecomendations()}}
              />
            }
            data={this.state.recomendationsData}
            renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.toNextConference(item)}>
              <View style={styles.conferenceItem}>
                  <View style={styles.conferenceInfoContainer}>
                    <Text style={styles.conferenceText}>{item.companyName}</Text>
                  </View>
                  <Text style={styles.conferenceTextTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            }
            keyExtractor={item => item.id}
            ListEmptyComponent={this.ListEmptyRecomendations}
          />
        </View>

      </ScrollView>
    </View>
    );
  }
  toNextConference =(target) =>{
    this.props.navigation.navigate({
      routeName:'Conference',
      params:{
        conferenceData: target,
        },
      key: target['id'],
    }
  );
  }

  ListEmptyRecomendations = () => {
   return (
     <View style={{margin: 20, backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
       <Text style={{textAlign: 'center', margin:20}}>Parece que no hay recomendaciones para mostrar</Text>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 15,
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 30,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 10,
    marginBottom: 15,
    width: 90 + "%",
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B8EB5',
    height: 30,
    marginTop: 15,
    marginBottom: 15,
    width: 100 + "%",
    borderRadius: 3,
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  map: {
    width: 80 + "%",
    height: 300,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 50 },
  textTable: { paddingHorizontal: 10 },
  textTitleTable: { textAlign: 'center', fontWeight: 'bold' },
  conferenceItem: {
    backgroundColor: '#03a9f4',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 100 + "%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginTop: 5,
  },
  conferencesContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    top: 10,
    width: 95 + "%",
    marginTop: 5,
  },
  conferenceInfoContainer: {
    backgroundColor: '#0d9adb',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: 100 + "%",
    padding: 3,
    borderRadius: 5,
  },
  conferenceText:{
    fontSize: 15,
    textAlign: 'right',
    flex:1,
    color: '#ffffff',
  },
  conferenceTextTitle:{
    fontSize: 17,
    color: '#ffffff',
    fontWeight: 'bold',
    margin: 5,
  },
  titleText:{
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#686868',
  },
});
