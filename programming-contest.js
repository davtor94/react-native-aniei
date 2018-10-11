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
} from 'react-native';
import * as links from './links.js';


export default class ProgrammingContest extends React.Component {
  static navigationOptions = {
  title: 'Concurso de programación',
  };

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    return (
      <WebView
        source={{uri: links.GET_CONTEST_LINK}}
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
