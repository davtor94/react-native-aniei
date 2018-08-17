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
  ScrollView, } from 'react-native';

import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {OpenMapDirections} from 'react-native-navigation-directions';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDwZV5fTTvjjDhjYUp7El3AFGnfQ39hhmw';

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
    };
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

  render() {
    const { navigation } = this.props;
    const state = this.state;

    const title = state.conferenceData.title;
    const description = state.conferenceData.description;
    const speaker = state.conferenceData.speaker;
    const date = state.conferenceData.date;
    const startTime = state.conferenceData.startTime;
    const endTime = state.conferenceData.endTime;
    const locationName = state.conferenceData.locationName;

    const startTimeArray = startTime.split(':');
    const endTimeArray = endTime.split(':');
    const startHour = startTimeArray[0];
    const startHour = endTimeArray[0];

    var date = new Date();
    if (date.getHours() == ) {

    }
    console.log(date.getHours());

    return (
      <View style={{backgroundColor: '#EBEBEB', flex: 1}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        width: 80 + "%",
        marginVertical: 10,
      }}
      >{title}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={{
            marginBottom: 20, fontSize: 16, borderRadius: 4, }}>{description}</Text>

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
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {

            this.props.navigation.navigate('QrScreen', {
            conferenceId:state.conferenceData.id,
            });

          }}
        >
          <Text  style={styles.buttonText}>¡Quiero asistir!</Text>
        </TouchableOpacity>
          <MapView style={styles.map} initialRegion={{
            latitude: 20.656940,
            longitude: -103.326103,
            latitudeDelta: 0.00486419504430,
            longitudeDelta: 0.00401428176900,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
          toolbarEnabled={false}

          onUserLocationChange={(e) => {
            this.setState({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          >
           {!!this.state.destLatitude && !!this.state.destLongitude && <MapView.Marker
              coordinate={{"latitude":this.state.destLatitude,"longitude":this.state.destLongitude}}
              title={locationName}
            />}
          </MapView>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2B8EB5',
              height: 30,
              width: 80 + "%",
              marginTop: 10,
              marginBottom: 40,
            }}
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
      </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 15,
    margin: 15,
    marginBottom: 0,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 10,
    width: 80 + "%",
  },
  buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B8EB5',
        height: 30,
        marginTop: 15,
        marginBottom: 25,
        width: 90 + "%",
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
