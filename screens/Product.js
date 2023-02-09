import React, { Component } from 'react'
import { Text, View, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import RenderHtml from 'react-native-render-html'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'

import { getProduct } from '../store/features/productSlice'
import { styles, SIZES, COLORS } from '../constants/style'
import MySlider from '../components/utils/MySlider'
import AutoHeightImage from '../components/utils/AutoHeightImage'

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

        const sliderHeight = 200;
        const sliderPlace = <ShimmerPlaceHolder visible={product.product.gallery_image_ids > 0} LinearGradient={LinearGradient} style={[styles.m_1, { width: windowWidth - 20, height: sliderHeight, borderRadius: 12 }]} />;

        return (
            <View>
                <View style={[styles.my_1, { alignItems: 'center' }]}>
                    <View style={{ width: 100, height: 5, backgroundColor: COLORS.gray_600, borderRadius: 12 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>

                        <MySlider
                            data={!product.isLoading ? product.product.gallery_image_ids : []}
                            renderItem={({ item }) =>
                                <View style={[styles.m_1, { width: windowWidth - 20, alignItems: "center" }]}>
                                    <AutoHeightImage
                                        uri={item}
                                        width={windowWidth}
                                        height={sliderHeight}
                                    />
                                </View>
                            }
                            placeholder={() => sliderPlace}
                        />

                        {!product.isLoading
                            ?
                            <View>
                                {'' !== product.product.price
                                    ? <Text style={[styles.mt_5, { fontSize: SIZES.large }]}>Price: {product.product.price}{product.product.symbol}</Text>
                                    : null
                                }

                                <Text style={[styles.mt_5, { fontSize: SIZES.large }]}>{product.product.name}</Text>

                                {'' !== product.product.description
                                    ? <RenderHtml
                                        ignoredDomTags={['iframe', 'script', 'style']}
                                        contentWidth={windowWidth}
                                        source={{ html: product.product.description }}
                                    />
                                    : null
                                }
                            </View>
                            : null}
                    </View>
                </ScrollView>
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