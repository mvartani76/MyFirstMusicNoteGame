import React, { Component } from 'react';
import { Button } from 'react-native-elements';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class LetterButton extends Component {
  constructor(props) {
    super(props);

 }

  handleClick = () => {
    // Need to check to prevent null exception. 
    this.props.onPress?.(); // Same as this.props.onPress && this.props.onPress();
    //console.log(index);
  }

  render() {
    return (
      <View>
        {
          this.props.title.map((item, index) => {
          return <Button key={index} title={item.title} style={this.props.buttonStyle} onPress={ item.func }/> })
        }
      </View>
    );
  }
}