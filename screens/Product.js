import React, { Component } from 'react'
import { Text, View, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import RenderHtml from 'react-native-render-html'

import { getProduct } from '../store/features/productSlice'
import { styles, SIZES } from '../constants/style'

export class Product extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getProduct(this.props.route.params.item.id);
    }

    render() {

        const { product } = this.props;
        const windowWidth = Dimensions.get('window').width;

        return (
            <View>
                {
                    (!product.isLoading ?
                        <ScrollView>

                            <Text style={[styles.mt_5, { fontSize: SIZES.large }]}>{product.product.name}</Text>

                            {'' !== product.product.price
                                ? <Text style={[styles.mt_5, { fontSize: SIZES.large }]}>Price: {product.product.price}{product.product.symbol}</Text>
                                : null
                            }

                            {product.product.gallery_image_ids.length
                                ? product.product.gallery_image_ids.map((image, index) => <Image style={[styles.w_100, { height: 250 }]} key={'img' + index} source={{ uri: image }} />)
                                : null
                            }

                            {'' !== product.product.description
                                ? <RenderHtml
                                    ignoredDomTags={['iframe', 'script', 'style']}
                                    contentWidth={windowWidth}
                                    source={{ html: product.product.description }}
                                />
                                : null
                            }

                        </ScrollView>
                        : null)
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        product: state.product
    };
}

const mapDispatchToProps = {
    getProduct
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)