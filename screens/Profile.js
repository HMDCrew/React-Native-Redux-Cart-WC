import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

export default class Profile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text>Profile Screen</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
