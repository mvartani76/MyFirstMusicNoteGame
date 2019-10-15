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
	noteValues = ["a","b","c","d","e","f","g"];
	clef_value = JSON.stringify(this.props.navigation.getParam('clef','treble')).replace(/\"/g, "");

  constructor(props) {
    super(props);
    const screenWidth = Dimensions.get('window').width;

    this.randomNoteCreate(this.durationValues, this.noteValues);

    this.state = {
     timerActive:false,
     status:true,
     correct: false,
     musicObjectData: {	"stave_width": screenWidth / 5,
							"stave_x_start": 2 * screenWidth / 5,
							"stave_y_start": 125,
							"clef": this.clef_value,
							"notes": [{"clef": this.clef_value, "keys": [this.randomNote+"/4"], "duration": this.durationValues[0], "dots": 0}],
							"voices": [{"num_beats": 1, "beat_value": 4}]}
   }
 }

   handleClick = (buttonLabel) => {
	const screenWidth = Dimensions.get('window').width;
	this.setState({timerActive:true});
    const timer = setTimeout(() => this.displayNoteAndTimer(screenWidth), 3000);

	this.setState({answered: true});
        if (buttonLabel == this.randomNote.toLowerCase()) {
        	console.log("correct");
			this.setState({status: false});
			this.setState({correct: true});
        } else {
			console.log("incorrect");
			this.setState({correct: false});
        }
    }

    randomNoteCreate(durationValues, noteValues) {
		this.randomDuration = Math.floor(Math.random()*durationValues.length);
		this.randomNoteIndex = Math.floor(Math.random()*noteValues.length);
		this.randomNote = this.noteValues[this.randomNoteIndex];
    }

    displayNoteAndTimer(screenWidth) {
		this.randomNoteCreate(this.durationValues, this.noteValues);
		this.setState({timerActive:false});
		this.setState(
			{ musicObjectData:
				{
					"stave_width": screenWidth / 5,
					"stave_x_start": 2 * screenWidth / 5,
					"stave_y_start": 125,
					"clef": this.clef_value,
					"notes": [{"clef": this.clef_value, "keys": [this.randomNote+"/4"], "duration": this.durationValues[this.randomDuration], "dots": 0}],
					"voices": [{"num_beats": 1, "beat_value": 4}]
				}
			}
		);
    }

  render() {
    const {navigate} = this.props.navigation;
    const screenWidth = Dimensions.get('window').width;

    let objectData1 = [ {title: "A", func: () => this.handleClick("a")},
						{title: "B", func: () => this.handleClick("b")},
						{title: "C", func: () => this.handleClick("c")},
						{title: "D", func: () => this.handleClick("d")}];

    let objectData2 = [ {title: "E", func: () => this.handleClick("e")},
						{title: "F", func: () => this.handleClick("f")},
						{title: "G", func: () => this.handleClick("g")}];

    return (
   		<SafeAreaView style={styles.container}>
   			<View style={styles.topContainer}>
        		<Text style={styles.welcome}>
					{this.clef_value == "treble" ? "Treble Notes" : "Bass Notes"}!
        		</Text>
				<VexFlow musicObject = {this.state.musicObjectData} style={styles.scaler}/>
				{this.state.correct && this.state.timerActive && <Text style={styles.answerText}>Correct</Text>}
				{!this.state.correct && this.state.timerActive && <Text style={styles.answerText}>Incorrect</Text>}
				{!this.state.timerActive && <Text style={styles.answerText}></Text>}
        	</View>
        	<View style={styles.bottomContainer}>
	        	<LetterButton object={objectData1} viewStyle={styles.tempContainer1} viewStyle={styles.vContainer} buttonStyle={styles.bContainer} textStyle={styles.tContainer}/>
				<LetterButton object={objectData2} viewStyle={styles.tempContainer2} viewStyle={styles.vContainer} buttonStyle={styles.bContainer} textStyle={styles.tContainer}/>
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
  answerText: {
	flex: 0.5,
	fontFamily: "GoodDog Plain",
	fontSize: 30,
	textAlign: 'center',
	margin: 10,
  },
  scaler: {
    transform: [{scaleX: 2.5}, {scaleY: 4.0}],
  },
});