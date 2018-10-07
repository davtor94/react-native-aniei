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

export default class Visits extends React.Component {
  static navigationOptions = {
  title: 'Visitas',
  };

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    return (
      <View style={styles.container}>

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
