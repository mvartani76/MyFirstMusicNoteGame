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

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ReactNativeVexFlow extends Component {
  constructor(props) {
    super(props);
  }

  runVexFlowCode(context) {

    const screenWidth = Dimensions.get('window').width;
    const stave_width = screenWidth / 5;
    const stave_x_start = 2 * stave_width


    const stave = new Stave(stave_x_start, 125, stave_width);
    stave.setContext(context);
    stave.setClef('treble');
    stave.draw();

    const notes = [
      new StaveNote({clef: "treble", keys: ["c/4"], duration: "q" })
    ];

    const voice = new Voice({num_beats: 1,  beat_value: 4});
    voice.addTickables(notes);

    const formatter = new Formatter().joinVoices([voice]).formatToStave([voice], stave);
    voice.draw(context, stave);
  }

  render() {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const context = new ReactNativeSVGContext(NotoFontPack, { width: screenWidth, height: screenHeight/2});
    this.runVexFlowCode(context);



    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Music Note Game
        </Text>
        <View style={styles.scaler}>
        { context.render() }
        </View>
        <Button
          title="Button"
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