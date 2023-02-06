import { SafeAreaView, FlatList, Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button } from "@react-native-material/core"

import { connect } from 'react-redux'
import { getTaxonomys } from '../../store/features/taxonomyMenuSlice'

import { assets, styles, COLORS } from '../../constants/style'

export class SidebarContent extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTaxonomys()
    }

    render() {

        const { navigation, menu } = this.props;

        return (
            <View style={[styles.d_flex, styles.bg_primary]}>
                <SafeAreaView style={[styles.h_100, { flex: 1 }]}>
                    <View style={[styles.mt_4, styles.ml_1]}>
                        <Image source={assets.logo} style={[styles.w_60, styles.p_5, styles.container]} resizeMode='contain' />
                    </View>
                    <View>
                        {
                            (!menu.isLoading ?
                                <FlatList
                                    data={menu.taxonomy}
                                    keyExtractor={term => term.term_id}
                                    renderItem={term =>
                                        <Button
                                            variant="text"
                                            key={term.item.term_id}
                                            color={COLORS.black}
                                            style={[styles.my_1]}
                                            title={<Text style={[styles.w_70, styles.text_white]}>{term.item.name}</Text>}

                                            onPress={() => 
                                                navigation.navigate('STACK', {
                                                    screen: 'Store',
                                                    params: { term: term.item },
                                                })
                                            }

                                            leading={
                                                <View style={[
                                                    styles.container,
                                                    styles.p_1,
                                                    { width: 50 }
                                                ]}>
                                                    <Image style={[styles.m_1, { width: 50, height: 40 }]} source={{ uri: term.item.image }} resizeMode='contain' />
                                                </View>
                                            }
                                            trailing={<Image source={assets.arrow} style={{ height: 15 }} resizeMode='contain' />}
                                        />
                                    }
                                />
                                : null)
                        }
                    </View>
                </SafeAreaView>
                <View>
                    <Text>test</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    };
}

const mapDispatchToProps = {
    getTaxonomys
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent)