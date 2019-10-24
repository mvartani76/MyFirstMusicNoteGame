import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Animated,
	Easing
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
				{this.props.object.map((item, index) => {
					return (
						<View key={index} style={this.props.viewStyle}>
							<TouchableOpacity style={this.props.buttonStyle} onPress={item.func}>
								<Text style={this.props.textStyle}>{item.title}</Text>
							</TouchableOpacity>
						</View>
					)
				})}
			</View>
		);
	}
}

export class AnimatedButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			animated:new Animated.Value(0)
		}
	}

	animateButton(value, duration){
		Animated.timing(this.state.animated,{
			toValue: value,
			duration: duration,
			easing: Easing.elastic(1.5),
		}).start();
	}

	// This handleClick has parameters passed in so needed to be changed from LetterButton variant
	handleClick = () => {
		this.props.func(this.props.navigation, this.props.value['page'],this.props.value['clef'],this.props.value['mode'])
	}

	componentDidMount() {
		this.animateButton(1, 500);

		// Add event listener for when the screen comes in focus
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => {
				this.animateButton(1, 500);
			}
		);
		// Add event listener for when the screen goes out of focus
		this.willBlurSubscription = this.props.navigation.addListener(
			'willBlur',
			() => {
				this.animateButton(0, 10);
			}
		);
	}

	componentWillUnMount() {
		this.animateButton(0, 10);
	}

	render() {

		return (
			<TouchableOpacity style={this.props.buttonStyle} onPress={this.handleClick}>
				<Animated.View style={	[this.props.animatedStyle,
										{transform: [{  scale: this.state.animated.interpolate({
											inputRange: [0,1],
											outputRange: [0,1]})
											}]}
									]}>
					<Text style={this.props.buttonTextStyle}>{this.props.text}</Text>
				</Animated.View>
			</TouchableOpacity>
		)
	}
}