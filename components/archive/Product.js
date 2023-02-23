import React, { Component } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

import { styles, SIZES } from '../../constants/style';

import AutoHeightImage from '../utils/AutoHeightImage'

export class ProductArchive extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: props.loading == true ?? false,
            item: props.item.item,
            box_size: { w: 0, h: 0 },
        }
    }

    render() {

        const { navigation } = this.props;
        const { item, loading } = this.state;
        const { price, symbol, name, image_uri } = item;

        return (
            <TouchableOpacity
                onPress={() => loading == false ? navigation.navigate('Product', { item }) : false}
                onLayout={(event) => {
                    let { x, y, width, height } = event.nativeEvent.layout;

                    loading == false
                        ? this.setState({ box_size: { w: width, h: height } })
                        : false;
                }}
            >
                <View style={[styles.bg_white, styles.m_1, { borderRadius: 12 }]}>

                    {this.state.box_size.w > 0 && !loading && '' !== image_uri
                        ? <AutoHeightImage uri={image_uri} style={styles.w_100} box_size={this.state.box_size} width={(this.state.box_size.w - 20)} />
                        : <ShimmerPlaceHolder visible={this.state.box_size.w > 0} LinearGradient={LinearGradient} style={[styles.w_100, styles.pb_1, { height: 100, borderRadius: 12 }]} />
                    }

                    <View style={styles.px_1}>
                        {'' !== price
                            ? <Text style={{ fontSize: SIZES.font, color: '#1E1E1E', fontWeight: 'bold' }}>{price}{symbol}</Text>
                            : null
                        }
                    </View>

                    <Text style={[styles.px_1, styles.pb_1, { fontSize: SIZES.small, color: '#505050' }]}>{name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ProductArchive