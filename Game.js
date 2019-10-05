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

    this.state = {
     status:true
   }
 }

 

   handleClick = (buttonNumber) => {
   		let desiredNumber = 1;
        if (buttonNumber == desiredNumber) {
        	console.log("correct");
        } else {
        	console.log("inorrect");
        }
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
        		<View style={styles.buttonContainer}>
		        	<Button
		          	title="Button" onPress={ () => this.handleClick(1)}
		        	/>
		        </View>
		        <View style={styles.buttonContainer}>
		        	<Button
		          	title="Button" onPress={ () => this.handleClick(2)}
		        	/>
		        </View>
		        <View style={styles.buttonContainer}>
		        	<Button
		          	title="Button" onPress={ () => this.handleClick(3)}
		        	/>
		        </View>
		        <View style={styles.buttonContainer}>
		        	<Button
		          	title="Button" onPress={ () => this.handleClick(4)}
		        	/>
		        </View>
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
  	flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  buttonContainer: {
  	flex: 1,
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