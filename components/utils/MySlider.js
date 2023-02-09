import { View, Animated } from 'react-native'
import React, { Component } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Dots from './Dots'

export default class MySlider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scrollX: new Animated.Value(0),
        }
    }

    handleOnScroll = event => {
        Animated.event([{
            nativeEvent: {
                contentOffset: { x: this.state.scrollX }
            }
        }], { useNativeDriver: false })(event);
    }

    render() {

        const { data, renderItem, placeholder } = this.props;

        return (
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    ListEmptyComponent={placeholder}
                    keyExtractor={(item, index) => index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={this.handleOnScroll}
                    bounces={false}
                />
                <Dots
                    data={data}
                    scrollX={this.state.scrollX}
                />
            </View>
        )
    }
}
