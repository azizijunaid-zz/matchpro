import React, {Component, Fragment} from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import UserIcon from '../../components/ProfileIcon'
import Colors from "../../styles/colors";
import NavigationService from "../../services/NavigationService";
import ProgressiveImage from "../../components/ProgressiveImage";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from "react-native-linear-gradient";
import Main from "../../styles/main";

const fullWidth = Dimensions.get('window').width

export default class Message extends Component {
    getTime(dateSent) {
        const date = dateSent ? new Date(dateSent * 1000) : new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${(hours > 9) ? hours : ('0' + hours)}:${(minutes > 9) ? minutes : ('0' + minutes)}`
    }


    renderBody() {
        const {message, otherSender, user} = this.props;

        if (message.attachment && message.attachment.type === "photo") {
            return (
                <View style={Main.mediumShadow}>
                    <ProgressiveImage source={{uri: message.attachment.uid}}
                                      style={{
                                          height: 250,
                                          borderRadius: 30,
                                          borderBottomRightRadius: otherSender ? 30 : 0,
                                          borderBottomLeftRadius: otherSender ? 0 : 30,
                                          width: 200
                                      }}/>
                    <Text style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        alignSelf: 'flex-end',
                        paddingTop: 1,
                        paddingLeft: 10,
                        fontSize: 12,
                        color: Colors.WHITE
                    }}>
                        {this.getTime(message.date_sent)}
                    </Text>
                </View>
            )
        }


        return (
            <View style={[styles.message, (otherSender ? styles.messageToLeft : styles.messageToRight)]}>
                <LinearGradient
                    start={{x: 1, y: 0}} end={{x: 0.5, y: 1.1}}
                    colors={otherSender ? ["#05A5E7", "#058FC7"] : [Colors.SECONDARY_COLOR, Colors.PRIMARY_COLOR]}
                    style={[styles.message, (otherSender ? styles.messageToLeft : styles.messageToRight)]}>
                    <Fragment>
                        <Text style={[styles.messageText, (otherSender ? styles.selfToLeft : styles.selfToRight)]}>
                            {message.body || ' '}
                        </Text>

                    </Fragment>

                    <Text style={[styles.dateSent, otherSender ? {left:0} : {right:5}]}>
                        {this.getTime(message.date_sent)}
                    </Text>

                </LinearGradient>
            </View>
        )

    }

    render() {
        const {message, otherSender, user} = this.props;
        return (
            <View style={[styles.container, (otherSender ? styles.positionToLeft : styles.positionToRight)]}>
                {otherSender &&
                    <UserIcon
                        id={message.id}
                        onPress={() => NavigationService.showProfileDetail(message.sender)}
                        photo={message.sender ? message.sender.avatar.uri : null}
                        name={message.sender ? message.sender.full_name : ""}
                        iconSize="small"
                    />
                }

                {this.renderBody()}
                {!otherSender && (
                    <View style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 0,
                        right: 15,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome name={"check"} color={message.read ? "#3CBBFF" : Colors.GRAY} size={10}/>

                    </View>
                )}


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    positionToLeft: {
        justifyContent: 'flex-start'
    },
    positionToRight: {
        justifyContent: 'flex-end'
    },
    message: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 15
    },
    messageToLeft: {
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 5,
        maxWidth: fullWidth - 90,
        minWidth:50,
        borderBottomLeftRadius: 2,
    },
    messageToRight: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 5,
        minWidth:50,
        maxWidth: fullWidth - 55,
        alignItems:'flex-end',
        justifyContent:'flex-end',
        borderBottomRightRadius: 2,
    },
    messageText: {
        padding: 5,
        fontSize: 16,
        textAlign:'left',
        color: 'white'
    },
    selfToLeft: {
        alignSelf: 'flex-start'
    },
    selfToRight: {
        alignSelf: 'flex-end'
    },
    dateSent: {
        position:'absolute',
        bottom:2,
        alignSelf: 'flex-end',
        paddingTop: 1,
        paddingLeft: 10,
        paddingRight: 5,
        fontSize: 10,
        color: Colors.WHITE
    }
})
