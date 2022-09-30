import React, { Component } from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

export default class Details extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => navigation.navigate('Home')}
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
