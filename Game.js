import React, { Component } from 'react';

import {name as appName} from './app.json';
import { Button } from 'react-native-elements';
import { LetterButton} from './ButtonUtility.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

export default class Game extends Component {
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
   		<SafeAreaView style={styles.container}>
   			<View style={styles.topContainer}>
        		<Text style={styles.welcome}>
          			Welcome to the Game!
        		</Text>
        	</View>
        	{/*
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
        */}
        	{/*<LetterButton title="4" onPress={ () => this.handleClick(4) } />*/}
        	<LetterButton title={["1","2","4","6"]} innerStyle={styles.tempContainer} buttonStyle={styles.bContainer} onPress={ () => this.handleClick(1) } />
        </SafeAreaView> 
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
  bContainer: {
  	backgroundColor: 'gray',
  	margin: 10,
  },
  tempContainer: {
  	flex: 2,
  	backgroundColor: 'pink',
  	flexDirection: 'column',
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