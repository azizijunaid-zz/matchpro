import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from "../../../styles/colors";

export default function DialogUnreadCounter({unreadMessagesCount}) {
    return (
        unreadMessagesCount > 0 &&
        <View style={styles.container}>
            <Text style={styles.counter}>{unreadMessagesCount < 100 ? unreadMessagesCount : 99}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        lineHeight: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY_COLOR
    },
    counter: {
        color: 'white',
        fontSize: 11,
        marginBottom:-4,
        fontWeight: '700'
    }
})