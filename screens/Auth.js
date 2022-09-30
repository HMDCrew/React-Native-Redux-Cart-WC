import React, { Component } from 'react'
import { ScrollView, View, ToastAndroid } from 'react-native'
import { Surface, Stack } from "@react-native-material/core";
import { connect } from 'react-redux'
import { Video } from 'expo-av';

import { styles, assets } from '../constants/style'
import LoginComponent from '../components/autentication/Login'
import RegisterComponent from '../components/autentication/Register'

import { isAuth } from '../store/features/loginSlice'
import { getNonce } from '../store/features/Nonce'


class Auth extends Component {

    constructor(props) {
        super(props)
        this.state = {
            view_login: true,
        }
        this.changeView = this.changeView.bind(this)
    }

    changeView() {
        this.setState({ view_login: !this.state.view_login });
    }

    componentDidMount() {
        this.props.getNonce();
        this.props.isAuth();

        const { navigation, login } = this.props;

        if (login.auth_status) {
            navigation.navigate('Home')
        } else {
            this.isLogged()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.login.token !== this.props.login.token) {
            this.isLogged()
        }
    }

    isLogged() {
        const { navigation } = this.props;

        if (this.props.login.auth_status) {
            navigation.navigate('Home')
        }
        if (false === this.props.login.auth_status && !this.props.login.isLoaded) {
            ToastAndroid.show('Login falied', ToastAndroid.SHORT);
        }
    }


    render() {

        const { view_login } = this.state;

        return (
            <View style={styles.container}>
                <Video isLooping isMuted shouldPlay
                    resizeMode="cover"
                    source={assets.login}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1
                    }}
                />

                <Stack fill center spacing={20} style={[styles.w_80, styles.mh_90]}>
                    <Surface
                        style={styles.w_100}
                        elevation={2}
                        category="medium">

                        <ScrollView style={styles.px_3}>
                            {view_login ?
                                <LoginComponent {...this.props} changeView={this.changeView} />
                                :
                                <RegisterComponent {...this.props} changeView={this.changeView} />
                            }
                        </ScrollView>
                    </Surface>
                </Stack>
            </View>
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
        },
        nonce: state.nonce
    };
}

const mapDispatchToProps = {
    isAuth,
    getNonce
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)