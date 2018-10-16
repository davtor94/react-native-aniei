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
  WebView,
  Dimensions} from 'react-native';
import * as links from './links.js';

export default class Map extends React.Component {
  static navigationOptions = {
  title: 'Mapa',
  };

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <WebView
        source={{uri: links.GET_MAP_LINK}}
        renderError={()=>{
          Alert.alert("Ocurrió un error");
        }}
      />
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
});
