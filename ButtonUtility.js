import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

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
  }

  render() {
    return (
      <View style={this.props.viewStyle}>
        {
          this.props.object.map((item, index) => {
            return (
              <View key={index} style={this.props.viewStyle}>
                <TouchableOpacity style={this.props.buttonStyle} onPress={item.func}>
                  <Text style={this.props.textStyle}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    );
  }
}