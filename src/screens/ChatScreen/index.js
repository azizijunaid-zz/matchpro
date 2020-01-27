import React, {Component} from 'react'
import ConnectyCube from 'connectycube-reactnative'
import {
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    Platform,
    View,
    TouchableOpacity, SafeAreaView, ImageBackground, LayoutAnimation
} from 'react-native'
// import SoftInputMode from 'react-native-set-soft-input-mode';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {userLogin, userIsLogging, videoCallOpponentsIds} from '../../utils/store/actions/user'

import {fetchMessages, pushMessage} from '../../utils/store/actions/messages'
import {sortDialogs} from '../../utils/store/actions/dialogs'
import {setSelected, removeSelected} from '../../utils/store/actions/selected'
import Chat from '../../services/ChatService'
import MessageModel from '../../utils/store/models/Message'
import Message from './Message'
import Colors from "../../styles/colors";
import NavigationService from "../../services/NavigationService";
import {Navigation} from "react-native-navigation/lib/dist/index";
import _ from "lodash";
import Loader from "../../components/Loader";
import ImagePicker from "react-native-image-picker";
import {LAYOUT_ANIMATION} from "../../config";

class ChatScreen extends Component {


    state = {
        uploading: false,
        inProgress: true,
        messageValue: ''
    }

    componentWillReceiveProps(props) {
        props.setSelected(props.dialog)
    }

    componentWillMount() {
        this.setState({inProgress: true})
        this.props.fetchMessages([])
    }

    componentDidMount() {
        LayoutAnimation.configureNext(LAYOUT_ANIMATION);


        if (Platform.OS === 'android') {
            // SoftInputMode.set(SoftInputMode.ADJUST_RESIZE);
        }

        const {fetchMessages, dialog} = this.props;

        Chat.getHistory(dialog.id)
            .then(fetchMessages)
            .catch(e => {
                // alert(`Error.\n\n${JSON.stringify(e)}`)
            })
            .finally(() => this.setState({inProgress: false}))


        this.navigationEventListener = Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {
            if (buttonId === "video_call") {
                const ids = _.filter(dialog.occupants_ids, (o) => {
                    return o !== this.props.user.id;
                });
                this.props.videoCallOpponentsIds([ids]);
                NavigationService.showVideoScreen()
            }

        });

    }

    componentWillUnmount() {
        this.props.removeSelected()
    }

    onTypeMessage = messageValue => this.setState({messageValue})

    sendMessage = () => {
        const {user, dialog, pushMessage, sortDialogs} = this.props
        const text = this.state.messageValue.trim();
        const date = Math.floor(Date.now() / 1000);

        if (!text) return

        let msg = {
            type: dialog.xmpp_type,
            body: text,
            extension: {
                save_to_history: 1,
                dialog_id: dialog.id,
                sender_id: user.id,
                date_sent: date
            },
            markable: 1
        }

        ConnectyCube.chat.send(dialog.destination, msg);


        const message = new MessageModel(msg);

        pushMessage(message);
        sortDialogs(message);

        this.setState({messageValue: ''})
    };

    sendPhoto = () => {
        const {user, dialog, pushMessage, sortDialogs} = this.props

        const date = Math.floor(Date.now() / 1000)

        const options = {
            title: 'Select a Photo',
            maxWidth: 800,
            maxHeight: 800,
            tintColor: Colors.PRIMARY_COLOR
        };

        ImagePicker.showImagePicker(options, async (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({uploading: true});
                Chat.uploadFile(response).then(res => {

                    const msg = {
                        type: dialog.xmpp_type,
                        body: 'attachment',
                        extension: {
                            save_to_history: 1,
                            dialog_id: dialog.id,
                            sender_id: user.id,
                            date_sent: date,
                            attachments: [{uid: res, type: 'photo'}]
                        }
                    };

                    ConnectyCube.chat.send(dialog.destination, msg);
                    const message = new MessageModel(msg);
                    pushMessage(message);
                    sortDialogs(message);

                }).catch(e => {
                    console.error(e)
                }).finally(e => {
                    this.setState({uploading: false})
                })
            }
        });
    }

    _renderMessageItem(message) {
        isOtherSender = message.sender_id !== this.props.user.id;

        return <Message otherSender={isOtherSender} user={this.props.user} message={message} key={message.id}/>
    }

    render() {
        const {history, translations} = this.props
        const {messageValue, inProgress, uploading} = this.state

        if (inProgress) {
            return (
                <Loader/>
            )
        }
        return (
            <SafeAreaView style={{flex: 1,}}>
                <ImageBackground source={require("../../../assets/chat_background.jpg")} style={{width:'100%', height:"100%",}}>

                <KeyboardAvoidingView
                    style={{flex: 1, backgroundColor: 'transparent'}}
                    behavior={Platform.OS === 'ios' ? "padding" : null}
                    keyboardVerticalOffset={87}>

                    <FlatList inverted
                              data={history}
                              keyExtractor={item => item.id}
                              renderItem={({item}) => this._renderMessageItem(item)}/>

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.leftButton} onPress={this.sendPhoto}>
                            {uploading ? <Loader size={35}/> :
                                <Icon name="camera" size={25} color={Colors.GRAY}/>
                            }
                        </TouchableOpacity>
                        <AutoGrowingTextInput
                            style={styles.textInput}
                            placeholder={translations.inputPlaceholder}
                            value={messageValue}
                            onChangeText={this.onTypeMessage}
                            maxHeight={170}
                            minHeight={50}
                            enableScrollToCaret/>
                        <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
                            {inProgress ? <Loader size={35}/> :
                                <Icon name="reply" size={30} color={Colors.PRIMARY_COLOR}/>
                            }
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                </ImageBackground>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHT_GRAY,
        backgroundColor:Colors.WHITE,
        padding: 12,
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        paddingTop: 25
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '300',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingTop: Platform.OS === 'ios' ? 14 : 10,
        paddingBottom: Platform.OS === 'ios' ? 14 : 10,
        backgroundColor: 'whitesmoke'
    },
    leftButton: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 40,
        height: 50,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    history: state.messages,
    user: state.user,
    translations: state.languages.selected ? state.languages.selected.translations.chatScreen : {},

});

const mapDispatchToProps = (dispatch) => ({
    fetchMessages: history => dispatch(fetchMessages(history)),
    pushMessage: message => dispatch(pushMessage(message)),
    sortDialogs: message => dispatch(sortDialogs(message)),
    setSelected: dialog => dispatch(setSelected(dialog)),
    removeSelected: () => dispatch(removeSelected()),
    videoCallOpponentsIds: opponentsIds => dispatch(videoCallOpponentsIds(opponentsIds)),

});


export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)


