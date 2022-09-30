import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

export default class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text>Settings Screen</Text>
                <Button
                    title="Go to Profile"
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});