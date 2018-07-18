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
  ScrollView } from 'react-native';

import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {OpenMapDirections} from 'react-native-navigation-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDwZV5fTTvjjDhjYUp7El3AFGnfQ39hhmw';

export default class ConferenceDescriptionScreen extends React.Component {
  static navigationOptions = {
  title: 'Descripción',
  };

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      concat: null,
      coords:[],
      x: 'false',
      destLatitude:20.658246,
      destLongitude:-103.326958,
    };

  }
  componentDidMount() {
    this._getCurrentPosition();
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
    const title = navigation.getParam('title', '');
    const description = navigation.getParam('description', '');
    const speaker = navigation.getParam('speaker', '');
    const date = navigation.getParam('date', '');
    const startTime = navigation.getParam('startTime', '');
    const endTime = navigation.getParam('endTime', '');

    return (
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>Título: {title}</Text>
          <Text style={styles.text}>Descripción: {description}</Text>
          <Text style={styles.text}>Auditorio: {title}</Text>
          <Text style={styles.text}>Ponente: {speaker}</Text>
          <Text style={styles.text}>Fecha: {date}</Text>
          <Text style={styles.text}>Hora: {startTime} - {endTime}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>this.props.navigation.navigate('QrScreen')}
        >
          <Text  style={styles.buttonText}>¡Quiero asistir!</Text>
        </TouchableOpacity>
        <View style={styles.mapContainer}>
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
          onPress={() => {
            if (this.state.latitude != null){
              this._callShowDirections();
            }
            else {
              this._getCurrentPosition();
              Alert.alert("Por favor enciende tu ubicación");
            }
          }}
          >

           {!!this.state.destLatitude && !!this.state.destLongitude && <MapView.Marker
              coordinate={{"latitude":this.state.destLatitude,"longitude":this.state.destLongitude}}
              title={"Your Destination"}
              pinColor='#2DFF96'
            />}
          </MapView>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
},
  buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2980b6',
        height: 30,
        marginTop: 15,
        borderRadius: 25,
        width: 60 + "%"
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 10,
    width: 80 + "%",
    height: 40 + "%",
  },
  mapContainer: {
    position: 'absolute',
    width: 80 + "%",
    height: 30 + "%",
    bottom: 10 + "%",
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
