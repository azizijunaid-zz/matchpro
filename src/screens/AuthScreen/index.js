import React, {Component} from 'react'
import {KeyboardAvoidingView, StatusBar, Platform, LayoutAnimation, View} from 'react-native'
// import SoftInputMode from 'react-native-set-soft-input-mode';
import {connect} from 'react-redux'
import AuthLogo from './AuthLogo'
import AuthForm from './AuthForm'
import AuthLinks from './AuthLinks'
import * as actions from '../../utils/store/actions';

import {bindActionCreators} from "redux";
import Colors from "../../styles/colors";
import {LAYOUT_ANIMATION} from "../../config";
import Loader from "../../components/Loader";

class AuthScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // if (Platform.OS === 'android') {
        // 	SoftInputMode.set(SoftInputMode.ADJUST_RESIZE);
        // }

        LayoutAnimation.configureNext(LAYOUT_ANIMATION);


    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{flex: 1, backgroundColor: Colors.WHITE, alignItems: 'center', justifyContent: 'center'}}
                behavior={Platform.OS === 'ios' ? "padding" : null}
                keyboardVerticalOffset={0}>
                {/*<StatusBar backgroundColor="white" barStyle="dark-content"/>*/}
                {Platform.OS === 'ios' && (
                    <View style={{flex:2,}}>
                        <Loader/>
                    </View>
                )}

                <View style={{flex: 1,}}>
                    <AuthForm/>
                    <AuthLinks/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


function mapStateToProps(state) {
    return {
        isLogin: state.auth.isLogin
    };
}

export default connect(mapStateToProps,
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(AuthScreen);


