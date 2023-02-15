import { Text, ScrollView, View, RefreshControl } from 'react-native'
import React, { Component } from 'react'
import { Button } from '@react-native-material/core'

import { connect } from 'react-redux'

import { styles, COLORS } from '../constants/style'
import Header from '../components/Header'
import ProductCart from '../components/cart/Product'

import { getCart, updateCart } from '../store/features/cartSlice'

export class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            shown: false,
            refresh: false,
        }
    }

    componentDidMount() {
        const { cart, isLoading } = this.props.cart;

        if (!isLoading && !cart.length) {
            this.props.getCart();
        }
    }

    render() {

        const { navigation } = this.props;
        const { cart, isLoading } = this.props.cart;

        return (
            <View style={[styles.d_flex, styles.bg_light]}>
                <Header {...this.props} />

                <ScrollView
                    style={{
                        marginBottom: 80,
                        paddingBottom: 50,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={() => {
                                this.props.getCart()
                            }}
                        />
                    }
                >
                    {
                        cart.length >= 1 ?
                            cart.map((item, index) => <ProductCart key={index} item={item} />)
                            :
                            <Text>No products in cart</Text>
                    }
                </ScrollView>

                {
                    !isLoading && cart.length >= 1 ?
                        <Button
                            title="Cackout"
                            color={COLORS.primary}
                            contentContainerStyle={styles.h_100}
                            onPress={() => {
                                this.props.updateCart(cart)
                                navigation.navigate('Chackout')
                            }}
                            style={{
                                alignSelf: 'center',
                                position: 'absolute',
                                zIndex: 50,
                                height: 60,
                                bottom: 10,
                                width: '90%',
                                borderRadius: 0,
                            }}
                        />
                        : null
                }
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
}

const mapDispatchToProps = { getCart, updateCart }

export default connect(mapStateToProps, mapDispatchToProps)(Cart)