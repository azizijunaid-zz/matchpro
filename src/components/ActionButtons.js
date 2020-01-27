import React, {Component} from "react";
import {SWIPE_ACTIONS} from "../config";
import {Colors} from "../styles";
import {TouchableOpacity, View} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import UserService from "../services/UserService";
import Loader from "./Loader";


export default class ActionButtons extends Component {


    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            map: false,
        }
    }

    onMapPress(){
        if(this.state.map){
            this.setState({
                map: false,
            }, () => {
                this.props.onMapPress(false)
            })
            return;

        }

        this.setState({
            map: true,
        }, () => {
            this.props.onMapPress(true)
        })

    }
    postLike = (like, user_id) => {
        if (!user_id) {
            return;
        }

        this.setState({loading: true})


        const data = {
            like: like,
            user_id: user_id
        };

        UserService.like(data).then(res => {

        }).finally(e => {
            this.setState({loading: false})
            this.props.onSuccess();
        })

    }

    render() {


        const {user_id} = this.props;
        const {loading} = this.state;

        if(loading){
            return(
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Loader color={Colors.WHITE} size={100}/>
                </View>
            )
        }

        return (
            <View style={{
                zIndex: 20,
                justifyContent: 'center',
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 5
            }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 30,
                        backgroundColor: "#FFF",
                        marginHorizontal: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowOpacity: 0.15,
                        shadowRadius: 20,
                        shadowColor: Colors.GRAY,
                        elevation: 5,
                        shadowOffset: {height: 10, width: 0}
                    }}>
                    <IconFontAwesome name='undo' style={{
                        color: "#FFBF42",
                        fontSize: 30
                    }}/>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.postLike(SWIPE_ACTIONS.NOPE, user_id)}
                    activeOpacity={0.8}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#FFF",
                        marginHorizontal: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowOpacity: 0.15,
                        shadowRadius: 20,
                        shadowColor: Colors.GRAY,
                        elevation: 5,
                        shadowOffset: {height: 10, width: 0}
                    }}>
                    <IconFontAwesome name='times' style={{
                        color: Colors.PRIMARY_COLOR,
                        fontSize: 30
                    }}/>

                </TouchableOpacity>

                <TouchableOpacity

                    activeOpacity={0.8}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#FFF",
                        marginHorizontal: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowOpacity: 0.15,
                        shadowRadius: 20,
                        shadowColor: "#777",
                        elevation: 5,
                        shadowOffset: {height: 10, width: 0}
                    }}
                >

                    <IconFontAwesome name='star' style={{
                        color: "#3CBBFF",
                        fontSize: 30
                    }}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.postLike(SWIPE_ACTIONS.LIKE, user_id)}
                    activeOpacity={0.2}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "#FFF",
                        marginHorizontal: 7,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowOpacity: 0.15,
                        shadowRadius: 20,
                        shadowColor: Colors.GRAY,
                        elevation: 5,
                        shadowOffset: {height: 10, width: 0}
                    }}>

                    <IconFontAwesome name='heart' style={{
                        color: Colors.PRIMARY_COLOR,
                        fontSize: 30
                    }}/>

                </TouchableOpacity>
                {this.props.onMapPress && (
                    <TouchableOpacity
                        onPress={() => this.onMapPress()}
                        activeOpacity={0.8}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#FFF",
                            marginHorizontal: 7,
                            alignItems: "center",
                            justifyContent: "center",
                            shadowOpacity: 0.15,
                            shadowRadius: 20,
                            shadowColor: Colors.GRAY,
                            elevation: 5,
                            shadowOffset: {height: 10, width: 0}
                        }}>

                        <IconFontAwesome name='globe' style={{
                            color: this.state.map ? Colors.SECONDARY_COLOR : Colors.LIGHT_GRAY,
                            fontSize: 30
                        }}/>

                    </TouchableOpacity>
                )}

            </View>
        )
    }


}

