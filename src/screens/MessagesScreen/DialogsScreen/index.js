import React, {Component} from 'react'
import {RefreshControl, StatusBar, FlatList, StyleSheet, View, Text, ScrollView, LayoutAnimation} from 'react-native'
import {connect} from 'react-redux'
import Dialog from './Dialog'
import Chat from '../../../services/ChatService'
import {fetchDialogs} from '../../../utils/store/actions/dialogs'
import {userLogin} from "../../../utils/store/actions/user";
import MatchRoundCard from "../MatchesScreen/components/MatchRoundCard";
import {Colors} from "../../../styles";
import UserService from "../../../services/UserService";
import {fetchMatches} from "../../../utils/store/actions/matches";
import Placeholder from "../../../components/Placeholder";
import {LAYOUT_ANIMATION} from "../../../config";


class DialogsScreen extends Component {
    state = {
        refreshing: false
    };


    componentDidMount(){
        LayoutAnimation.configureNext(LAYOUT_ANIMATION);

    }

    _onRefresh = () => {
        this.setState({refreshing: true})

        Chat.getConversations()
            .then(dialogs => {
                this.props.fetchDialogs(dialogs)
                this.setState({refreshing: false})
            })
            .catch(e => console.error(e))

        UserService.matches()
            .then(matches => {
                this.props.fetchMatches(matches)
                this.setState({refreshing: false})
            })
            .catch(e => console.error(e))

    }

    _renderRefreshControl() {
        return (
            <RefreshControl
                colors={["red", "green", "blue"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}/>
        )
    }

    _renderDialog = (dialog) => {
        return <Dialog user={this.props.user} componentId={this.props.componentId} dialog={dialog}/>
    }

    render() {
        const {dialogs, name, matches, translations} = this.props;

        if(!dialogs.length){
            return(
                <Placeholder heading={translations.placeholderTitle} message={translations.placeholderMessage} refreshControl={this._renderRefreshControl()}/>
            )
        }
        return (
            <ScrollView style={styles.container}
                        refreshControl={this._renderRefreshControl()}
            >
                {matches.length > 0 && (
                    <View>
                        <Text style={{color: Colors.PRIMARY_COLOR, fontWeight: '500', marginTop: 20,}}>New matches</Text>
                        <View style={{height: 100, marginTop:10,}}>
                            <ScrollView horizontal={true}>
                                <View style={{flexDirection: 'row'}}>
                                    {matches.map(item => (
                                        <MatchRoundCard match={item}/>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <Text style={{color: Colors.PRIMARY_COLOR, fontWeight: '500',}}>Messages</Text>

                    </View>
                )}

                <FlatList
                    data={dialogs}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => this._renderDialog(item)}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    dialogs: state.dialogs,
    matches: state.matches,
    user: state.user,
    translations: state.languages.selected.translations.messagesScreen

})

const mapDispatchToProps = (dispatch) => ({
    fetchMatches: matches => dispatch(fetchMatches(matches)),
    fetchDialogs: dialogs => dispatch(fetchDialogs(dialogs)),
    userLogin: user => dispatch(userLogin(user)),

})

export default connect(mapStateToProps, mapDispatchToProps)(DialogsScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white'
    },
    noChats: {
        position: 'absolute',
        alignSelf: 'center',
        top: '42%'
    },
    noChatsText: {
        fontSize: 20
    }
})