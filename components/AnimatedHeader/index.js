import React, { useState } from 'react';
import { AppRegistry, Text, View, StyleSheet, Platform, StatusBar, } from 'react-native';
import Animated from 'react-native-reanimated';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 115 : 70 + StatusBar.currentHeight;

function AnimatedHeader() {
    const scrollY = new Animated.Value(0);
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
    const headerY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT]
    })
    const array = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])[0];
    return (
        <View style={styles.container} >
            <Animated.View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: HEADER_HEIGHT, backgroundColor: 'grey', zIndex: 1000, elevation: 1000, transform: [{ translateY: headerY }], alignItems: 'center', justifyContent: 'center', paddingTop: 45 }}>
                <Text>Animated Header</Text>
            </Animated.View>
            <Animated.ScrollView
                bounces={false}
                scrollEventThrottle={16}
                style={{ paddingTop: HEADER_HEIGHT }}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { y: scrollY } }
                    }
                ])}
            >
                {
                    array.map((item, key) =>
                        (
                            <View key={key} style={styles.item}>
                                <Text style={styles.itemText}>Row No : {item}</Text>
                            </View>
                        ))
                }
            </Animated.ScrollView>


            {/* {
                        this.array.map((item, key) =>
                            (
                                <View key={key} style={styles.item}>
                                    <Text style={styles.itemText}>Row No : {item}</Text>
                                </View>
                            ))
                    } */}

        </View>
    );

}

export default AnimatedHeader;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,

        },


        item: {
            backgroundColor: '#ff9e80',
            margin: 8,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        itemText: {
            color: 'black',
            fontSize: 16
        }

    });