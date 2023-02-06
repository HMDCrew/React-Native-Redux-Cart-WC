import React, { Component, PropTypes } from "react";
import { Image } from "react-native";

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

        //console.log(this.state.height, this.state.width)

        return (
            <Image
                source={this.state.source}
                style={{ height: this.state.height, width: this.state.width, borderRadius: 12 }}
            />
        );
    }
}

// AutoHeightImage.propTypes = {
//     uri: AutoHeightImage.string.isRequired,
//     width: AutoHeightImage.number,
//     height: AutoHeightImage.number
// };
