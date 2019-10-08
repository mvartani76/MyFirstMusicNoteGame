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
    let titleData = [{title: "1", func: () => this.handleClick(1)},
    					{title: "2", func: () => this.handleClick(2)},
    					{title: "4", func: () => this.handleClick(4)},
    					{title: "6", func: () => this.handleClick(6)}];

    let onClickData = [	() => this.handleClick(1),
    					() => this.handleClick(2),
    					() => this.handleClick(4),
    					() => this.handleClick(6)];
    return (
   		<SafeAreaView style={styles.container}>
   			<View style={styles.topContainer}>
        		<Text style={styles.welcome}>
          			Welcome to the Game!
        		</Text>
        	</View>
        	<LetterButton
        		object={titleData}
        		style={styles.bContainer} />
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