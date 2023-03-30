import { View, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';

import { styles } from '../../constants/style'

export default class ChackoutSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            screen_width: Dimensions.get('window').width,
        }
    }

    render() {
        return (
            <View
                style={[styles.my_1, styles.px_2, { width: this.state.screen_width }]}
            >
                <SelectList
                    setSelected={value => this.props.setSelected(value)}
                    data={this.props.data}
                    placeholder={this.props.placeholder}
                    defaultOption={this.props.defaultOption}
                    boxStyles={[styles.bg_white, styles.border_0, styles.py_2, styles.px_1, { borderRadius: 0 }]}
                    dropdownStyles={styles.border_0}
                />
            </View>
        )
    }
}