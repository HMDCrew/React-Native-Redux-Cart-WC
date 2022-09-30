import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Store from '../screens/Store'
import Product from '../screens/Product'

export class Stack extends Component {
  render() {

    const Stack = createStackNavigator();

    return (

      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>

    )
  }
}

export default Stack