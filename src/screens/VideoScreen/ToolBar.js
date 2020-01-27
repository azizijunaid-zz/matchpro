import React from 'react'
import {StyleSheet, View, TouchableOpacity, Platform} from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {
    userIsCalling,
    callInProgress,
    videoSessionObtained,
    localVideoStreamObtained,
    clearVideoSession,
    clearVideoStreams,
    muteAudio,
    setMediaDevices
} from '../../utils/store/actions/videosession'
import CallingService from '../../services/CallingService'
import NavigationService from "../../services/NavigationService";
import Colors from "../../styles/colors";
import TouchableScale from "../../components/TouchableScale";

export class ToolBar extends React.Component {

    componentWillMount() {
        const isCallingOrCallInProgress = this.props.isCalling || this.props.activeCall;
        if (!isCallingOrCallInProgress) {
            this.initiateCall();
        }

    }

    initiateCall() {
        CallingService.createVideoSession(this.props.opponentsIds).then(session => {
            this.props.videoSessionObtained(session)

            CallingService.getVideoDevices()
                .then(this.props.setMediaDevices);
            CallingService.getUserMedia(session)
                .then(stream => {
                    this.props.localVideoStreamObtained(stream);
                    this.props.userIsCalling(true);
                    CallingService.initiateCall(this.props.videoSession);
                })
                .catch(err => {
                    console.error("getUserMedia err" + err);
                });
        });
    }

    stopCall() {
        this.props.userIsCalling(false);
        this.props.callInProgress(false);

        CallingService.finishCall(this.props.videoSession);

        this.props.clearVideoSession();
        this.props.clearVideoStreams();
        NavigationService.dismissModal(this.props.componentId)
    }

    switchCamera() {
        CallingService.switchCamera(this.props.localVideoStream);
    }


    muteUnmuteAudio() {
        if (this.props.audioMuted) {
            CallingService.unmuteAudio(this.props.videoSession);
            this.props.muteAudio(false);
        } else {
            CallingService.muteAudio(this.props.videoSession);
            this.props.muteAudio(true);
        }
    }

    render() {
        const isCallingOrCallInProgress = this.props.isCalling || this.props.activeCall;
        const isActiveCall = this.props.activeCall;
        const isTwoCamerasAvailable = this.props.mediaDevices.length > 1;

        const callStartStop = isCallingOrCallInProgress
            ? <TouchableScale style={[styles.buttonContainer, styles.buttonCallEnd]} onPress={() => this.stopCall()}>
                <MaterialIcon name="call-end" size={38} color="white"/>
            </TouchableScale>
            : <TouchableOpacity style={[styles.buttonContainer, styles.buttonCall]} onPress={() => this.initiateCall()}>
                <MaterialIcon name="call" size={38} color="white"/>
            </TouchableOpacity>;

        return (
            <View style={styles.container}>
                {callStartStop}
                {isActiveCall &&
                <TouchableOpacity style={[styles.buttonContainer, styles.buttonMute]}
                                  onPress={() => this.muteUnmuteAudio()}>
                    {this.props.audioMuted
                        ? <FontAwesome name="microphone" size={38} color="white"/>
                        : <FontAwesome name="microphone-slash" size={38} color="white"/>
                    }
                </TouchableOpacity>
                }
                {isActiveCall &&
                isTwoCamerasAvailable &&
                <TouchableOpacity style={[styles.buttonContainer, styles.buttonSwitch]}
                                  onPress={() => this.switchCamera()}>
                    <MaterialCommunityIcon name="video-switch" size={38} color="white"/>
                </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        height: 60,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 100
    },
    buttonContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonCall: {
        backgroundColor: 'forestgreen'
    },
    buttonCallEnd: {
        backgroundColor: Colors.PRIMARY_COLOR
    },
    buttonMute: {
        backgroundColor: Colors.GRAY,
        paddingTop: Platform.select({android: 0, ios: 5})
    },
    buttonSwitch: {
        backgroundColor: 'gold',
        paddingTop: Platform.select({android: 0, ios: 5})
    },
})

const mapStateToProps = (state) => {
    let jointProps = {};

    if (state.videosession) {
        jointProps.videoSession = state.videosession.videoSession;
        jointProps.isCalling = state.videosession.userIsCalling;
        jointProps.activeCall = state.videosession.callInProgress;
        jointProps.audioMuted = state.videosession.audioMuted;
        jointProps.mediaDevices = state.videosession.mediaDevices;
        jointProps.activeVideoDevice = state.videosession.activeVideoDevice;
        jointProps.localVideoStream = state.videosession.localVideoStream;
    }

    jointProps.opponentsIds = state.user.opponentsIds;

    return jointProps;
}

const mapDispatchToProps = (dispatch) => ({
    userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
    callInProgress: inProgress => dispatch(callInProgress(inProgress)),
    videoSessionObtained: videoSession => dispatch(videoSessionObtained(videoSession)),
    clearVideoSession: () => dispatch(clearVideoSession()),
    clearVideoStreams: () => dispatch(clearVideoStreams()),
    localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
    muteAudio: mute => dispatch(muteAudio(mute)),
    setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
