import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Prompt from 'rn-prompt'
import { toggleAuth, toggleModal } from '../../utils/store/actions/auth'
import User from '../../services/UserService';
import Colors from "../../styles/colors";

class AuthLinks extends Component {
	resetPassword(email) {
		this.props.toggleModalState()

		User.createSession()
			.then(() => User.resetPassword(email))
			.then(() => alert('Reset password.\n\nThe email was sent'))
			.catch(e => {
				// alert(`Error to reset password.\n\n${JSON.stringify(e)}`)
			})
	}

	render() {
		const { isLogin, isModal, toggleAuthState, toggleModalState, translations, dictionary } = this.props
		const authText = isLogin ? dictionary.dontHaveAccount : dictionary.haveAccount;
		const authLink = isLogin ? dictionary.signUp : dictionary.login
		const contentPosition = { justifyContent: isLogin ? 'space-between' : 'flex-end' }
	
		return (
			<View style={[styles.container, contentPosition]}>
				<Prompt
            title={dictionary.forgotPassword}
            placeholder={translations.email}
            visible={isModal}
            onCancel={() => toggleModalState()}
            onSubmit={email => this.resetPassword(email)}/>
				{isLogin && (
					<TouchableOpacity onPress={() => toggleModalState()}>
						<Text style={[styles.text, { marginBottom: 40 }]}>{dictionary.forgotPassword}</Text>
					</TouchableOpacity>
				)}
				<View style={styles.switchAuthContainer}>
					<Text style={styles.text}>{authText} </Text>
					<TouchableOpacity onPress={() => toggleAuthState()}>
						<Text style={[styles.switchAuth, styles.text]}>{authLink}</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	isLogin: state.auth.isLogin,
	isModal: state.auth.isModal,
    translations: state.languages.selected.translations.fields,
    dictionary: state.languages.selected.translations.dictionary
})

const mapDispatchToProps = (dispatch) => ({
	toggleAuthState: () => dispatch(toggleAuth()),
	toggleModalState: () => dispatch(toggleModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLinks)

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingBottom: 25,
	},
	text: {
		fontSize: 16,
	},
	switchAuthContainer: {
		marginVertical: 5,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	switchAuth: {
		fontWeight: '700',
        color: Colors.PRIMARY_COLOR

    },
})
