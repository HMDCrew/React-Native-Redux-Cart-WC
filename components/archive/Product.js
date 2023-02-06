import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from '@react-native-material/core';

import { styles, COLORS, SIZES } from '../../constants/style';

import { getNonce } from '../../store/features/nonceSlice'
import { addProductCart } from '../../store/features/cartSlice'
import AutoHeightImage from '../../utils/AutoHeightImage'


export class ProductArchive extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: props.item.item,
            box_size: { w: 0, h: 0 },
            image_h: 0,
            image_w: 0,
        }
    }

    render() {

        const { navigation } = this.props;
        const { item } = this.state;
        const { price, symbol, name, image_uri } = item;

        return (
            <TouchableOpacity onPress={() => navigation.navigate('Product', { item })} onLayout={(event) => {
                let { x, y, width, height } = event.nativeEvent.layout;
                this.setState({ box_size: { w: width, h: height } })
            }}>
                <View style={[styles.bg_white, styles.m_1, { borderRadius: 12 }]}>

                    {this.state.box_size.w > 0
                        ? <AutoHeightImage uri={image_uri} style={styles.w_100} box_size={this.state.box_size} width={(this.state.box_size.w - 20)} />
                        : null
                    }

                    {
                        '' !== price ?
                            <View style={styles.px_1}>
                                <Text style={{ fontSize: SIZES.font, color: '#1E1E1E', fontWeight: 'bold' }}>{price}{symbol}</Text>
                                {/* <Button
                                    title="Add to cart"
                                    color={COLORS.primary}
                                    onPress={() => {
                                        this.props.addProductCart({ id: item.id, qty: 1 })
                                    }}
                                /> */}
                            </View>
                            : null
                    }

                    <Text style={[styles.px_1, styles.pb_1, { fontSize: SIZES.small, color: '#505050' }]}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = { addProductCart, getNonce }

export default connect(mapStateToProps, mapDispatchToProps)(ProductArchive)