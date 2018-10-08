import React from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import Login from './login';
import Register from './register';
import Main from './main';
import QrScanner from './qr';
import ConferenceDescriptionScreen from './conference-description';
import RatingConference from './rating-conference';
import ProfileScreen from './profile';
import About from './about';
import Workshops from './workshops';
import ScientificCongress from './scientific-congress';
import ProgrammingContest from './programming-contest';
import Visits from './visits';
import EmploymentFair from './employment-fair';
import Map from './map';
import {createDrawerNavigator, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const MenuButton =(props)=> {
  return(
  	<View>
  		<TouchableOpacity onPress={() => { props.navigation.toggleDrawer()} }>
  			<Icon name="md-menu" style={{color: 'white', padding: 10, marginLeft:10, fontSize: 20}}/>
  		</TouchableOpacity>
  	</View>
  );
}

const ConferencesStack = StackNavigator({
    Login: Login,
    Register: Register,
    Main: Main,
    QrScreen: QrScanner,
    Conference: ConferenceDescriptionScreen,
    Rating: RatingConference,
    Profile: ProfileScreen,
    About: About,
  },
  {
    headerMode: 'float',
    initialRouteName: 'Main',
    navigationOptions:({navigation}) => ({
      title: 'Conferencias',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const workshopStack = StackNavigator(
  {
    Workshops: Workshops,
    Conference: ConferenceDescriptionScreen,
    QrScreen: QrScanner,
  },
  {
    headerMode: 'float',
    initialRouteName: 'Workshops',
    navigationOptions:({navigation}) => ({
      title: 'Talleres',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const congressStack = StackNavigator(
  {
    ScientificCongress: ScientificCongress,
  },
  {
    headerMode: 'float',
    initialRouteName: 'ScientificCongress',
    navigationOptions:({navigation}) => ({
      title: 'Congreso científico',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const contestStack = StackNavigator(
  {
    ProgrammingContest: ProgrammingContest,
  },
  {
    headerMode: 'float',
    initialRouteName: 'ProgrammingContest',
    navigationOptions:({navigation}) => ({
      title: 'Concurso de programación',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const visitsStack = StackNavigator(
  {
    Visits: Visits,
  },
  {
    headerMode: 'float',
    initialRouteName: 'Visits',
    navigationOptions:({navigation}) => ({
      title: 'Visita a empresas',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const fairStack = StackNavigator(
  {
    EmploymentFair: EmploymentFair,
  },
  {
    headerMode: 'float',
    initialRouteName: 'EmploymentFair',
    navigationOptions:({navigation}) => ({
      title: 'Feria del empleo',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const mapStack = StackNavigator(
  {
    Map: Map,
  },
  {
    headerMode: 'float',
    initialRouteName: 'Map',
    navigationOptions:({navigation}) => ({
      title: 'Mapa',
      headerRight: <MenuButton navigation={navigation}/>,
      headerStyle: {
        backgroundColor: '#2980b6',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const Drawer = createDrawerNavigator({
  'Conferencias': {
    screen: ConferencesStack,
  },
  'Talleres': {
    screen:workshopStack,
  },
  'Visita a empresas': {
    screen:visitsStack,
  },
  'Feria del empleo': {
    screen:fairStack,
  },
  'Congreso científico': {
    screen:congressStack,
  },
  'Concurso de programación': {
    screen:contestStack,
  },
  'Ubicaciones': {
    screen:mapStack,
  }
}, {
  drawerWidth: 300,
  drawerPosition: 'right',
  backBehavior: 'none',
  contentOptions: {
    activeTintColor :'#ffffff',
    inactiveTintColor :'#1999CE',
    activeBackgroundColor :'#1999CE',
    inactiveBackgroundColor :'#ffffff',
    },
});

export default class App extends React.Component {
  render(){
    return (
    <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <Drawer/>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
