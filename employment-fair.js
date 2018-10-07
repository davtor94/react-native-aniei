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

export default class EmploymentFair extends React.Component {
  static navigationOptions = {
  title: 'Feria del empleo',
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
