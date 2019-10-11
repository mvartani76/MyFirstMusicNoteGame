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
  View
} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;
    const screenWidth = Dimensions.get('window').width;

    let musicObjectData = { "stave_width": screenWidth / 5,
              "stave_x_start": 2 * screenWidth / 5,
              "stave_y_start": 125,
              "clef": "treble",
              "notes": [{"clef": "treble", "keys": ["c/4"], "duration": "q"}],
              "voices": [{"num_beats": 1, "beat_value": 4}]};

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Music Note Game
        </Text>
        <VexFlow musicObject = {musicObjectData} style={styles.scaler}/>
        <View style={styles.buttonGroupStyle}>
          <TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Game', {name: 'Jane'})}>
            <Text style={styles.buttonTextStyle}>Choose Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyles} onPress={() => navigate('Game', {name: 'Jane'})}>
            <Text style={styles.buttonTextStyle}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  welcome: {
    fontFamily: "GoodDog Plain",
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonGroupStyle: {
    flex: 1,
    width: "80%",
  },
  buttonStyles: {
    justifyContent: 'center',
    borderRadius: 5,
    height: 50,
    
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
  scaler: {
    transform: [{scaleX: 2.5}, {scaleY: 4.0}],
  },
});