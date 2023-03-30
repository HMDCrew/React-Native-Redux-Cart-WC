import { View, FlatList, RefreshControl } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ActivityIndicator } from "@react-native-material/core"

import { styles, COLORS } from '../constants/style'
import Header from '../components/Header'
import ChackoutInput from '../components/chackout/ChackoutInput';
import ChackoutSelect from '../components/chackout/ChackoutSelect';

import { getChackoutFields, getPayments, createOrder } from '../store/features/chackoutSlice'

export class Chackout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: [],
            country: [],
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

    updateCountryField(field_name, field_value) {
        this.updateStateFields(field_name, field_value)
        this.setState({ country: field_value })
    }

    updateStateFields(field_name, field_value) {
        const index_state = this.state.fields.findIndex(el => el.name === field_name);

        this.state.fields[index_state] ?
            // update element
            [
                this.state.fields[index_state].value = field_value,
                this.setState({ ...this.state.fields })
            ]
            :
            // insert element
            this.setState({ fields: [...this.state.fields, { name: field_name, value: field_value }] })
    }

    render() {

        const { isLoaded, payments, isLoadedFields, fields, missingOrderField } = this.props;

        return (
            <View style={[styles.d_flex, styles.bg_light]}>
                <Header {...this.props} />
                {
                    (isLoaded && payments.stripe && isLoadedFields) ?
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

                                    if ('billing_country' === name) {
                                        return (
                                            <ChackoutSelect
                                                setSelected={value => this.updateCountryField(name, value)}
                                                data={fields.countries}
                                                placeholder={'Select County'}
                                                defaultOption={fields.countries[0]}
                                            />
                                        );
                                    }

                                    if ('billing_state' === name) {
                                        return (
                                            <ChackoutSelect
                                                setSelected={value => this.updateStateFields(name, value)}
                                                data={fields.states[this.state.country]}
                                                placeholder={'Select State'}
                                                defaultOption={fields.states[this.state.country]}
                                            />
                                        );
                                    }

                                    return (
                                        <ChackoutInput
                                            onChangeText={value => this.updateStateFields(name, value)}
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
                                    this.props.createOrder({ form_fields: this.state.fields })
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
        login: state.login,
    };
}

const mapDispatchToProps = {
    getChackoutFields,
    getPayments,
    createOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Chackout)