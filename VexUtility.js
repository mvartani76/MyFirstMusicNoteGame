import React, { Component } from 'react';
import { Accidental } from 'vexflow/src/accidental';
import { Stave } from 'vexflow/src/stave';
import { StaveNote } from 'vexflow/src/stavenote';
import { Voice } from 'vexflow/src/voice';
import { Formatter } from 'vexflow/src/formatter';
import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { Dimensions } from 'react-native';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

export function runVexFlowCode(context, obj) {

    const stave_width = obj.stave_width;
    const stave_x_start = obj.stave_x_start;
    const stave_y_start = obj.stave_y_start;

    const stave = new Stave(obj.stave_x_start, obj.stave_y_start, obj.stave_width,
        {fill_style: 'black', num_lines: obj.num_lines, left_bar: obj.left_bar, right_bar: obj.right_bar});
    stave.setContext(context);

    // In order to display the rhythms and symbols without a clef, need to check the clef input
    // If not treble/bass, still need to set the input as treble to correctly draw the note
    if ((obj.clef == "treble") || (obj.clef == "bass")) {
        stave.setClef(obj.clef);
    } else {
		obj.notes[0].clef = "treble";
    }
    stave.draw();

    const notes = [
		new StaveNote({clef: obj.notes[0].clef, keys: obj.notes[0].keys, duration: obj.notes[0].duration, auto_stem: true })
	];

    if (obj.notes[0].dots > 0) {
        notes[0].addDotToAll();
    }

    const voice = new Voice({num_beats: obj.voices[0].num_beats, beat_value: obj.voices[0].beat_value});

    // Set the Voice mode to SOFT(2) so the ticks can be added without restrictions.
    // For example we do not need to have the num beats = 2 if we want to add one half note
    voice.setMode(2);
    voice.addTickables(notes);

    const formatter = new Formatter().joinVoices([voice]).formatToStave([voice], stave);
    voice.draw(context, stave);

    console.log(obj);
  }

export class VexFlow extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;

        const context = new ReactNativeSVGContext(NotoFontPack, { width: screenWidth, height: screenHeight/2});
        runVexFlowCode(context, this.props.musicObject);

        return (

            <View style={this.props.outerStyle}>
                <View style={this.props.innerStyle}>
                    <View style={this.props.style}>
                        { context.render() }
                    </View>
                </View>
            </View>
        );
    }
}