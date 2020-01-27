import React, {Component} from "react";
import {FlatList, RefreshControl, Text, View} from "react-native";
import UserService from "../../../services/UserService";
import {connect} from "react-redux";
import {fetchMatches} from "../../../utils/store/actions/matches";
import {userLogin} from "../../../utils/store/actions/user";
import MatchCard from "./components/MatchCard";
import {addNewDialog} from "../../../utils/store/actions/dialogs";
import Placeholder from "../../../components/Placeholder";

class MatchesScreen extends Component{

    state = {
        refreshing: false
    };

    _onRefresh = () => {
        this.setState({refreshing: true})

        UserService.matches()
            .then(matches => {
                this.props.fetchMatches(matches)
            })
            .catch(e => console.error(e))
            .finally(e => {
                this.setState({refreshing: false})
            })
    }

    _renderRefreshControl() {
        return (
            <RefreshControl
                colors={["red", "green", "blue"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh} />
        )
    }

    _renderMatch = (match) => {
        return <MatchCard match={match} componentId={this.props.componentId} />
    };



    render(){
        const {translations} = this.props;

        const matches = this.props.matches || [];

        if(!matches.length){
            return(
                <Placeholder refreshControl={this._renderRefreshControl()} heading={translations.placeholderTitle} message={translations.placeholderMessage}/>
            )
        }

        return(
            <View style={{flex:1}}>
                <FlatList
                    data={matches}
                    keyExtractor={ item => item.id }
                    renderItem={ ({ item }) => this._renderMatch(item) }
                    refreshControl={this._renderRefreshControl()}
                />
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    matches: state.matches,
    translations: state.languages.selected.translations.matchScreen

});

const mapDispatchToProps = (dispatch) => ({
    fetchMatches: matches => dispatch(fetchMatches(matches)),
    userLogin: user => dispatch(userLogin(user)),
    addNewDialog: dialog => dispatch(addNewDialog(dialog)),

});

export default connect(mapStateToProps, mapDispatchToProps)(MatchesScreen)
