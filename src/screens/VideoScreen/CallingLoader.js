import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Loader from "../../components/Loader";

export default class CallingLoader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.userIsCalling &&
                <View>
                    <View style={{height:200,}}>
                        <Loader color="white"/>
                    </View>
                    <View style={{marginTop:50,}}>
                        <Text style={styles.text}>Calling...</Text>
                    </View>
                </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFill,
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        fontSize: 28,
        color: 'white',
        textAlign: 'center'
    }
})
