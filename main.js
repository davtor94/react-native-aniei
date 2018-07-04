import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
TouchableOpacity, } from 'react-native';
  import { createBottomTabNavigator } from 'react-navigation';
  class OracleScreen extends React.Component {
    static navigationOptions = {
  title: 'Oracle',
};
  render() {
    return (
      <View
        style={styles.container}>
        <Text>Bienvenido!</Text>
        <TouchableOpacity style={styles.buttonSignin}
                    onPress={() =>this.props.navigation.navigate('Login')}
                       >
               <Text  style={styles.buttonText}>Inicia Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignin}
                    onPress={() =>this.props.navigation.navigate('QrScreen')}
                       >
               <Text  style={styles.buttonText}>Asistencia</Text>
        </TouchableOpacity>
        </View>
    );
  }
}

class IbmScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>todos!</Text>
      </View>
    );
  }
}
class HpScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>todos!</Text>
      </View>
    );
  }
}

class IntelScreen extends React.Component {
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
  Oracle: OracleScreen,
  IBM: IbmScreen,
  intel: IntelScreen,
  HP: HpScreen,
});
