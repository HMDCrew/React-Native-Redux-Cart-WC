import React, { Component } from 'react'
import { Text, View, Dimensions, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import RenderHtml from 'react-native-render-html'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@react-native-material/core'

import { getProduct } from '../store/features/productSlice'
import { styles, SIZES, COLORS } from '../constants/style'
import MySlider from '../components/utils/MySlider'
import AutoHeightImage from '../components/utils/AutoHeightImage'

import { addProductCart } from '../store/features/cartSlice'

const windowWidth = Dimensions.get('window').width;
export class Product extends Component {

    constructor(props) {
        super(props)
        this.state = {
            qty: 1
        }
    }

    componentDidMount() {
        this.props.getProduct(this.props.route.params.item.id);
    }

    onChangeNumber(qty) {
        if ('' !== qty) {
            this.setState({ qty: (qty >= 0 ? qty : 0) })
        }
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

    description(desc) {
        return (
            desc
                ? <RenderHtml
                    ignoredDomTags={['iframe', 'script', 'style']}
                    contentWidth={windowWidth}
                    source={{ html: desc }}
                />
                : desc.toString().trim() != ''
                    ? <ShimmerPlaceHolder visible={false} LinearGradient={LinearGradient} style={[styles.mt_2, { width: '100%', height: 250 }]} />
                    : <Text />
        )
    }

    render() {

        const { product, route } = this.props;
        const { image_uri, id } = route.params.item;

        const sliderHeight = 250;
        const sliderPlace = <ShimmerPlaceHolder visible={product.product.gallery_image_ids > 0} LinearGradient={LinearGradient} style={[styles.my_1, { width: windowWidth - 20, height: sliderHeight, borderRadius: 12 }]} />;

        return (
            <View style={styles.d_flex}>
                <View style={[styles.my_1, { flex: 0.01, alignItems: 'center' }]}>
                    <View style={{ width: 100, height: 5, backgroundColor: COLORS.gray_600, borderRadius: 12 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.mx_1, { flex: 0.9 }]}>
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

                        {this.description(!product.isLoading ? product.product.description : false)}
                    </View>
                </ScrollView>

                <View style={[styles.my_1, { flex: 0.1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }]}>
                    <View style={{ height: 36, flexDirection: 'row', marginRight: 10 }}>
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
                    <Button
                        title="Add to cart"
                        color={COLORS.primary}
                        onPress={() => {
                            this.props.addProductCart({ id: id, qty: this.state.qty })
                        }}
                    />
                </View>
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
    getProduct,
    addProductCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)