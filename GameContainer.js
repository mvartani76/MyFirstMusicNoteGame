/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {name as appName} from './app.json';
import { Accidental } from 'vexflow/src/accidental';
import { Stave } from 'vexflow/src/stave';
import { StaveNote } from 'vexflow/src/stavenote';
import { Voice } from 'vexflow/src/voice';
import { Formatter } from 'vexflow/src/formatter';
import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { Dimensions, TouchableOpacity } from 'react-native';

import { Button } from 'react-native-elements';
import { VexFlow } from './VexUtility.js';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	SafeAreaView
} from 'react-native';

export default class GameContainer extends Component {
	mode = JSON.stringify(this.props.navigation.getParam('mode','game')).replace(/\"/g, "");
	constructor(props) {
		super(props);

		const screenWidth = Dimensions.get('window').width;
		this.state = {
			musicObjectData: {	"stave_width": screenWidth / 5,
								"stave_x_start": 2 * screenWidth / 5,
								"stave_y_start": 125,
								"clef": "treble",
								"notes": [{"clef": "treble", "keys": ["c/4"], "duration": "q", "dots": 0}],
								"voices": [{"num_beats": 1, "beat_value": 4}]}
		}
	}

	render() {
	    const {navigate} = this.props.navigation;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.topContainer}>
					<View style={styles.topTextView}>
						<Text style={styles.welcome}>
							Music Note {this.mode}
						</Text>
					</View>
					{/* In order to prevent scaling overlapping other divs/components, need to have two parent views
					    surrounding the Vexflow Component. */}
					<VexFlow
						musicObject = {this.state.musicObjectData}
						outerStyle={styles.outerVexFlowContainer}
						innerStyle={styles.innerVexFlowContainer}
						style={styles.scaler}/>
				</View>
				<View style={styles.buttonGroupStyle}>
					<TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Game', {clef: 'treble', mode: this.mode})}>
						<Text style={styles.buttonTextStyle}>Treble Notes</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Game', {clef: 'bass', mode: this.mode})}>
						<Text style={styles.buttonTextStyle}>Bass Notes</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('PickerGame', {clef: 'treble', mode: this.mode})}>
						<Text style={styles.buttonTextStyle}>Rhythms</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('PickerGame', {clef: 'bass', mode: this.mode})}>
						<Text style={styles.buttonTextStyle}>Symbols</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
  	topContainer: {
		flex: 0.7,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'red',
	},
	welcome: {
		fontFamily: "GoodDog Plain",
		fontSize: 50,
		textAlign: 'center',
		margin: 10,
	},
	buttonGroupStyle: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
		width: "80%",
		backgroundColor: 'pink',
	},
	buttonStyles: {
		flex: 2,
		justifyContent: 'center',
		borderRadius: 5,
		alignSelf: 'stretch',
		margin: 5,
		backgroundColor: "red",
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 3.8,
		shadowOffset: {
			width: 0,
			height: 2,
		},
	},
	buttonTextStyle: {
		fontFamily: "GoodDog Plain",
		fontSize: 30,
		textAlign: 'center',
		color: "white",
	},
  	topTextView: {
		flex: 0.2,
		width: "100%",
		backgroundColor: "aliceblue",
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