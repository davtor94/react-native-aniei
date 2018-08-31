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
  ScrollView,
  ActivityIndicator
} from 'react-native';
import * as links from './links.js';

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
      loaded:false,
    }
    this._loadProfile();
  }

  ListEmptyItem = () => {
   return (
     <View style={{margin: 20, backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
       <Text style={{textAlign: 'center', margin:20}}>Parece que no has asistido a conferencias aún</Text>
     </View>
   );
  }
  render() {
    if(this.state.loaded == true){
      return (
        <View style={styles.container}>
          <View style={styles.profileContainer}>
              <Image
                style={styles.logo}
                source={require('./src/components/images/logo_leon_udg.png')}
                resizeMode="contain"
              />
              <Text style={styles.userText}>{this.state.user}</Text>
              <View style={{flex: 1, marginTop: 5}} >
                <Text style={styles.regularText}>Nombre: {this.state.name}</Text>
                <Text style={styles.regularText}>Correo: {this.state.email}</Text>
                <Text style={styles.regularText}>Institución: {this.state.institution}</Text>
              </View>
              <TouchableOpacity style={styles.buttonContainer}
                onPress={() => this.exitConfirmation()}
              >
                <Text  style={styles.buttonText}>Cerrar sesión</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.conferencesContainer}>
            <Text style={styles.titleText}>Mis asistencias</Text>
            <FlatList style={{width:100 + '%'}}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {this._loadProfile()}}
                />
              }
              data={this.state.assistances}
              renderItem={({item}) =>
                <View style={styles.conferenceItem}>
                  <View style={styles.conferenceInfoContainer}>
                    <Text style={styles.conferenceText}>{item.companyName}</Text>
                  </View>
                  <Text style={styles.conferenceTextTitle}>{item.title}</Text>
                </View>
              }
              keyExtractor={item => item.conferenceID}
              ListEmptyComponent={this.ListEmptyItem}
            />
          </View>
        </View>
      );
    }
    else{
      return(
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#009999" />
        </View>
      );
    }
  }

  exitConfirmation = ()=>{
    Alert.alert(
      '¿Cerrar sesión?',
      'Tu sesión sirve para tomar asistencia a las conferencias',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Salir', onPress:this.removeItemValue },
      ],
      { cancelable: true }
    )
  }
  removeItemValue = async() => {
    try {
      await AsyncStorage.removeItem(userKey);
      this.props.navigation.goBack();
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
        fetch(links.GET_USER_PROFILE_LINK, {
        method: 'POST',
        headers: new Headers({
                 'Accept': 'application/json, text/plain',
                 'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: "username="+ value
      }).then((response) =>  response.json())
        .then((responseJson) => {
            var profileUser = null;
            var profileName = null;
            var profileEmail = null;
            var profileInstitution = null;
            var profileAssistances = null;
            if(responseJson.length >=1){
              profileUser = responseJson[0]["username"];
              profileName= responseJson[0]["name"];
              profileEmail= responseJson[0]["email"];
              profileInstitution= responseJson[0]["institution"];
            }
            if(responseJson.length >=2){
              profileAssistances = responseJson[1]["conferences"];
            }

            this.setState({
              user: profileUser,
              name: profileName,
              email: profileEmail,
              institution: profileInstitution,
              assistances: profileAssistances,
              loaded: true,
            })
            })
            .catch((error) => {
            });
        return true;
      }else{
        return false;
      }
     } catch (error) {
       this.setState({
         refreshing:false,
       })
       return false;
     }
  }
  _saveData = async(anything) => {
    try {
      await AsyncStorage.setItem(userKey,anything);
    } catch (error) {
    }
  }
}

const styles = StyleSheet.create({
  regularText:{
    fontSize: 15,
    textAlign: 'left',
    marginTop: 2,
  },
  userText:{
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  titleText:{
    fontSize: 17,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#686868',
  },
  conferenceTextTitle:{
    fontSize: 17,
    color: '#ffffff',
    fontWeight: 'bold',
    margin: 5,
  },
  conferenceText:{
    fontSize: 15,
    textAlign: 'right',
    flex:1,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    top: 10,
    width: 90 + "%",
    padding: 10,
    paddingBottom: 20,
    flex:2,
    borderRadius:5,
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
    marginBottom: 5,
    flex:3,
    borderRadius:5,
  },
  conferenceItem: {
    backgroundColor: '#03a9f4',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 100 + "%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    marginTop: 5,
  },
  conferenceInfoContainer: {
    backgroundColor: '#0d9adb',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: 100 + "%",
    padding: 3,
    borderRadius: 5,
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b6',
    height: 30,
    borderRadius: 5,
    width: 60 + "%"
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  logo: {
      width: 40 + "%",
      height: 40 + "%",
      opacity : .5,
      margin: 0.4,
      alignSelf: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});
