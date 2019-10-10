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
import { Dimensions } from 'react-native';

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
        <Button
          title="Button" onPress={() => navigate('Game', {name: 'Jane'})}
        />
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
  scaler: {
    transform: [{scaleX: 2.5}, {scaleY: 4.0}],
  },
});