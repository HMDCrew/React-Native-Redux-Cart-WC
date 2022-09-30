import React, { Component } from 'react'
import { Text, Image } from 'react-native'
import { AppBar, HStack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux'

import { COLORS, styles, assets } from '../constants/style'
import { getCart } from '../store/REST/api';


export class Header extends Component {

    componentDidMount(){
        this.props.getCart();
    }

    render() {

        const { navigation, cart } = this.props;

        return (
            <AppBar
                title={
                    <Image
                        style={[styles.mt_3, { width: 130 }]}
                        source={assets.logo}
                        resizeMode='contain'
                    />
                }
                style={[styles.pb_1, { height: 100, justifyContent: 'flex-end' }]}
                color={COLORS.primary}
                leading={props => (
                    <IconButton
                        icon={props => <Icon name="menu" {...props} />}
                        onPress={() => navigation.openDrawer()}
                        {...props}
                    />
                )}
                trailing={props => (
                    <HStack style={[styles.container]}>
                        <IconButton
                            icon={props => <Icon name="magnify" {...props} />}
                            {...props}
                        />
                        <IconButton
                            icon={props => <Icon name="cart-outline" {...props} ><Text>{cart.cart.length}</Text></Icon>}
                            onPress={() => navigation.navigate('Cart')}
                            {...props}
                        />
                    </HStack>
                )}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
}

const mapDispatchToProps = {
    getCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)