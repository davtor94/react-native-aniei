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
} from 'react-native';
  import { AsyncStorage } from "react-native";

import ActionButton from 'react-native-action-button';
import {OpenMapDirections} from 'react-native-navigation-directions';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const userKey = "usuario";
const minutosFaltantes = 15

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
    };
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
    this._getCurrentPosition();
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
          Alert.alert("Solo te puedes registrar faltando 15 minutos o menos");
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
                <Col data={["Auditorio","Ponente","Fecha","Hora"]}
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
      </ScrollView>
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
  textTitleTable: { textAlign: 'center', fontWeight: 'bold' }
});
