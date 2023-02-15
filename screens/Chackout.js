import { View, ScrollView, FlatList, RefreshControl } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ActivityIndicator } from "@react-native-material/core"

import { styles, COLORS } from '../constants/style'
import Header from '../components/Header'
import ChackoutInput from '../components/chackout/ChackoutInput';

import { getChackoutFields, getPayments, createOrder } from '../store/features/chackoutSlice'

export class Chackout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: [],
        }
    }

    componentDidMount() {
        this.props.getChackoutFields();
        this.props.getPayments();
    }

    componentDidUpdate() {
        if (this.props.isOrderCreated) {
            this.props.navigation.navigate('Payment')
        }
    }

    render() {

        const { isLoaded, payments, isLoadedFields, fields, cart, missingOrderField } = this.props;

        return (
            <View style={[styles.d_flex, styles.bg_light]}>
                <Header {...this.props} />


                {
                    (isLoaded && payments.stripe && isLoadedFields) ?
                        // console.log(chackout.payments.stripe)
                        <View style={[styles.d_flex]}>

                            <FlatList

                                style={[styles.d_flex, styles.w_100, {
                                    marginBottom: 80,
                                    paddingBottom: 50,
                                }]}
                                contentContainerStyle={[styles.px_2, {
                                    alignItems: 'center',
                                    flexGrow: 1
                                }]}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={!isLoadedFields}
                                        onRefresh={() => {
                                            this.props.getChackoutFields()
                                        }}
                                    />
                                }
                                data={Object.entries(fields.billing)}
                                renderItem={({ item, index }) => {

                                    const name = item[0];
                                    const value = item[1];

                                    return (
                                        <ChackoutInput
                                            onChangeText={value => {

                                                const index_state = this.state.fields.findIndex(el => el.name === name);

                                                this.state.fields[index_state] ?
                                                    // update element
                                                    [
                                                        this.state.fields[index_state].value = value,
                                                        this.setState({ ...this.state.fields })
                                                    ]
                                                    :
                                                    // insert element
                                                    this.setState({ fields: [...this.state.fields, { name: name, value: value }] })
                                            }}
                                            missingOrderField={missingOrderField}
                                            key={index}
                                            value={value}
                                            name={name}
                                        />
                                    );
                                }}
                            />

                            <Button
                                title="Order"
                                color={COLORS.primary}
                                contentContainerStyle={styles.h_100}
                                onPress={() => {
                                    this.props.createOrder({ cart: cart, form_fields: this.state.fields })
                                }}
                                style={{
                                    alignSelf: 'center',
                                    position: 'absolute',
                                    zIndex: 50,
                                    height: 60,
                                    bottom: 10,
                                    width: '90%',
                                    borderRadius: 0,
                                }}
                            />
                        </View>
                        :
                        <ActivityIndicator size="large" color={COLORS.primary} />
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoaded: state.chackout.isLoaded,
        payments: state.chackout.payments,
        fields: state.chackout.fields,
        missingOrderField: state.chackout.missingOrderField,
        isLoadedFields: state.chackout.isLoadedFields,
        isOrderCreated: state.chackout.isOrderCreated,
        cart: state.cart,
        login: state.login,
    };
}

const mapDispatchToProps = {
    getChackoutFields,
    getPayments,
    createOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Chackout)