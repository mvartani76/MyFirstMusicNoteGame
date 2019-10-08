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
    let objectData1 = [ {title: "1", func: () => this.handleClick(1)},
    					{title: "2", func: () => this.handleClick(2)},
    					{title: "4", func: () => this.handleClick(4)},
    					{title: "6", func: () => this.handleClick(6)}];

    let objectData2 = [ {title: "3", func: () => this.handleClick(3)},
    					{title: "5", func: () => this.handleClick(5)},
    					{title: "7", func: () => this.handleClick(7)},
    					{title: "9", func: () => this.handleClick(9)}];

    return (
   		<SafeAreaView style={styles.container}>
   			<View style={styles.topContainer}>
        		<Text style={styles.welcome}>
          			Welcome to the Game!
        		</Text>
        	</View>
        	<View style={styles.bottomContainer}>
	        	<LetterButton object={objectData1} viewStyle={styles.tempContainer1} viewStyle={styles.vContainer} buttonStyle={styles.bContainer} textStyle={styles.tContainer}/>
	        	<LetterButton object={objectData2} viewStyle={styles.tempContainer2} viewStyle={styles.vContainer} buttonStyle={styles.bContainer} />
	        </View>
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
  	flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  bottomContainer: {
  	flex: 0.2,
  	flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  vContainer: {
  	flex: 1,
  	flexDirection: 'row',
  	justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  bContainer: {
  	backgroundColor: 'gray',
  	flex: 1,
  	height: '100%',
  	flexDirection: 'column',
  	alignItems: 'center',
  	justifyContent: 'center',
  	margin: 5,
  	borderRadius: 5,
  },
  tContainer: {
  	fontSize: 30,
  },
  tempContainer1: {
  	flex: 1,
  	backgroundColor: 'pink',
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'center',
  	alignItems: 'stretch',
  	alignSelf: 'stretch',
  	width: '100%',
  },
  tempContainer2: {
  	flex: 1,
  	backgroundColor: 'brown',
  	flexDirection: 'row',
  	justifyContent: 'center',
  	alignItems: 'stretch',
  	alignSelf: 'stretch',
  	width: '100%',
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