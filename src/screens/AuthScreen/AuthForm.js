import React, {Component} from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {userLogin} from '../../utils/store/actions/user'
import User from '../../services/UserService'
import Colors from "../../styles/colors";
import NavigationService from "../../services/NavigationService";
import RoundButton from "../../components/RoundButton";

class AuthForm extends Component {
    state = {
        loading: false,
        name: '',
        email: '',
        password: '',
    }

    login() {

        if (this.props.isLogin) {
            this._signIn()
        } else {
            this._signUp()
        }
    }

    _signIn() {

        const {name, email} = this.state;
        if (!name.trim() && !email.trim()) {
            NavigationService.showInAppNotification(
                {
                    title: "Invalid Form",
                    message: 'Fill the fields to login'
                });
            return
        }
        this.setState({loading: true});

        User.signin(this.state)
            .then(this.props.userLogin)
            .then(e => NavigationService.home())
            .finally(e => this.setState({loading: false}))
            .catch(e => {
                    NavigationService.showInAppNotification(
                        {
                            title: e.message.errors[0],
                            message: 'Incorrect login credentials'
                        })
                }
            )
    }

    _signUp() {
        const {name, email, password} = this.state

        if (!name.trim() || !email.trim() || !password.trim()) {
            NavigationService.showInAppNotification(
                {
                    title: "Invalid Form",
                    message: 'Fill the fields to sign up'
                });

            return
        }

        this.setState({loading: true});

        User.signup({
            full_name: name,
            email: email,
            password: password
        })
            .then(this.props.userLogin)
            .then(e => NavigationService.home())
            .finally(e => this.setState({loading: false}))
            .catch(e => {
                NavigationService.showInAppNotification(
                    {
                        title: "Invalid Form",
                        message: 'Invalid form. please try again'
                    })
            })
    }


    componentWillUnmount() {
        this.setState({
            name: '',
            email: '',
            password: '',
        })
    }

    render() {
        const {translations, dictionary} = this.props;

        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: "rgba(255,255,255,1)",
                    paddingTop: 20,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                }}>
                    {!this.props.isLogin && (
                        <TextInput
                            placeholder={translations.full_name}
                            returnKeyType="next"
                            onSubmitEditing={() => this.emailInput.focus()}
                            ref={input => (this.nameInput = input)}
                            onChangeText={text => this.setState({name: text})}
                            style={styles.input}
                        />
                    )}
                    <TextInput
                        placeholder={translations.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        ref={input => (this.emailInput = input)}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={text => this.setState({email: text})}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder={translations.password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        returnKeyType="done"
                        ref={input => (this.passwordInput = input)}
                        onChangeText={text => this.setState({password: text})}
                        style={styles.input}
                    />
                </View>
                <RoundButton label={this.props.isLogin ? dictionary.login : dictionary.signUp}
                             labelColor={"#FFF"}
                             loading={this.state.loading}
                             backgroundColors={[Colors.PRIMARY_COLOR, Colors.SECONDARY_COLOR]}
                             onPress={() => this.login()}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    user: state.user,
    translations: state.languages.selected.translations.fields,
    dictionary: state.languages.selected.translations.dictionary
});

export default connect(mapStateToProps,
    (dispatch) => ({
        userLogin: user => dispatch(userLogin(user))
    })
)(AuthForm);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 99999,
        justifyContent: 'flex-end',
        backgroundColor: Colors.WHITE
    },
    input: {
        height: 50,
        borderRadius: 25,
        marginVertical: 5,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        fontSize: 18,
    },
})
