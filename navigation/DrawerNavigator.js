import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import SidebarContent from '../components/navigations/SidebarContent';
import { COLORS } from '../constants/style';

import Home from '../screens/Home'
import Auth from '../screens/Auth'
import Cart from '../screens/Cart'
import Chackout from '../screens/Chackout'
import Payment from '../screens/Payment'

import Stack from './Stack';

export class DrawerNavigator extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const Drawer = createDrawerNavigator();

        return (
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: COLORS.secondary,
                    drawerActiveTintColor: COLORS.white,
                    drawerInactiveTintColor: COLORS.white,
                }}
                initialRouteName="Auth"
                drawerContent={props => <SidebarContent {...props} />}
            >
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Auth" component={Auth} />
                <Drawer.Screen name="Cart" component={Cart} />
                <Drawer.Screen name="Chackout" component={Chackout} />
                <Drawer.Screen name="Payment" component={Payment} />

                {/* don't use stack on first position because is used for nested store and product */}
                <Drawer.Screen name="STACK" component={Stack} options={{
                    drawerItemStyle: { height: 0 }
                }} />

            </Drawer.Navigator>
        )
    }
}

export default DrawerNavigator