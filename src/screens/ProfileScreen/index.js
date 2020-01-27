import React, {Component} from "react";
import {Text, View} from "react-native";
import {Main, Colors, Dimensions} from "../../styles/index";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import BottomSwiper from "./BottomSwiper";
import LinearGradient from "react-native-linear-gradient";
import TouchableScale from "../../components/TouchableScale";
import NavigationService from "../../services/NavigationService";
import {connect} from "react-redux";
import UserService from "../../services/UserService";
import ImagePicker from 'react-native-image-picker';
import Loader from "../../components/Loader";
import ProgressiveImage from "../../components/ProgressiveImage";
import {fetchUser} from "../../utils/store/actions/user";
import RoundButton from "../../components/RoundButton";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,

        }
    }

    selectAvatar() {
        const options = {
            title: 'Select Avatar',
            maxWidth: 800,
            maxHeight: 800,
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({uploading: true});
                UserService.updateAvatar(response).then(this.props.fetchUser).catch(e => {
                }).finally(e => {
                    this.setState({uploading: false})
                })
            }
        });
    }

    render() {
        const {user} = this.props;

        const {SCREEN_HEIGHT, SCREEN_WIDTH} = Dimensions;
        return (
            <View style={[Main.container, {backgroundColor: Colors.LIGHT_GRAY}]}>

                <View style={Main.smallShadow}>
                    <View style={{
                        height: SCREEN_HEIGHT / 2,
                        alignSelf: 'center',
                        width: SCREEN_WIDTH,
                        overflow: 'hidden',
                    }}>
                        <View style={{
                            borderRadius: SCREEN_WIDTH,
                            width: SCREEN_WIDTH * 2,
                            height: SCREEN_WIDTH * 2,
                            marginLeft: -(SCREEN_WIDTH / 2),
                            position: 'absolute',
                            bottom: 0,
                            overflow: 'hidden'

                        }}>
                            <View style={{
                                height: SCREEN_HEIGHT / 2,
                                width: SCREEN_WIDTH,
                                position: 'absolute',
                                bottom: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: SCREEN_WIDTH / 2,
                                backgroundColor: '#FFF'
                            }}>
                                <TouchableScale onPress={() => this.selectAvatar()}>
                                    <View style={{
                                        width: 140,
                                        height: 140,
                                        borderRadius: 70
                                    }}>
                                        {this.state.uploading ? <Loader size={200}/> :
                                            <ProgressiveImage style={{width: null,
                                                backgroundColor: Colors.GRAY, height: "100%", borderRadius: 70}}
                                                              source={{uri: user.avatar}}/>
                                        }
                                    </View>


                                </TouchableScale>
                                <View>
                                    <Text style={{fontSize: 30, fontWeight: '600', marginTop: 10,}}>{user.full_name}</Text>
                                </View>


                                <View style={{
                                    justifyContent: 'center',
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <TouchableScale onPress={() => NavigationService.showSettings()}>
                                        <View style={[Main.profileTopButtonLeft, Main.smallShadow]}>
                                            <IconFontAwesome name='cog' style={{color: Colors.GRAY, fontSize: 30}}/>
                                        </View>
                                    </TouchableScale>


                                    <TouchableScale onPress={() => this.selectAvatar()}>
                                        <View
                                            style={[Main.profileTopButtonMiddle, Main.smallShadow]}>
                                            <LinearGradient
                                                start={{x: 1, y: 0}} end={{x: 0.5, y: 1.1}}
                                                colors={[Colors.PRIMARY_COLOR, Colors.SECONDARY_COLOR]}
                                                style={{
                                                    borderRadius: 100,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flex: 1,
                                                    width: '100%',

                                                }}>
                                                <IconFontAwesome name='camera' style={{color: "#FFF", fontSize: 40}}/>
                                            </LinearGradient>

                                            <View style={[Main.smallShadow, {
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: 24,
                                                height: 24,
                                                borderRadius: 12,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#FFF'
                                            }]}>
                                                <IconFontAwesome name='plus' style={{
                                                    color: Colors.PRIMARY_COLOR,
                                                    fontSize: 15
                                                }}/>

                                            </View>
                                        </View>
                                    </TouchableScale>

                                    <TouchableScale onPress={() => NavigationService.showEditInfo()}>
                                        <View style={[Main.profileTopButtonRight, Main.smallShadow]} >
                                            <IconFontAwesome name='pencil' style={{color: Colors.GRAY, fontSize: 30}}/>
                                        </View>
                                    </TouchableScale>
                                </View>


                            </View>

                        </View>

                    </View>
                </View>

                <View style={{flex: 1, paddingBottom:40, alignItems: 'center', justifyContent: 'center'}}>
                    {/*<View style={{flex: 2,}}>*/}
                        {/*<BottomSwiper/>*/}
                    {/*</View>*/}
                    {/*<RoundButton label={"Discovery Settings"} onPress={() => console.log("settings")}/>*/}
                </View>


            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        isLogin: state.auth.isLogin,
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchUser: user => dispatch(fetchUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

