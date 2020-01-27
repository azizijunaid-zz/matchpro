import React, {Component} from "react";

import {Image, Text, View, StyleSheet} from "react-native";
import {Dimensions, Colors} from "../../../../styles/index";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import TouchableScale from "../../../../components/TouchableScale";
import LinearGradient from "react-native-linear-gradient";
import {Main} from "../../../../styles/index";
import Swiper from "react-native-swiper/index";
import Chat from "../../../../services/ChatService";
import NavigationService from "../../../../services/NavigationService";
import {addNewDialog} from "../../../../utils/store/actions/dialogs";
import TimeAgo from "../../../../components/TimeAgo";
import ProgressiveImage from "../../../../components/ProgressiveImage";
import Loader from "../../../../components/Loader";

export default class MatchCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat_loading: false,
            like_loading: false
        }
    }


    createDialog(user) {
        this.setState({chat_loading: true});
        const dialogType = 3;
        Chat.createConversation({
            type: dialogType,
            occupants_ids: [user.cc_id],
            name: user.full_name
        })
            .then(dialog => {
                addNewDialog(dialog);
                this.toChat(dialog)
            })
            .catch(e => {
                // alert(`Error.\n\n${JSON.stringify(e)}`)
            })
            .finally(e => {
                this.setState({chat_loading: false})
            })
    }

    toChat(dialog) {
        NavigationService.showChatScreen(this.props.componentId, dialog);

    }

    render() {
        const {full_name, avatar, created_at} = this.props.match;


        return (
            <View style={{
                height: Dimensions.SCREEN_HEIGHT / 100 * 70,
                borderBottomColor: Colors.GRAY,
                borderBottomWidth: StyleSheet.hairlineWidth,
            }}>
                <TouchableScale onPress={() => NavigationService.showProfileDetail(this.props.match)}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <ProgressiveImage style={{
                                height: 50,
                                width: 50,
                                borderRadius: 25,
                                backgroundColor: Colors.GRAY
                            }} source={{uri: avatar}}/>
                        </View>
                        <View style={{flex: 3, alignItems: 'flex-start', justifyContent: 'center',}}>
                            <Text style={{
                                textAlign: 'center',
                                color: Colors.DARK_GRAY,
                                fontWeight: '600',
                                fontSize: 20
                            }}>{full_name}</Text>
                            <Text style={{color: Colors.GRAY}}>New match</Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <TouchableScale>
                                {/*<IconFontAwesome name={"ellipsis-h"} color={Colors.GRAY} size={30}/>*/}
                            </TouchableScale>
                        </View>

                    </View>
                </TouchableScale>
                <View style={{flex: 1, marginTop: 10,}}>
                    <Swiper showsButtons={false}
                            dotColor={"rgba(0,0,0,0.5)"}
                            paginationStyle={{position: 'absolute', margin: 20,}}
                            activeDotColor={"#FFF"}
                    >

                        <ProgressiveImage style={{width: "100%", height: "100%",}}
                                          source={{uri: avatar}}/>
                    </Swiper>
                    <View style={{
                        position: 'absolute', flexDirection: 'row', right: 10,
                        bottom: -30,
                    }}>

                        {/*<TouchableScale>*/}
                        {/*<View style={[{*/}
                        {/*width: 60, marginRight: 10, height: 60,*/}
                        {/*}, Main.smallShadow]}>*/}
                        {/*<LinearGradient*/}
                        {/*start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}*/}

                        {/*colors={['#72FF6D', '#14B095']}*/}
                        {/*style={{*/}
                        {/*flex: 1,*/}
                        {/*borderRadius: 30,*/}
                        {/*alignItems: 'center',*/}
                        {/*justifyContent: 'center'*/}
                        {/*}}>*/}
                        {/*{this.state.like_loading ? <ActivityIndicator/> :*/}
                        {/*<IconFontAwesome name='heart' style={{*/}
                        {/*color: Colors.WHITE,*/}
                        {/*fontSize: 30*/}
                        {/*}}/>*/}
                        {/*}*/}

                        {/*</LinearGradient>*/}

                        {/*</View>*/}
                        {/*</TouchableScale>*/}

                        <TouchableScale onPress={() => this.createDialog(this.props.match)}>
                            <View style={[{
                                width: 60, height: 60,
                            }, Main.smallShadow]}>
                                <LinearGradient
                                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                    colors={['#058FC7', '#05A5E7']}
                                    style={{
                                        flex: 1,
                                        borderRadius: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>

                                    {this.state.chat_loading ? <Loader size={50} color={Colors.WHITE}/> :
                                        <IconFontAwesome name='comment' style={{
                                            color: Colors.WHITE,
                                            fontSize: 30
                                        }}/>
                                    }

                                </LinearGradient>

                            </View>
                        </TouchableScale>
                    </View>


                </View>
                <View style={{height: 70, padding: 10, justifyContent: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <IconFontAwesome name='map-marker' style={{
                            color: Colors.GRAY,
                            fontSize: 18,
                            marginBottom: 5,
                        }}/>
                        <Text style={{paddingLeft: 5, fontSize: 15, fontWeight: '400', color: Colors.GRAY}}>1
                            Kilometer away</Text>
                    </View>
                    <TimeAgo style={{fontSize: 15, fontWeight: '400', marginTop: 5, color: Colors.GRAY}}
                             time={created_at}/>
                </View>
            </View>
        )
    }
}