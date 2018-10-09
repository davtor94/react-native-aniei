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
  Dimensions} from 'react-native';

export default class Map extends React.Component {
  static navigationOptions = {
  title: 'Mapa',
  };

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View style={styles.container}>
        <ScrollView style={{width:'100%'}} contentContainerStyle={{alignItems: 'center'}}>
          <View style={{width:'100%'}}>
            <Image style={{ width:screenWidth}} resizeMode='stretch' source={require('./lugares.png')}/>
            <Image style={{width:'80%'}}source={require('./informacion-lugares.png')}/>
          </View>
        </ScrollView>

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
