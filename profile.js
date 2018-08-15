import React from 'react';
import {
  StyleSheet,
  FlatList,
  RefreshControl,
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
    this.state = {
      user: '',
      name: '',
      email: '',
      institution: '',
      assistances: null,
      refreshing: false,
    }
    this._loadProfile();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
            <Image
              style={styles.logo}
              source={require('./src/components/images/logo_leon_udg.png')}
              resizeMode="contain"
            />
            <View style={{flex: 1}} >
              <Text style={styles.regularText}>Usuario: {this.state.user}</Text>
              <Text style={styles.regularText}>Nombre: {this.state.name}</Text>
              <Text style={styles.regularText}>Correo: {this.state.email}</Text>
              <Text style={styles.regularText}>Institución: {this.state.institution}</Text>
              <TouchableOpacity
                             onPress={()=>this.removeItemValue(userKey)}
                             >
                     <Text  style={styles.buttonText}>SALIR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                             onPress={()=>this._saveData("elKuma")}
                             >
                     <Text  style={styles.buttonText}>PROBAR ENTRADA</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.conferencesContainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => {this._loadProfile()}}
              />
            }
            data={this.state.assistances}
            renderItem={({item}) =>
              <View style={styles.conferenceItem}>
                 <Text style={styles.regularText}>Conferencia: {item.title}</Text>
                 <Text style={styles.regularText}>Calificación: {item.score}</Text>
              </View>
            }
            keyExtractor={item => item.conferenceID}
            ListEmptyComponent={ListEmptyView}
          />
        </View>
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
  _loadProfile = async() =>{
    try {
      const value = await AsyncStorage.getItem(userKey);
      if (value !== null) {
        //Alert.alert("Logueado Value "+value)
        fetch('https://javiermorenot96.000webhostapp.com/aniei/getUserProfile.php', {
        method: 'POST',
        headers: new Headers({
                 'Accept': 'application/json, text/plain',
                 'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "username="+ value
      }).then((response) =>  response.json())
        .then((responseJson) => {
          //Alert.alert(responseJson[0]["username"])
          //Cambiamos las props
            this.setState({
              user: responseJson[0]["username"],
              name: responseJson[0]["name"],
              email: responseJson[0]["email"],
              institution: responseJson[0]["institution"],
              assistances: responseJson[1]["conferences"],
            })
            })
            .catch((error) => {
              console.error(error);
            });
        return true;
      }else{
        return false;
      }
     } catch (error) {
       console.error(error);
       return false;
     }
  }
  _saveData = async(anything) => {
    try {
      await AsyncStorage.setItem(userKey,anything);
    } catch (error) {
        console.console.error();
    }
  }
}

const styles = StyleSheet.create({
  regularText:{
    fontSize: 15,
    textAlign: 'left',
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 10,
    width: 90 + "%",
    padding: 10,
    flex:2,
  },
  conferencesContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 10,
    width: 90 + "%",
    height: 100,
    padding: 10,
    marginTop: 5,
    flex:3,
  },
  conferenceItem: {
    backgroundColor: '#d1eeff',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    top: 10,
    width: 100 + "%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginTop: 5,
  },
  logo: {
      width: 40 + "%",
      height: 40 + "%",
      opacity : .5,
      margin: 0.

  },
});
