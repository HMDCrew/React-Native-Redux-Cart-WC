import { TextInput, Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconButton, Button } from '@react-native-material/core'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { styles, COLORS } from '../../constants/style'

import { updateQuantity, removeCartProduct } from '../../store/features/cartSlice'

class ProductCart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            qty: '0'
        }
    }

    componentDidMount() {
        this.setState({ qty: this.props.item.quantity })
    }

    componentDidUpdate() {
        if (this.state.qty !== this.props.item.quantity) {
            this.setState({ qty: this.props.item.quantity })
        }
    }

    onChangeNumber(qty) {
        if ('' !== qty) {

            const { item } = this.props;

            const quantity = (qty >= 0 ? qty : 0);
            const limit_max_qty = String(quantity <= item.quantity_limits.maximum ? quantity : item.quantity_limits.maximum);
            this.props.updateQuantity({ id: item.id, qty: limit_max_qty })

            this.setState({ qty: limit_max_qty })
        }
    }

    render() {

        const { item } = this.props;
        const { precision, price } = item.prices.raw_prices;

        const label_price = price.slice(0, precision - 2);
        const price_decimals = price.slice(precision - 2, precision);

        return (
            <View style={[styles.bg_white, styles.w_100, styles.mt_2, {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }]}>

                <View style={[styles.w_100, { flex: 0.5 }]}>
                    <Image source={{ uri: (item.images.length ? item.images[0].src : 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg') }} style={{ height: 200 }} resizeMode='cover' />
                </View>

                <View style={[styles.w_100, styles.h_100, { flex: 0.5 }]}>

                    <View style={[styles.d_flex, styles.h_100, styles.p_1, { justifyContent: 'center' }]}>
                        <Text style={[styles.mb_1, { fontWeight: '600' }]}>{item.name}</Text>

                        <Text style={styles.mb_1}>{label_price}{item.prices.currency_thousand_separator}{price_decimals} {item.prices.currency_symbol}</Text>

                        <View style={{ height: 36, flexDirection: 'row' }}>
                            <Button
                                variant="outlined"
                                title="-"
                                titleStyle={{ alignContent: 'center', width: 36, padding: 0 }}
                                color={COLORS.primary}
                                style={{ padding: 0, width: 36 }}
                                onPress={() => this.onChangeNumber(Number.parseInt(this.state.qty) - 1)}
                            />
                            <TextInput
                                style={[styles.mx_1, { textAlign: 'center' }]}
                                onChangeText={qty => this.onChangeNumber(qty)}
                                value={String(this.state.qty)}
                                defaultValue={item.quantity}
                                keyboardType="numeric"
                            />
                            <Button
                                variant="outlined"
                                title="+"
                                color={COLORS.primary}
                                titleStyle={{ alignContent: 'center', width: 36, padding: 0 }}
                                style={{ padding: 0, width: 36 }}
                                onPress={() => this.onChangeNumber(Number.parseInt(this.state.qty) + 1)}
                            />
                        </View>

                        <IconButton
                            color={COLORS.gray_400}
                            icon={props => <Icon name="close" {...props} size={17} />}
                            style={{ position: 'absolute', top: 0, right: 0 }}

                            onPress={() => {
                                this.props.removeCartProduct(item.key)
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
}

const mapDispatchToProps = {
    updateQuantity,
    removeCartProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart)