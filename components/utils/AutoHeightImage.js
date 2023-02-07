import React, { Component } from "react";
import { Image } from "react-native";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../../constants/style';
import { View } from "react-native-web";

export default class AutoHeightImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: { uri: props.uri },
        };
    }

    componentDidMount() {
        Image.getSize(this.props.uri, (width, height) => {
            if (this.props.width && !this.props.height) {
                this.setState({
                    width: this.props.width,
                    height: height * (this.props.width / width)
                });
            } else if (!this.props.width && this.props.height) {
                this.setState({
                    width: width * (this.props.height / height),
                    height: this.props.height
                });
            } else {
                this.setState({ width: width, height: height });
            }
        });
    }

    render() {

        const { source, width, height } = this.state;

        return (
            height > 0
                ? <Image
                    source={source}
                    style={{ height: height, width: width, borderRadius: 12 }}
                    loadingIndicatorSource={
                        <ShimmerPlaceHolder LinearGradient={LinearGradient} style={[styles.w_100, styles.pb_1, { height: 100, borderRadius: 12 }]} />
                    }
                />
                : <ShimmerPlaceHolder LinearGradient={LinearGradient} style={[styles.w_100, styles.pb_1, { height: 100, borderRadius: 12 }]} />
        );
    }
}
