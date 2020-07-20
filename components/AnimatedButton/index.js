import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Animated } from 'react-native';

export default class AnimatedButton extends Component {
    constructor(props) {
        super(props);

        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn() {
        Animated.spring(this.animatedValue, {
            toValue: .8,
            useNativeDriver: true
        }).start()
    }
    handlePressOut() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true
        }).start()
    }
    render() {
        const animatedStyle = {
            transform: [{ scale: this.animatedValue }]
        }
        console.log('hello');
        return (
            <TouchableWithoutFeedback
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                onPress={() => this.props.onPress()}
            >
                <Animated.View style={[styles.button, animatedStyle]}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#333",
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFF"
    }
});