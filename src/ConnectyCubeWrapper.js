import React, {Component} from 'react'
import {
    AppState,
    Alert,
} from 'react-native'
import NavigationService from "./services/NavigationService";
import ConnectyCube from 'connectycube-reactnative'
import Message from './utils/store/models/Message'
import User from './services/UserService'
import Chat from './services/ChatService'
import PushNotificationService from './services/PushNotification';
import {connect} from 'react-redux'
import CallingService from '../src/services/CallingService'
import {userLogin, userSetLocation, userSetSession} from '../src/utils/store/actions/user'
import {fetchDialogs, sortDialogs} from '../src/utils/store/actions/dialogs'
import {fetchMatches, sortMatches} from '../src/utils/store/actions/matches'
import {chatConnected, chatDisconnected} from '../src/utils/store/actions/connection'
import {pushMessage} from '../src/utils/store/actions/messages'
import Geolocation from '@react-native-community/geolocation';
import {
    videoSessionObtained,
    userIsCalling,
    callInProgress,
    remoteVideoStreamObtained,
    localVideoStreamObtained,
    clearVideoSession,
    clearVideoStreams,
    setMediaDevices,
    setActiveVideoDevice
} from '../src/utils/store/actions/videosession'
import {fetchLanguages, setLanguage} from "./utils/store/actions/languages";
import {LANGUAGES} from "./config";
import Loader from "./components/Loader";
import _ from "lodash";

class ConnectyCubeWrapper extends Component {

    static options(passProps) {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            appIsActive: true,
            waitConnect: false,
            loading: true,
        }
    }

    componentDidMount() {
        this.props.fetchLanguages(LANGUAGES);
        const defaultLang = _.find(LANGUAGES, {default:true});
        this.props.setLanguage(defaultLang);

        User.autologin()
            .then(this.props.userLogin)
            .then(e => {
                User.getCurrentSession().then(this.props.userSetSession).finally(e => {
                    this.setState({loading: false})

                    this.watchLocation = Geolocation.watchPosition((position) => {
                        const data = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,

                        };
                        this.props.userSetLocation(data);
                        User.updateLocation(data);
                    });

                })
            })
            .catch(() => NavigationService.showLogin());


        AppState.addEventListener('change', this._handleAppStateChange.bind(this));

        this.setupListeners();

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    componentWillReceiveProps(props) {
        this._connect(props)
    }

    setupListeners() {
        ConnectyCube.chat.onContactListListener = this.onContactListListener.bind(this);
        ConnectyCube.videochat.onCallListener = this.onCallListener.bind(this);
        ConnectyCube.videochat.onUserNotAnswerListener = this.onUserNotAnswerListener.bind(this);
        ConnectyCube.videochat.onAcceptCallListener = this.onAcceptCallListener.bind(this);
        ConnectyCube.videochat.onRemoteStreamListener = this.onRemoteStreamListener.bind(this);
        ConnectyCube.videochat.onRejectCallListener = this.onRejectCallListener.bind(this);
        ConnectyCube.videochat.onStopCallListener = this.onStopCallListener.bind(this);
        ConnectyCube.videochat.onSessionConnectionStateChangedListener = this.onSessionConnectionStateChangedListener.bind(this);
    }

    onContactListListener(userId, type) {
        console.error({userId, type});

    }

    onCallListener(session, extension) {
        console.log('onCallListener, extension: ', extension);
        const {
            videoSessionObtained,
            setMediaDevices,
            localVideoStreamObtained,
            callInProgress
        } = this.props;

        videoSessionObtained(session);

        Alert.alert(
            'Incoming call',
            'from user',
            [
                {
                    text: 'Accept', onPress: () => {
                        console.log('Accepted call request');
                        CallingService.getVideoDevices()
                            .then(setMediaDevices);

                        CallingService.getUserMedia(session).then(stream => {
                            localVideoStreamObtained(stream);
                            CallingService.acceptCall(session);
                            callInProgress(true);
                            NavigationService.showVideoScreen();

                        });
                    }
                },
                {
                    text: 'Reject',
                    onPress: () => {
                        console.log('Rejected call request');
                        CallingService.rejectCall(session);
                    },
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    }

    onUserNotAnswerListener(session, userId) {
        CallingService.processOnUserNotAnswer(session, userId);
        this.props.userIsCalling(false);
        NavigationService.dismissAllModals()
    }

    onAcceptCallListener(session, userId, extension) {
        CallingService.processOnAcceptCallListener(session, extension);
        this.props.callInProgress(true);
    }

    onRemoteStreamListener(session, userID, remoteStream) {
        this.props.remoteVideoStreamObtained(remoteStream, userID);
        this.props.userIsCalling(false);
    }

    onRejectCallListener(session, userId, extension) {
        CallingService.processOnRejectCallListener(session, extension);

        this.props.userIsCalling(false);

        this.props.clearVideoSession();
        this.props.clearVideoStreams();
        NavigationService.dismissAllModals()

    }

    onStopCallListener(session, userId, extension) {
        this.props.userIsCalling(false);
        this.props.callInProgress(false);
        this.props.clearVideoSession();
        this.props.clearVideoStreams();
        CallingService.processOnStopCallListener(session, extension);
        NavigationService.dismissAllModals()
    }

    onSessionConnectionStateChangedListener(session, userID, connectionState) {
        console.log('onSessionConnectionStateChangedListener', userID, connectionState);
    }


    /*               *
     * Chat activity *
     *               */
    _handleAppStateChange(nextAppState) {
        if (nextAppState === 'active') {
            this.setState({appIsActive: true})
            this._reconnect()
        } else {
            this.setState({appIsActive: false})
            this._disconnect()
        }
    }

    _connect(props) {
        const {connected, user, chatConnected, fetchDialogs} = props
        const {waitConnect, appIsActive} = this.state

        if (appIsActive && user && !connected && !waitConnect) {
            this.setState({waitConnect: true})

            Chat.getConversations()
                .then(dialogs => {
                    Chat.connect(user, dialogs)
                    fetchDialogs(dialogs)
                })
                .then(() => {
                    chatConnected()
                    this._setupListeners()
                })
                .catch(e => {
                    // alert(`Error.\n\n${JSON.stringify(e)}`)
                })
                .then(() => this.setState({waitConnect: false}))

            // new PushNotificationService(this.onNotificationListener.bind(this))
        }
    }

    _reconnect() {
        const {connected, user, chatConnected} = this.props
        const {waitConnect, appIsActive} = this.state

        if (appIsActive && user && !connected && !waitConnect) {
            this.setState({waitConnect: true})

            User.matches()
                .then(this.props.fetchMatches)
                .catch(e => {

                })
                .finally(e => {

                });

            Chat.getConversations()
                .then(dialogs => {
                    Chat.connect(user, dialogs)
                    fetchDialogs(dialogs)
                })
                .then(chatConnected)
                .catch(e => {
                    // alert(`Error.\n\n${JSON.stringify(e)}`)
                })
                .then(() => this.setState({waitConnect: false}))
        }
    }

    _disconnect() {
        this.props.chatDisconnected();
        Chat.disonnect()
    }

    _setupListeners() {
        ConnectyCube.chat.onDisconnectedListener = this.props.chatDisconnected
        ConnectyCube.chat.onReconnectedListener = this.props.chatDisconnected
        ConnectyCube.chat.onMessageListener = this._onMessageListener.bind(this)
        // ConnectyCube.chat.onSentMessageCallback = this._onSentMessage.bind(this)
    }

    _onMessageListener(id, msg) {
        const {user, selected, pushMessage, sortDialogs} = this.props;
        const message = new Message(msg);
        if (id !== user.id) {
            if (selected.id === message.dialog_id) {
                pushMessage(message);
                sortDialogs(message);
                Chat.readMessage(message.id, message.dialog_id)
            } else {
                sortDialogs(message, true);
                NavigationService.showInAppNotification({title: message.sender.full_name, message: message.body});

            }
        }
    }

    // _onSentMessage(failedMessage, successMessage) {
    // 	if (failedMessage && !successMessage) {
    // 		console.log('Send message - FAIL');
    // 	} else {
    // 		console.log('Send message - SUCCESS');
    // 	}
    // }

    onNotificationListener(notification) {
        // Actions.dialogs()
    }


    render() {
        if (this.state.loading) {
            return (
                <Loader/>
            )
        }
        return this.props.children;
    }
}

const mapStateToProps = (state) => ({
    connected: state.connection,
    user: state.user,
    selected: state.selected,
    dialogs: state.dialogs,
    matches: state.matches,
});

const mapDispatchToProps = (dispatch) => ({
    videoSessionObtained: videoSession => dispatch(videoSessionObtained(videoSession)),
    userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
    callInProgress: inProgress => dispatch(callInProgress(inProgress)),
    remoteVideoStreamObtained: remoteStream => dispatch(remoteVideoStreamObtained(remoteStream)),
    localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
    clearVideoSession: () => dispatch(clearVideoSession()),
    clearVideoStreams: () => dispatch(clearVideoStreams()),
    setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
    setActiveVideoDevice: videoDevice => dispatch(setActiveVideoDevice(videoDevice)),
    chatConnected: () => dispatch(chatConnected()),
    chatDisconnected: () => dispatch(chatDisconnected()),
    userLogin: user => dispatch(userLogin(user)),
    userSetSession: session => dispatch(userSetSession(session)),
    fetchDialogs: dialogs => dispatch(fetchDialogs(dialogs)),
    sortDialogs: (message, count) => dispatch(sortDialogs(message, count)),
    pushMessage: message => dispatch(pushMessage(message)),
    fetchMatches: matches => dispatch(fetchMatches(matches)),
    fetchLanguages: languages => dispatch(fetchLanguages(languages)),
    setLanguage: language => dispatch(setLanguage(language)),
    userSetLocation: location => dispatch(userSetLocation(location)),

});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectyCubeWrapper)
