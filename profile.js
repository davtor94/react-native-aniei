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
  AsyncStorage,
  Button,
  ScrollView } from 'react-native';

const userKey = "usuario";

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
  title: 'Perfil',
  };
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./src/components/images/logo-udg.png')}
            resizeMode="contain"
          />
          <Text style={styles.regularText}>Usuario</Text>
          <Text style={styles.regularText}>Nombre real</Text>
          <Text style={styles.regularText}>Correo</Text>
          <Text style={styles.regularText}>Institución</Text>
          <TouchableOpacity
                         onPress={()=>this.removeItemValue(userKey)}
                         >
                 <Text  style={styles.buttonText}>SALIR</Text>
          </TouchableOpacity>
      </View>
    );
  }

  removeItemValue = async(key) => {
    try {
      await AsyncStorage.removeItem(key);
      Alert.alert("Bientos");
      return true;
    }
    catch(exception) {
      return false;
    }
  }

}

const styles = StyleSheet.create({
  regularText:{
    fontSize: 15,
},
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
  },
  logo: {
      width: 40 + "%",
      height: 40 + "%",
      opacity : .5,
      margin: 0
  },
});
