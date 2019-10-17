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
	_isMounted = false;
	timeout1 = setTimeout(()=> {},0);
	timeout2 = setTimeout(()=> {},0);
	mode = JSON.stringify(this.props.navigation.getParam('mode','game')).replace(/\"/g, "").toLowerCase();
	durationValues = ["1","2","4","8","16"];

	noteValues = ["a/4", "b/4", "c/4", "d/4", "e/4", "f/4", "g/4", "a/5"];

	trebleNoteValues = ["e/4", "f/4", "g/4", "a/4", "b/4", "c/5", "d/5", "e/5", "f/5", "g/5"];
	bassNoteValues = ["g/2", "a/2", "b/2", "c/3", "d/3", "e/3", "f/3", "g/3", "a/3"];
	trebleClefOctaves = ["/4", "/5"];
	bassClefOctaves = ["/2", "/3"];

	clef_value = JSON.stringify(this.props.navigation.getParam('clef','treble')).replace(/\"/g, "");

	constructor(props) {
		super(props);
		const screenWidth = Dimensions.get('window').width;

		// Set noteValues array based on clef
		if (this.clef_value == 'treble') {
			this.noteValues = this.trebleNoteValues;
		} else if (this.clef_value == 'bass') {
			this.noteValues = this.bassNoteValues;
		}

		this.randomNoteCreate(this.durationValues, this.noteValues);

	    this.state = {
			message:"",
			timerActive:false,
			status:true,
			correct: false,
			musicObjectData: {	"stave_width": screenWidth / 5,
								"stave_x_start": 2 * screenWidth / 5,
								"stave_y_start": 125,
								"clef": this.clef_value,
								"notes": [{"clef": this.clef_value, "keys": [this.randomNote], "duration": this.durationValues[0], "dots": 0}],
								"voices": [{"num_beats": 1, "beat_value": 4}]}
		}
	}

	componentDidMount = () => {
		this._isMounted = true;
		this.setState({message:"Component Mounted"});
    }

	handleClick = (buttonLabel) => {
		const screenWidth = Dimensions.get('window').width;
		if (this.mode == "game") {
			this.setState({timerActive:true});
			this.timeout = setTimeout(() => {this._isMounted && this.displayNoteAndTimer(screenWidth, buttonLabel)}, 3000);

			this.setState({answered: true});
			if (buttonLabel == this.randomNote.replace(/[/]|[0-9]/g, "").toLowerCase()) {
				console.log("correct");
				this.setState({status: false});
				this.setState({correct: true});
			} else {
				console.log("incorrect");
				this.setState({correct: false});
			}
		}
		else {
			this.timeout = setTimeout(() => {this._isMounted && this.displayNoteAndTimer(screenWidth, buttonLabel)}, 500);
		}
	}

	randomNoteCreate(durationValues, noteValues) {
		this.randomDuration = Math.floor(Math.random()*durationValues.length);
		this.randomNoteIndex = Math.floor(Math.random()*noteValues.length);
		this.randomNote = this.noteValues[this.randomNoteIndex];
	}

	randomOctaveCreateAndMatch(note, clefArray, notesArray) {
		// Since we do not want the outlier notes way above/below the clefs,
		// make sure the note with random octave exists in array to display
		do {
			octave = clefArray[Math.floor(Math.random()*clefArray.length)];
			noteOctave = note + octave;
		} while (!notesArray.includes(noteOctave));
		return octave;
	}

    displayNoteAndTimer(screenWidth, note) {
		this.randomNoteCreate(this.durationValues, this.noteValues);
		// Set the note to the button label if in practice mode
		if (this.mode == "practice") {
			if (this.clef_value == 'treble') {
				this.randomNote = note + this.randomOctaveCreateAndMatch(note, this.trebleClefOctaves, this.trebleNoteValues);
			} else {
				this.randomNote = note + this.randomOctaveCreateAndMatch(note, this.bassClefOctaves, this.bassNoteValues);
			}
		}
		this.setState({timerActive:false});
		this.setState(
			{ musicObjectData:
				{
					"stave_width": screenWidth / 5,
					"stave_x_start": 2 * screenWidth / 5,
					"stave_y_start": 125,
					"clef": this.clef_value,
					"notes": [{"clef": this.clef_value, "keys": [this.randomNote], "duration": this.durationValues[this.randomDuration], "dots": 0}],
					"voices": [{"num_beats": 1, "beat_value": 4}]
				}
			}
		);
    }

    // Clear timers when component unmounts
    componentWillUnmount = () => {
		this._isMounted = false;
		clearTimeout(this.timeout1);
		clearTimeout(this.timeout2);
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
					<View style={styles.topTextView}>
						<Text style={styles.welcome}>
							{this.clef_value == "treble" ? "Treble Notes" : "Bass Notes"}!
						</Text>
					</View>
					{/* In order to prevent scaling overlapping other divs/components, need to have two parent views
						surrounding the Vexflow Component. */}
					<VexFlow
						musicObject = {this.state.musicObjectData}
						outerStyle={styles.outerVexFlowContainer}
						innerStyle={styles.innerVexFlowContainer}
						style={styles.scaler}/>
					<View style={styles.bottomTextView}>
						{this.state.correct && this.state.timerActive && <Text style={styles.answerText}>Correct</Text>}
						{!this.state.correct && this.state.timerActive && <Text style={styles.answerText}>Incorrect</Text>}
						{!this.state.timerActive && <Text style={styles.answerText}></Text>}
					</View>
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
		flexDirection: 'column',
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
	topTextView: {
		flex: 0.2,
		width: "100%",
		backgroundColor: "aliceblue",
	},
	bottomTextView: {
		flex: 0.1,
		alignItems: 'stretch',
		backgroundColor: 'yellow',
		width: "100%",
	},
	answerText: {
		backgroundColor: 'cyan',
		fontFamily: "GoodDog Plain",
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
	},
	innerVexFlowContainer: {
		height: "80%",
		backgroundColor: "darkcyan",
		justifyContent: "center",
		overflow: "hidden",
	},
	outerVexFlowContainer: {
		overflow: "hidden",
		justifyContent: "center",
		flex: 0.7,
		backgroundColor: "darkblue",
	},
	scaler: {
		overflow: "hidden",
		backgroundColor: 'purple',
		transform: [{scaleX: 2.5}, {scaleY: 4.0}, {translateX: "0%"}, {translateY: "17%"}],
	},
});