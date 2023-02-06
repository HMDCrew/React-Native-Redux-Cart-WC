import React, { Component } from 'react'
import * as Font from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import DrawerNavigator from './DrawerNavigator'

const themeFonts = {
    BarlowRegular: require("../assets/fonts/ttf/Barlow-Regular.ttf"),
    BarlowMedium: require("../assets/fonts/ttf/Barlow-Medium.ttf"),
    BarlowSemiBold: require("../assets/fonts/ttf/Barlow-SemiBold.ttf"),
    BarlowBold: require("../assets/fonts/ttf/Barlow-Bold.ttf"),
};

export default class AppNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: {
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: "transparent"
                },
            },
            fontsLoaded: false,
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(themeFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync()
    }

    render() {

        if (!this.state.fontsLoaded) {
            return null;
        }

        return (
            <NavigationContainer theme={this.state.theme}>
                <DrawerNavigator />
            </NavigationContainer>
        );
    };
}
