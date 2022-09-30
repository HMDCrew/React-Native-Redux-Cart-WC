import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPayments } from '../store/features/chackoutSlice'

export class Chackout extends Component {

    componentDidMount() {
        this.props.getPayments();
    }

    render() {
        return (
            <View>
                <Text>Chackout</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        chackout: state.chackout
    };
}

const mapDispatchToProps = {
    getPayments,
}

export default connect(mapStateToProps, mapDispatchToProps)(Chackout)