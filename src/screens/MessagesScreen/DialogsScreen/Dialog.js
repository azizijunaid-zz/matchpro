import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import ProfileIcon from '../../../components/ProfileIcon';
import DialogTitles from './DialogTitles';
import DialogLastDate from './DialogLastDate';
import DialogUnreadCounter from './DialogUnreadCounter';
import NavigationService from '../../../services/NavigationService';
import Colors from "../../../styles/colors";
import Main from "../../../styles/main";
import UserService from "../../../services/UserService";
import _ from "lodash";

export default class Dialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar:null
        }
    }

    toChat(dialog) {
        NavigationService.showChatScreen(this.props.componentId, dialog);
    }

    componentDidMount(){
        const {dialog} = this.props;
        const ids = _.reject(dialog.occupants_ids, (o) => {
            return o === this.props.user.id;
        });
        UserService.getUserById(ids[0]).then(res => this.setState({avatar: res.avatar}))

    }
    render() {
        const {dialog} = this.props

        return (
            <TouchableOpacity onPress={() => this.toChat(dialog)}>
                <View style={[styles.container, styles.border]}>
                    <View style={Main.smallShadow}>
                        <ProfileIcon
                            photo={dialog.photo || this.state.avatar}
                            name={dialog.name}
                            id={dialog.id}
                            iconSize="large"/>
                        <View style={{position:'absolute', left:0, top:5,}}>
                            <DialogUnreadCounter
                                unreadMessagesCount={dialog.unread_messages_count}/>
                        </View>
                    </View>
                    <DialogTitles
                        name={dialog.name}
                        message={dialog.last_message}/>
                    <View style={styles.infoContainer}>
                        <DialogLastDate
                            lastDate={dialog.last_message_date_sent}
                            lastMessage={dialog.last_message}
                            updatedDate={dialog.updated_date}/>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    border: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.LIGHT_GRAY
    },
    infoContainer: {
        maxWidth: 75,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingVertical: 10,
        marginLeft: 5
    }
})
