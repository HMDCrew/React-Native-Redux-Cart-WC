import React, { Component } from "react";
import { Image } from "react-native";
//import { Image } from 'expo-image';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../../constants/style';

export default class AutoHeightImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: { uri: props.uri },
            status: true
        };
    }

    componentDidMount() {
        if (this.props.width && this.props.height) {
            this.setState({ width: this.props.width, height: this.props.height });
        } else {

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
                } else if (!this.props.width && !this.props.height) {
                    this.setState({ width: width, height: height });
                }
            });
        }
    }

    render() {

        const { source, width, height, status } = this.state;

        const blurhash =
            '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


        return (
            height > 0
                ? status
                    // ? <View style={{
                    //     flex: 1,
                    //     backgroundColor: '#fff',
                    //     alignItems: 'center',
                    //     justifyContent: 'center',
                    // }}>
                    //     <Image
                    //         style={{
                    //             flex: 1,
                    //             width: '100%',
                    //             backgroundColor: '#0553',
                    //         }}
                    //         placeholder={blurhash}
                    //         contentFit='contain'
                    //         source={source}
                    //     />
                    // </View>
                    ? <Image
                        source={source}
                        style={{ height: height, width: width, borderRadius: 12 }}
                        resizeMethod="resize"
                        loadingIndicatorSource={
                            <ShimmerPlaceHolder LinearGradient={LinearGradient} style={[styles.w_100, styles.pb_1, { height: height, borderRadius: 12 }]} />
                        }
                        onError={error => this.setState({ status: false })}
                    />
                    : <ShimmerPlaceHolder LinearGradient={LinearGradient} style={[styles.w_100, styles.pb_1, { height: height, borderRadius: 12 }]} />
                : <ShimmerPlaceHolder LinearGradient={LinearGradient} style={[styles.w_100, styles.pb_1, { height: 100, borderRadius: 12 }]} />
        );
    }
}
