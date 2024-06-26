import React, { Component } from 'react'
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import axios from 'axios'
import { HStack, Stack, Text, TextInput, IconButton, Button } from "@react-native-material/core"
import { ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { COLORS, styles } from '../../constants/style'
import { componentLogin } from '../../store/features/loginSlice'
import env from '../../constants/env'

export class RegisterComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            is_valid_email: false,
            loading: false,
            is_visible_password: false,
            is_valid_passwords: false,
            isLoaded: false,
        }
    }

    async registerUser() {
        this.setState({ loading: true });
        try {

            const { email, password } = this.state;

            let response = await axios.post(env.SITE_URL + "wp-json/simple-jwt-login/v1/users", {
                email: email,
                password: password,
                MY_SUPER_SECRET_KEY: 'AUTH_KEY_VALUE',
            }).then((response) => response.data);

            this.props.componentLogin(response);
            this.setState({ loading: false, isLoaded: true })

            AsyncStorage.setItem('login-data', JSON.stringify(response))

        } catch (error) {
            console.log(error);
        }
    }

    validateEmail(email) {

        this.setState({ email })

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === true) {
            this.setState({ is_valid_email: false })
        } else {
            this.setState({ is_valid_email: true })
        }
    }

    render() {

        const { loading, is_visible_password, email, password, is_valid_email } = this.state;

        return (

            <Stack style={styles.py_4}>

                <Text variant="h5" style={styles.pb_4}>Register</Text>

                <TextInput
                    label="email"
                    helperText={<Text style={{ fontSize: 12, color: COLORS.danger }}>{is_valid_email ? 'chack the email' : ''}</Text>}
                    onChangeText={(email) => this.validateEmail(email)}
                    leading={props => <Icon name="email" {...props} />}
                    value={email}
                    color={COLORS.primary}
                    placeholder="email" />
                <TextInput
                    label="password"
                    onChangeText={(password) => this.setState({ password })}
                    leading={props => <Icon name="key" {...props} />}
                    style={styles.pb_2}
                    color={COLORS.primary}
                    trailing={props => (
                        <IconButton icon={props => <Icon name="eye" {...props} />} {...props} onPress={() => this.setState({ is_visible_password: !is_visible_password })} />
                    )}
                    value={password}
                    secureTextEntry={!is_visible_password}
                    placeholder="password" />

                <HStack spacing={2}>
                    <Button
                        title="Register"
                        color={COLORS.primary}
                        loading={loading}
                        loadingIndicatorPosition="trailing"
                        onPress={() => this.registerUser()}
                    />
                    <Button
                        title="Login"
                        variant="text"
                        color={COLORS.primary}
                        onPress={this.props.changeView}
                    />
                </HStack>
            </Stack>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: {
            token: state.login.token,
            isLoaded: state.login.isLoading,
            auth_status: state.login.auth_status,
            full: state.login
        }
    };
}

const mapDispatchToProps = {
    componentLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)
