import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'

import { styles, COLORS } from '../../constants/style'

export class ChackoutInput extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { name, value, missingOrderField } = this.props;

        const keyboardType = (
            name.indexOf('phone') > -1 ? "numeric" :
                (name.indexOf('email') > -1 ? "email-address" : "default")
        )

        return (
            <View
                style={[
                    styles.my_1, styles.px_1, styles.py_2, styles.w_100, styles.bg_white,
                    {
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }
                ]}
            >
                <TextInput
                    onChangeText={value => this.props.onChangeText(value)}
                    placeholder={value.label}
                    value={value}
                    style={[
                        styles.w_100,
                        {
                            backgroundColor: 'white',
                            color: COLORS.primary,
                        }
                    ]}
                    cursorColor={COLORS.primary}
                    keyboardType={keyboardType}
                />
                {missingOrderField.length && missingOrderField.indexOf(name) > -1 ? <Text style={{ color: missingOrderField.indexOf(name) > -1 ? COLORS.red : COLORS.primary }}>is required</Text> : ''}
            </View>
        )
    }
}

export default ChackoutInput