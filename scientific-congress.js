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

export default class ScientificCongress extends React.Component {
  static navigationOptions = {
  title: 'Congreso científico',
  };

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: 'https://github.com/facebook/react-native'}}
          style={{marginTop: 20}}
        />
      </View>
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
