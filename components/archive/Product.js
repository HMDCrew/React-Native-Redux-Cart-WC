import React, { Component } from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { styles, COLORS } from '../../constants/style';
import { Button } from '@react-native-material/core';

import { getNonce } from '../../store/features/Nonce'
import { addProductCart } from '../../store/features/cartSlice'

export class ProductArchive extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { navigation, item } = this.props;
        const { price, symbol, name, image_uri } = item;

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', { item })} >
                <View>
                    <Image source={{ uri: image_uri }} style={[styles.w_100, { height: 250 }]} resizeMode='contain' />
                    <Text>{name}</Text>
                    {
                        '' !== price ?
                            <View>
                                <Text>{price}{symbol}</Text>
                                <Button
                                    title="Add to cart"
                                    color={COLORS.primary}
                                    onPress={() => {
                                        this.props.addProductCart({id: item.id, qty: 1})
                                    }}
                                />
                            </View>
                            : null
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = {
    addProductCart,
    getNonce
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductArchive)