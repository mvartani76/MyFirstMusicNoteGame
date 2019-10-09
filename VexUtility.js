import { Accidental } from 'vexflow/src/accidental';
import { Stave } from 'vexflow/src/stave';
import { StaveNote } from 'vexflow/src/stavenote';
import { Voice } from 'vexflow/src/voice';
import { Formatter } from 'vexflow/src/formatter';
import { Dimensions } from 'react-native';

export function runVexFlowCode(context) {

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