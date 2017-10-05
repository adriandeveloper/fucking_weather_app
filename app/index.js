import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import  {fetchWeather}  from './weatherapi';
import Highlight from 'react-native-highlight-words';

const font = Platform.OS === 'ios' ? 'Helvetica' : 'Roboto'
const plat = Platform.OS === 'ios' ? 'ios' : 'md'

const iconNames = {
  Clear: `${plat}-sunny`,
  Haze: `${plat}-sunny`,
  Rain:  `${plat}-rainy`,
  Thunderstorm: `${plat}-thunderstorm`,
  Clouds: `${plat}-cloudy`,
  Snow: `${plat}-snow`,
  Drizzle: `${plat}-umbrella`,
}

const phrases = {
  Clear: {
    title: "It's Fucking Amaze Balls" ,
    subtitle: "Get the fuck outside!",
    highlight: 'Fucking'
  },
  Rain: {
    title: "It's Fucking Raining",
    subtitle: "Stay the fuck inside!",
    highlight: 'Fucking'
  },
  Thunderstorm: {
    title: "Thunderstorm be happening!",
    subtitle: "Thor is pissed!",
    highlight: 'be'
  },
  Haze: {
    title: "Hazy Day Today",
    subtitle: "Sun still out, don't be a bitch!",
    highlight: 'Day'
  },
  Clouds: {
    title: "It's Fucking Cloudy",
    subtitle: "Only stay indoors to play FFVII",
    highlight: 'Fucking'
  },
  Snow: {
    title: "It's Fucking Snowing",
    subtitle: "Bring a fucking jacket",
    highlight: 'Fucking'
  },
  Drizzle: {
    title: "It's Fucking Drizzling Out Chea",
    subtitle: "Rain be next. Strap up with an umbrella",
    highlight: 'Fucking'
  }
}

class App extends Component {
  componentWillMount() {
    this.state = {
      temp: 0,
      weather: 'Clear'
    }
  }
  // use componentDidMount to execute our function when our app renders
  componentDidMount() {
    this.getLocation()
  }

  // use navigator.getlocation to get our position
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
        .then(res => this.setState({
          temp: Math.round(res.temp),
          weather: res.weather
        })), 
      (error) => alert(error) ,
      {timeout:10000}
    )
  }

  render(){
    console.log('component be rendering');
    
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}/>
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
          <Highlight
            style={styles.title}
            highlightStyle={{ color: 'red' }}
            searchWords={[phrases[this.state.weather].highlight]}
            textToHighlight={phrases[this.state.weather].title}
          />
          <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017',
  },
  header: {
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'row'
  },
  temp: {
    fontSize: 45,
    color: 'white',
    fontFamily: font,
    fontWeight: '700',
  },
  body: {
    // backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 5,
    margin: 10,
  },
  title: {
    fontSize: 78,
    fontFamily: font,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: font,
    fontWeight: '400',
  },
});

export default App;
