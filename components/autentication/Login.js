import React, { Component } from 'react'
import { HStack, Stack, Text, TextInput, IconButton, Button } from "@react-native-material/core";
import { COLORS, styles } from '../../constants/style'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { connect } from 'react-redux'
import { getLoginToken } from '../../store/features/loginSlice'

export class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: 'andrei.leca55@gmail.com',
            password: '123456789',
            loading: false,
            is_visible_password: false
        }
    }

    hundleLogin() {
        this.setState({ loading: true });
        this.props.getLoginToken({ user: this.state.email, passwd: this.state.password })
    }

    render() {

        const { changeView, login } = this.props;
        const { is_visible_password, loading, is_valid_email, email, password } = this.state;

        return (
            <Stack style={styles.py_4}>

                <Text variant="h5" style={styles.pb_4}>Login Screen</Text>

                <TextInput
                    label="email"
                    onChangeText={(email) => this.setState({ email })}
                    helperText={<Text style={{ fontSize: 12, color: COLORS.danger }}>{is_valid_email ? 'chack the email' : ''}</Text>}
                    leading={props => <Icon name="account" {...props} />}
                    value={email}
                    color={COLORS.primary}
                    placeholder="email" />
                <TextInput
                    label="password"
                    onChangeText={(password) => this.setState({ password })}
                    leading={props => <Icon name="key" {...props} />}
                    style={styles.pb_4}
                    color={COLORS.primary}
                    trailing={props => (
                        <IconButton icon={props => <Icon name="eye" {...props} />} {...props} onPress={() => this.setState({ is_visible_password: !is_visible_password })} />
                    )}
                    value={password}
                    secureTextEntry={!is_visible_password}
                    placeholder="password" />
                <HStack spacing={2}>
                    <Button
                        title="Login"
                        color={COLORS.primary}
                        loading={loading && login.isLoaded}
                        loadingIndicatorPosition="trailing"
                        onPress={() => this.hundleLogin()}
                    />
                    <Button
                        title="Register"
                        variant="text"
                        color={COLORS.primary}
                        onPress={changeView}
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
            full: state.login
        }
    };
}

const mapDispatchToProps = {
    getLoginToken
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)