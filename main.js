import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
TouchableOpacity, } from 'react-native';
  import { createBottomTabNavigator } from 'react-navigation';
  class Main extends React.Component {
  static navigationOptions = {
  title: 'Coferencias',
  };

  render() {
    return (
      <View
        style={styles.container}>
        <Text>putos!</Text>
        <TouchableOpacity style={styles.buttonSignin}
                    onPress={() =>this.props.navigation.navigate('Register')}
                       >
               <Text  style={styles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>todos!</Text>
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
export default createBottomTabNavigator({
  Main: Main,
  Settings: SettingsScreen,
});
