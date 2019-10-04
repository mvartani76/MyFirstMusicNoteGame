import React, { Component } from 'react';

import {name as appName} from './app.json';
import { Button } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
   		<View style={styles.container}>
   			<View style={styles.topContainer}>
        		<Text style={styles.welcome}>
          			Welcome to the Game!
        		</Text>
        	</View>
        	<View style={styles.midContainer}>
	        	<Button
	          	title="Button" onPress={() => navigate('Home', {name: 'Jane'})}
	        	/>
        	</View>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'green',
  },
  topContainer: {
  	flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  midContainer: {
  	flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontFamily: "GoodDog Plain",
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  scaler: {
    transform: [{scaleX: 2.5}, {scaleY: 4.0}],
  },
});