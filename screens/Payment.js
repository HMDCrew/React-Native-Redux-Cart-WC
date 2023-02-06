import React from 'react';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';
import { View, Button, Alert } from 'react-native';
import axios from 'axios';

export default function Payment() {

    const { confirmPayment } = useStripe();
    const { createPaymentMethod, handleCardAction } = useStripe();

    const pay = async () => {
        // Gather customer billing information (for example, email)
        const billingDetails = {
            email: 'email@stripe.com',
            phone: '+48888000888',
            addressCity: 'Houston',
            addressCountry: 'US',
            addressLine1: '1459  Circle Drive',
            addressLine2: 'Texas',
            addressPostalCode: '77063',
            // form user info
        };

        // Create payment method
        const { paymentMethod } = await createPaymentMethod({
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails,
            }
        });

        const response = await axios.post("https://dev-panasonic.pantheonsite.io/wp-json/wpr-stripe-payment", {
            headers: {
                'Content-Type': 'application/json',
            },
            paymentMethodId: paymentMethod.id,
            // products details
        }).then((response) => response.data).catch((error) => error.json());

        /*
        const { error, requires_action, payment_intent_client_secret } = response;
        console.log(response)

        if (error) {
            // Error creating or confirming PaymentIntent
            Alert.alert('Error', paymentIntentError);
            return;
        }

        if (payment_intent_client_secret && !requires_action) {
            // Payment succeeded
            Alert.alert('Success', 'The payment was confirmed successfully!');
        }

        if (payment_intent_client_secret && requires_action) {
            const { error, paymentIntent } = await handleCardAction(payment_intent_client_secret);

            if (error) {
                Alert.alert(`Error code: ${error.code}`, error.message);
            } else if (paymentIntent) {

                // ?
                if (paymentIntent.status) {
                    // Confirm the PaymentIntent again on your server
                    const response = await axios.post("http://192.168.53.88:8080/pay", {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        payment_intent_id: paymentIntent.id,
                    }).then((response) => response.data).catch((error) => error.json());

                    const { error, success } = response;
                    if (error) {
                        // Error during confirming Intent
                        Alert.alert('Error', error);
                    } else if (success) {
                        Alert.alert('Success', 'The payment was confirmed successfully!');
                    }
                } else {
                    // Payment succedeed
                    Alert.alert('Success', 'The payment was confirmed successfully!');
                }
            }
        }
        */
    };

    return (
        <View>
            <StripeProvider
                publishableKey="pk_test_51LnfxgFr4Sza9qfAO1FoBQBmaVYfLmo2lL0MA8uZkFa52dudPU67CGvRihXOwsZvfLdiEGYwAJsmvNg3Arayg5Td002e0gkUVP"
                urlurlScheme="https://dev-panasonic.pantheonsite.io/wp-json/wpr-stripe-payment"
            >

                <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />
                <Button title={'test'} onPress={() => pay()} />
            </StripeProvider>
        </View>
    );
}