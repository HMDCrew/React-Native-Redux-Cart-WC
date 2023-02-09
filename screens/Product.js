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

const windowWidth = Dimensions.get('window').width;
export class Product extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getProduct(this.props.route.params.item.id);
    }

    price(product) {
        return (
            product
                ? '' !== product.price
                    ? <Text style={[styles.mt_3, { fontSize: SIZES.large, fontWeight: '900' }]}>{product.price}{product.symbol}</Text>
                    : <Text></Text>
                : <ShimmerPlaceHolder visible={false} LinearGradient={LinearGradient} style={[styles.mt_3, { width: '50%' }]} />
        )
    }

    title(title) {
        return (
            title
                ? <Text style={[styles.mt_2, { fontSize: SIZES.large }]}>{title}</Text>
                : <ShimmerPlaceHolder visible={false} LinearGradient={LinearGradient} style={[styles.mt_2, { width: '80%' }]} />
        )
    }

    description({ desc, content_screen }) {
        console.log(content_screen)
        return (
            content_screen !== ''
                ? <AutoHeightImage
                    uri={content_screen}
                    width={windowWidth}
                />
                : desc
                    ? <RenderHtml
                        ignoredDomTags={['iframe', 'script', 'style']}
                        contentWidth={windowWidth}
                        source={{ html: desc }}
                    />
                    : <ShimmerPlaceHolder visible={false} LinearGradient={LinearGradient} style={[styles.mt_2, { width: '100%', height: 250 }]} />
        )
    }

    render() {

        const { product, route } = this.props;
        const { image_uri } = route.params.item;

        const sliderHeight = 200;
        const sliderPlace = <ShimmerPlaceHolder visible={product.product.gallery_image_ids > 0} LinearGradient={LinearGradient} style={[styles.my_1, { width: windowWidth - 20, height: sliderHeight, borderRadius: 12 }]} />;

        return (
            <View>
                <View style={[styles.my_1, { alignItems: 'center' }]}>
                    <View style={{ width: 100, height: 5, backgroundColor: COLORS.gray_600, borderRadius: 12 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.mx_1}>
                    <View>

                        <MySlider
                            data={!product.isLoading ? [image_uri, ...product.product.gallery_image_ids] : []}
                            renderItem={({ item }) =>
                                <View style={[styles.my_1, { width: windowWidth - 20, alignItems: "center" }]}>
                                    <AutoHeightImage
                                        uri={item}
                                        width={windowWidth}
                                        height={sliderHeight}
                                    />
                                </View>
                            }
                            placeholder={() => sliderPlace}
                        />

                        {this.price(!product.isLoading ? product.product : false)}

                        {this.title(!product.isLoading ? product.product.name : false)}

                        {this.description(
                            !product.isLoading
                                ? { desc: product.product.description, content_screen: product.product.content_screen }
                                : { desc: false, content_screen: '' }
                        )}
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