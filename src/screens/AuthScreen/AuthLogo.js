import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { connect } from 'react-redux'
import Loader from "../../components/Loader";

const AuthLogo = ({ isLogin }) => {
	const flexibleMargin = { marginBottom: isLogin ? 10 : 40 }

	return (
		<View style={styles.container}>
		</View>
	)
}

const mapStateToProps = (state) => ({
	isLogin: state.auth.isLogin
})

export default connect(mapStateToProps)(AuthLogo)

const styles = StyleSheet.create({
	container: {
		zIndex:-10,
		flex: 4,

	},

})
