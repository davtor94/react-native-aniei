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
import { Rating, AirbnbRating } from 'react-native-ratings';

export default class RatingConference extends React.Component {
  static navigationOptions = {
  title: 'Calificar',
  };

  constructor(props) {
    super(props);

    this.state = {
    };

  }
  render() {
    return (
      <View style={styles.container}>
        <AirbnbRating
          count={5}
          reviews={["Terrible", "OK", "Good", "Very Good", "Amazing"]}
          defaultRating={3}
          size={50}
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
