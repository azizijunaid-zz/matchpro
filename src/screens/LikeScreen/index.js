import React, {Component} from "react";
import {View, LayoutAnimation, ScrollView, RefreshControl} from "react-native";
import {connect} from "react-redux";
import {userLogin} from "../../utils/store/actions/user";
import Placeholder from "../../components/Placeholder";
import {LAYOUT_ANIMATION} from "../../config";
import Card from "./Card";
import {fetchLikes} from "../../utils/store/actions/likes";
import UserService from "../../services/UserService";
import Colors from "../../styles/colors";

class LikeScreen extends Component {

    state = {
        refreshing: false
    };


    componentDidMount(){
         LayoutAnimation.configureNext(LAYOUT_ANIMATION);
        this.getData()
    }
    getData = () => {
        UserService.getLikes().then(this.props.fetchLikes)

    };

    _onRefresh = () => {
        this.setState({refreshing: true})

        UserService.getLikes()
            .then(likes => {
                this.props.fetchLikes(likes)
            })
            .catch(e => console.error(e))
            .finally(e => this.setState({refreshing: false}))
    }

    _renderRefreshControl() {
        return (
            <RefreshControl
                colors={["red", "green", "blue"]}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh} />
        )
    }



    render() {
        const {likes, translations, componentId} = this.props;

        if(!likes.length){
            return(
                <Placeholder refreshControl={this._renderRefreshControl()} heading={translations.placeholderTitle} message={translations.placeholderMessage}/>
            )
        }
        return (
            <ScrollView refreshControl={this._renderRefreshControl()} style={{flex: 1, backgroundColor:Colors.WHITE}}>

                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                    {likes.map(user => (
                            <Card componentId={componentId} user={user}/>
                    ))}
                </View>

            </ScrollView>
        )
    }

}

const mapStateToProps = (state) => ({
    likes: state.likes,
    translations: state.languages.selected.translations.likeScreen

});

const mapDispatchToProps = (dispatch) => ({
    fetchLikes: likes => dispatch(fetchLikes(likes)),
    userLogin: user => dispatch(userLogin(user)),

});

export default connect(mapStateToProps, mapDispatchToProps)(LikeScreen)
