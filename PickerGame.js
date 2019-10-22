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
import { Dimensions, TouchableOpacity } from 'react-native';

import { VexFlow } from './VexUtility.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Picker,
  YellowBox,
} from 'react-native';
YellowBox.ignoreWarnings(['-[RCTRootView cancelTouches]']);
export default class PickerGame extends Component {

	_isMounted = false;
	timeout1 = setTimeout(()=> {},0);
	timeout2 = setTimeout(()=> {},0);
	mode = JSON.stringify(this.props.navigation.getParam('mode','game')).replace(/\"/g, "").toLowerCase();

	noteValues = ["a/4", "b/4", "c/4", "d/4", "e/4", "f/4", "g/4", "a/5"];

	trebleNoteValues = ["e/4", "f/4", "g/4", "a/4", "b/4", "c/5", "d/5", "e/5", "f/5", "g/5"];
	bassNoteValues = ["g/2", "a/2", "b/2", "c/3", "d/3", "e/3", "f/3", "g/3", "a/3"];
	trebleClefOctaves = ["/4", "/5"];
	bassClefOctaves = ["/2", "/3"];
	// Duration Labels needs to be aligned with durationValues
	durationLabels =	["sixteenth note", "dotted 16th note", "eighth note", "dotted 8th note",
						 "quarter note", "dotted quarter note", "half note", "dotted half note",
						 "whole note"];
	// Duration Values for the dotted notes are just place holders
	// durationValues needs to be aligned with durationLabels
	durationValues = ["16", "dot", "8", "dot", "4", "dot", "2", "dot", "1"];

	clef_value = JSON.stringify(this.props.navigation.getParam('clef','treble')).replace(/\"/g, "");

	constructor(props) {
		super(props);
		const screenWidth = Dimensions.get('window').width;
		this.randomNoteCreate(this.durationValues, this.noteValues);

	    this.state = {
			message: "",
			rhythmValue: 3,
			durationValue: 1,
			timerActive: false,
			disableClick: false,
			status: true,
			correct: false,
			musicObjectData: {	"stave_width": screenWidth / 5,
								"stave_x_start": 0.43 * screenWidth,
								"stave_y_start": 125,
								"clef": this.clef_value,
								"num_lines" : 0,
								"left_bar": false, "right_bar": false,
								"notes": [{"clef": this.clef_value, "keys": ["g/4"], "duration": this.durationValues[this.randomDurationIndex], "dots": this.randomDot}],
								"voices": [{"num_beats": 1, "beat_value": 4}]}
		}
	}

	updateValue = (value) => {
		const screenWidth = Dimensions.get('window').width;
		console.log(value);
		this.setState({rhythmValue: value});
		this.setState({durationValue: value});
	}

	componentDidMount = () => {
		this._isMounted = true;
		this.setState({message:"Component Mounted"});
    }

	handleClick = (value) => {
		const screenWidth = Dimensions.get('window').width;

		// Only allow the button handler to operate if enabled
		if (this.state.disableClick == false) {
			// Disable further button clicks until note is displayed
			this.setState({disableClick: true});
			if (this.mode == "game") {
				this.setState({timerActive:true});
				this.timeout = setTimeout(() => {this._isMounted && this.displayNoteAndTimer(screenWidth, value)}, 3000);
				console.log("test");
				console.log(value);
				console.log(this.randomDuration);


				this.setState({answered: true});
				if (value == this.randomDuration) {
					console.log("correct");
					this.setState({status: false});
					this.setState({correct: true});
				} else {
					console.log("incorrect");
					this.setState({correct: false});
				}
			}
			else {
				this.timeout = setTimeout(() => {this._isMounted && this.displayNoteAndTimer(screenWidth, value)}, 500);
			}
		}
		
	}

	randomNoteCreate(durationValues, noteValues) {
		this.randomDuration = Math.floor(Math.random()*durationValues.length);
		this.randomNoteIndex = Math.floor(Math.random()*noteValues.length);
		this.randomNote = this.noteValues[this.randomNoteIndex];
		if (this.durationValues[this.randomDuration] == "dot") {
			this.randomDurationIndex = this.randomDuration - 1;
			this.randomDot = 1;
		}
		else {
			this.randomDurationIndex = this.randomDuration;
			this.randomDot = 0;
		}

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

    displayNoteAndTimer(screenWidth, value) {
		this.randomNoteCreate(this.durationValues, this.noteValues);
		/* Set the note to the button label if in practice mode
		if (this.mode == "practice") {
			if (this.clef_value == 'treble') {
				this.randomNote = note + this.randomOctaveCreateAndMatch(note, this.trebleClefOctaves, this.trebleNoteValues);
			} else {
				this.randomNote = note + this.randomOctaveCreateAndMatch(note, this.bassClefOctaves, this.bassNoteValues);
			}
		}*/
		this.setState({timerActive:false});

		this.setState(
			{ musicObjectData:
				{
					"stave_width": screenWidth / 5,
					"stave_x_start": 0.43 * screenWidth,
					"stave_y_start": 125,
					"clef": this.clef_value,
					"notes": [{"clef": this.clef_value, "keys": ["g/4"], "duration": this.durationValues[this.randomDurationIndex], "dots": this.randomDot}],
					"voices": [{"num_beats": 1, "beat_value": 4}]
				}
			}
		);
		
		// Enable button clicks
		this.setState({disableClick: false});
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

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.topContainer}>
					<View style={styles.topTextView}>
						<Text style={styles.welcome}>
							{this.clef_value == "rhythm" ? "Rhythms" : "Symbols"}!
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
					<Picker
						mode="dialog"
						style={styles.onePicker}
						itemStyle={styles.onePickerItem}
						selectedValue = {this.state.durationValue}
						onValueChange = {this.updateValue}>
							{this.durationLabels.map((item, index) => {
   								return (<Picker.Item label={item} value={index} key={index} />);
							})} 
					</Picker>
					<View style={styles.bottomButtonContainer}>
						<TouchableOpacity style={styles.bottomButtonView} onPress={() => this.handleClick(this.state.durationValue)}>
							<Text style={styles.buttonTextStyle}>{this.durationLabels[this.state.durationValue]}</Text>
						</TouchableOpacity>
					</View>
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'lightgray',
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
	pickerText: {
		color: 'black',
		fontSize: 20,
	},
	pickerStyles: {
		flex: 0.5,
		height: "60%",
		width: 200,
		alignSelf: 'center',
		justifyContent: 'space-around',
	},
	onePicker: {
		flex: 0.5,
		width: "50%",
		height: 44,
		alignSelf: 'center',
		justifyContent: 'center',
		backgroundColor: 'greenyellow',
	},
	onePickerItem: {
		height: 44,
		color: 'red',
	},
	bottomButtonContainer: {
		flex: 0.5,
	},
	bottomButtonView: {
		alignSelf: 'center',
		backgroundColor: 'red',
		width: "80%",
		borderRadius: 5,
	},
	buttonTextStyle: {
		fontFamily: "GoodDog Plain",
		fontSize: 30,
		textAlign: 'center',
		color: "white",
	},
	scaler: {
		overflow: "hidden",
		backgroundColor: 'purple',
		transform: [{scaleX: 2.5}, {scaleY: 4.0}, {translateX: "0%"}, {translateY: "17%"}],
	},
});