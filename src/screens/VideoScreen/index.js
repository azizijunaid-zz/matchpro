import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import {RTCView} from 'react-native-webrtc';
import {connect} from 'react-redux'
import ToolBar from './ToolBar'
import CallingLoader from './CallingLoader'
import Colors from "../../styles/colors";

class VideoScreen extends React.Component {

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.GRAY}}>
                    {
                        this.props.videoStreamsDataSource.map((item, i, arr) => (
                                    <View style={[styles.videoViewWrapper, item.userId === "local" && {position:'absolute', zIndex:999, width:100, height:100, borderRadius:50, top:50, right:20, backgroundColor:Colors.WHITE}]} key={i}>
                                        <RTCView  objectFit={"cover"} style={{
                                            height:"100%",
                                            width:"100%",
                                            borderRadius:item.userId === "local" ? 50 : 0,}}
                                                 key={item.userId}
                                                 streamURL={item.stream.toURL()}/>
                                    </View>

                        ))
                    }
                <CallingLoader userIsCalling={this.props.userIsCalling}/>
                <ToolBar  componentId={this.props.componentId}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    videoViewWrapper: {
        flex:1,

    },
});

const mapStateToProps = (state) => {
    // convert map to array
    let dataSource = [];
    Object.keys(state.videosession.videoStreams).map(userId => {
        dataSource.push({userId: userId, stream: state.videosession.videoStreams[userId]})
    });


    return {
        videoStreamsDataSource: dataSource,
        userIsCalling: state.videosession.userIsCalling,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(VideoScreen)
