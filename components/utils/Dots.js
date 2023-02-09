import { View, Animated, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Dimensions } from 'react-native';

export default class Dots extends Component {

    constructor(props) {
        super(props)
    }

    myInterpolate(el, input, output) {
        return el.interpolate({
            inputRange: input,
            outputRange: output,
            extrapolate: 'clamp'
        })
    }

    render() {

        const { data, scrollX } = this.props;
        const { width } = Dimensions.get('window')

        return (
            <View style={style.container}>
                {data.length == 0
                    ? <Animated.View key={'loading_1'} style={style.dot} />
                    : data.map((_, idx) => {
                        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]
                        const dotWidth = this.myInterpolate(scrollX, inputRange, [12, 30, 12]);
                        const backgroundColor = this.myInterpolate(scrollX, inputRange, ['#ccc', '#000', '#ccc']);

                        return (
                            <Animated.View key={idx} style={[
                                style.dot,
                                { width: dotWidth, backgroundColor },
                            ]} />
                        )
                    })
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        alignSelf: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    },
})