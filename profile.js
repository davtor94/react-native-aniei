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
import Icon from 'react-native-vector-icons/Ionicons';

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
            </View>
            <TouchableOpacity
                           onPress={()=>this._saveData("elKuma")}
                           >
                   <Text  style={styles.buttonText}>PROBAR ENTRADA</Text>
            </TouchableOpacity>
        </View>
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={[{alignSelf: 'center', width: "90%", borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10}]}
          title='Cerrar sesión'
          onPress={() => this.exitConfirmation()}
          />
        <View style={styles.conferencesContainer}>
          <Text style={styles.titleText}>Mis asistencias</Text>
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
                 <Text style={styles.conferenceTextTitle}>{item.title}</Text>
                 <Text style={styles.conferenceText}>Compañia: {item.companyName}</Text>
              </View>
            }
            keyExtractor={item => item.conferenceID}
            ListEmptyComponent={ListEmptyView}
          />
        </View>
      </View>
    );
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
  titleText:{
    fontSize: 17,
    textAlign: 'left',
  },
  conferenceTextTitle:{
    fontSize: 17,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  conferenceText:{
    fontSize: 15,
    textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'bold',
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
    marginBottom: 5,
    flex:3,
  },
  conferenceItem: {
    backgroundColor: '#0ea0ba',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
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
      margin: 0.4,
      alignSelf: 'center',
  },
});
