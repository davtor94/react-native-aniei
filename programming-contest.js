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
  Linking,
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
        ref={(ref) => { this.webview = ref; }}
        source={{uri: links.GET_CONTEST_LINK}}
        renderError={()=>{
          Alert.alert("Ocurrió un error");
        }}
        onNavigationStateChange={(event) => {
          if(event.url !== links.GET_CONTEST_LINK){
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
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
