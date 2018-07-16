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
import Polyline from '@mapbox/polyline';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import { OpenMapDirections } from 'react-native-navigation-directions';

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

    this.mergeLot = this.mergeLot.bind(this);

  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
         this.mergeLot();
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

  mergeLot(){
    if (this.state.latitude != null && this.state.longitude!=null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       this.setState({
         concat: concatLot
       }, () => {
         this.getDirections(concatLot, this.state.destLatitude + ',' + this.state.destLongitude);
       });
     }

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
   async getDirections(startLoc, destinationLoc) {

     try {
           console.log("getDirections");
             let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&mode=walking`)
             let respJson = await resp.json();
             let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
             let coords = points.map((point, index) => {
                 return  {
                     latitude : point[0],
                     longitude : point[1]
                 }
             })
             this.setState({coords: coords})
             this.setState({x: "true"})
             return coords
         } catch(error) {
           console.log('error al obtener ruta')
             this.setState({x: "error"})
             return error
         }
     }


  render() {
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
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
        this.mergeLot();
      }}
      onPress={() => { this._callShowDirections() }}
      >

       {!!this.state.destLatitude && !!this.state.destLongitude && <MapView.Marker
          coordinate={{"latitude":this.state.destLatitude,"longitude":this.state.destLongitude}}
          title={"Your Destination"}
          pinColor='#2DFF96'
        />}

       {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={6}
            strokeColor='#FF962E'/>
        }
      </MapView>
      <ActionButton buttonColor="rgba(231,76,60,1)" position="center" buttonText="Hola" verticalOrientation="down" offsetY={100}>
        <ActionButton.Item buttonColor='#9b59b6' title="Pinche" onPress={() => console.log("notes tapped!")}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Javier" onPress={() => {}}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Imbecil" onPress={() => {}}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
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

  map: {
    position: 'absolute',
    width: 40 + "%",
    height: 40 + "%",
    bottom: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
