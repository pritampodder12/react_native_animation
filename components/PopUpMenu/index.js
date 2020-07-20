import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import AnimatedButton from '../AnimatedButton';

const modalWidth = 200;
const modalHeight = 400;

const modalInitialWidth = 100;
const modalInitialHeight = 200;

const scale = 2;

export default class PopUpMenu extends React.Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.state = {
            viewState: true
        }
    }

    _animate = () => {
        if (this.state.viewState)
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start(() => this.setState({ viewState: false }));
        else
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start(() => this.setState({ viewState: true }));
    }

    render() {
        return (
            <View style={styles.container}>
                <AnimatedButton onPress={this._animate} title="Click Me" />
                <Animated.View style={{
                    ...styles.card,
                    transform: [
                        {
                            translateX: this.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-modalInitialWidth / 2, (modalWidth - modalInitialWidth) / 2]
                            })
                        },
                        {
                            translateY: this.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-modalInitialHeight / 2, (modalHeight - modalInitialHeight) / 2]
                            })
                        },
                        {
                            scale: this.animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, scale]
                            })
                        }
                    ]
                }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#dedede'
    },
    card: {
        position: 'absolute',
        top: 200,
        left: 50,
        height: modalInitialHeight,
        width: modalInitialWidth,
        elevation: 2,
        backgroundColor: 'white'
    }
});