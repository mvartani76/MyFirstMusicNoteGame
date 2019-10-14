import React, { Component } from 'react';

import {name as appName} from './app.json';
import { Button } from 'react-native-elements';
import { LetterButton} from './ButtonUtility.js';

import { Accidental } from 'vexflow/src/accidental';
import { Stave } from 'vexflow/src/stave';
import { StaveNote } from 'vexflow/src/stavenote';
import { Voice } from 'vexflow/src/voice';
import { Formatter } from 'vexflow/src/formatter';
import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { Dimensions } from 'react-native';

import { VexFlow } from './VexUtility.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

export default class Game extends Component {

	durationValues = ["1","2","4","8","16"];
	noteValues = ["a/4","b/4","c/4","d/4","e/4","f/4","g/4"];

  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get('window').width;

    this.state = {
     status:true,
     musicObjectData: {	"stave_width": screenWidth / 5,
							"stave_x_start": 2 * screenWidth / 5,
							"stave_y_start": 125,
							"clef": "treble",
							"notes": [{"clef": "treble", "keys": [this.noteValues[0]], "duration": this.durationValues[0], "dots": 0}],
							"voices": [{"num_beats": 1, "beat_value": 4}]}
   }
 }

   handleClick = (buttonNumber) => {
	const screenWidth = Dimensions.get('window').width;
	randomDuration = Math.floor(Math.random()*this.durationValues.length);
	randomNote = Math.floor(Math.random()*this.noteValues.length);
	console.log(randomDuration);
   		let desiredNumber = 1;
        if (buttonNumber == desiredNumber) {
        	console.log("correct");
			this.setState({status: false});
			this.setState({musicObjectData: {	"stave_width": screenWidth / 5,
							"stave_x_start": 2 * screenWidth / 5,
							"stave_y_start": 125,
							"clef": "treble",
							"notes": [{"clef": "treble", "keys": [this.noteValues[randomNote]], "duration": this.durationValues[randomDuration], "dots": 0}],
							"voices": [{"num_beats": 1, "beat_value": 4}]}});
        } else {
        	console.log("inorrect");
        }
    }

  render() {
    const {navigate} = this.props.navigation;
    const screenWidth = Dimensions.get('window').width;

    let objectData1 = [ {title: "1", func: () => this.handleClick(1)},
    					{title: "2", func: () => this.handleClick(2)},
    					{title: "4", func: () => this.handleClick(4)},
    					{title: "6", func: () => this.handleClick(6)}];

    let objectData2 = [ {title: "3", func: () => this.handleClick(3)},
    					{title: "5", func: () => this.handleClick(5)},
    					{title: "7", func: () => this.handleClick(7)},
    					{title: "9", func: () => this.handleClick(9)}];

	/*let musicObjectData = {	"stave_width": screenWidth / 5,
							"stave_x_start": 2 * screenWidth / 5,
							"stave_y_start": 125,
							"clef": "treble",
							"notes": [{"clef": "treble", "keys": ["c/4"], "duration": "16", "dots": 0}],
							"voices": [{"num_beats": 1, "beat_value": 4}]}; */
    return (
   		<SafeAreaView style={styles.container}>
   			<View style={styles.topContainer}>
        		<Text style={styles.welcome}>
          			Welcome to the Game!
        		</Text>
				<VexFlow musicObject = {this.state.musicObjectData} style={styles.scaler}/>
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