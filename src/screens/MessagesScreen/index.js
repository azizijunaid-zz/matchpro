import React, {Component} from "react";
import {View} from "react-native";
import DialogsScreen from "./DialogsScreen/index";
import ScrollableTabView from "react-native-scrollable-tab-view";
import MatchesScreen from "./MatchesScreen/index";
import Colors from "../../styles/colors";
import {userLogin} from "../../utils/store/actions/user";
import {fetchMatches} from "../../utils/store/actions/matches";
import {connect} from "react-redux";
import {fetchDialogs} from "../../utils/store/actions/dialogs";

class MessagesScreen extends Component {

    render() {
        const {translations} = this.props;

        return (
            <View style={{backgroundColor:Colors.WHITE, flex:1,}}>
                <ScrollableTabView tabBarTextStyle={{fontSize: 20,}} tabBarUnderlineStyle={{height: 0}}
                                   tabBarActiveTextColor={Colors.PRIMARY_COLOR} tabBarInactiveTextColor={Colors.GRAY}>
                    <DialogsScreen tabLabel={translations.messages} componentId={this.props.componentId}/>
                    <MatchesScreen tabLabel={translations.matches} componentId={this.props.componentId}/>
                </ScrollableTabView>
            </View>
        )
    }

}


const mapStateToProps = (state) => ({
    user: state.user,
    translations: state.languages.selected.translations.messagesScreen

});

const mapDispatchToProps = (dispatch) => ({
    fetchMatches: matches => dispatch(fetchMatches(matches)),
    fetchDialogs: dialogs => dispatch(fetchDialogs(dialogs)),
    userLogin: user => dispatch(userLogin(user)),

})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)


