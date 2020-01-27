import React, {Component} from "react";
import Colors from "../../styles/colors";
import Main from "../../styles/main";
import NavigationService from "../../services/NavigationService";
import Dimensions from "../../styles/dimensions";
import TouchableScale from "../../components/TouchableScale";
import {Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ProgressiveImage from "../../components/ProgressiveImage";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Chat from "../../services/ChatService";
import {addNewDialog} from "../../utils/store/actions/dialogs";
import Loader from "../../components/Loader";

export default class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_loading: false,
            like_loading: false
        }
    }


    createDialog = (user) => {
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

    toChat = (dialog) => {
        NavigationService.showChatScreen(this.props.componentId, dialog);

    }

    render() {


        const {user} = this.props;
        return (
            <TouchableScale onPress={() => NavigationService.showProfileDetail(user)}>
                <View style={[{
                    width: Dimensions.SCREEN_WIDTH / 2 - 20,
                    borderRadius: 5,
                    margin: 5,
                    height: Dimensions.SCREEN_WIDTH / 2,
                }, Main.mediumShadow]}>
                    <LinearGradient
                        start={{x: 0.5, y: 0.20}} end={{x: 0.5, y: 1.0}}
                        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                        style={{
                            zIndex: 999,
                            position: 'absolute',
                            height: Dimensions.SCREEN_WIDTH / 2,
                            width: '100%',
                            bottom: 0,
                            top: 0,
                            right: 0,
                            left: 0,
                            borderRadius: 5,

                        }}/>
                    <ProgressiveImage source={{uri: user.avatar}}
                                      style={{height: '100%', borderRadius: 5,}}/>

                    <View style={[{
                        position: 'absolute',
                        zIndex: 9999,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        top: 5,
                        right: 5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                        Main.smallShadow]}>
                        <TouchableScale onPress={() => this.createDialog(user)}>

                            <LinearGradient
                                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                colors={[Colors.PRIMARY_COLOR, Colors.SECONDARY_COLOR]}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40,
                                    width: 40,
                                    borderRadius: 20,

                                }}>


                                {this.state.chat_loading ? <Loader size={50} color={Colors.WHITE}/> :
                                    <IconFontAwesome name='comment' style={{
                                        color: Colors.WHITE,
                                        fontSize: 20
                                    }}/>
                                }

                            </LinearGradient>
                        </TouchableScale>

                    </View>

                    <View style={{position: 'absolute', zIndex: 9999, bottom: 5, left: 10,}}>
                        <Text style={{color: Colors.WHITE, fontSize: 18}}>{user.full_name}</Text>
                    </View>
                </View>
            </TouchableScale>
        )

    }

}