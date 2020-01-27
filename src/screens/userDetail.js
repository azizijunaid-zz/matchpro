import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import {Colors, Dimensions} from "../styles/index";
import LinearGradient from "react-native-linear-gradient";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from "react-native-swiper";
import TouchableScale from "../components/TouchableScale";
import NavigationService from "../services/NavigationService";
import ProgressiveImage from "../components/ProgressiveImage";
import ConnectyCube from "connectycube-reactnative";
import TimeAgo from "../components/TimeAgo";
import moment from "moment";
import ActionButtons from "../components/ActionButtons";
import {addNewDialog} from "../utils/store/actions/dialogs";
import {fetchDiscover, removeDiscover} from "../utils/store/actions/discover";
import {connect} from "react-redux";

class UserDetail extends Component {

    state = {
        lastSeen: 0
    };


    componentWillMount() {

        this.getLastSeen()
    }

    getLastSeen() {
        const {data} = this.props;

        if (!data) {
            return;
        }
        ConnectyCube.chat.getLastUserActivity(this.props.data.cc_id ? this.props.data.cc_id : this.props.data.id);
        ConnectyCube.chat.onLastUserActivityListener = (userId, seconds) => {
            const dateTime = moment();
            const lastSeen = dateTime.subtract(seconds, 'seconds');
            this.setState({lastSeen});
        };
    }

    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            const radlat1 = Math.PI * lat1 / 180;
            const radlat2 = Math.PI * lat2 / 180;
            const theta = lon1 - lon2;
            const radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            if (unit==="N") { dist = dist * 0.8684 }
            return Math.round(dist);
        }
    }

    renderDistance(){
        const {data, user, translations} = this.props;
        if(!user.location){
            return;
        }

        return(
            <Text style={{paddingLeft: 5, fontSize: 18, fontWeight: '200', color: Colors.GRAY}}>
                {this.distance(data.lat, data.lng, user.location.lat, user.location.lng, "K")} {translations.kilometersAway}
            </Text>

        )
    }



    renderButtons() {

        return (
            <ActionButtons user_id={this.props.data.id}/>
        )
    }


    render() {
        const {data, translations, dictionary} = this.props;
        if (!data) {
            return (
                <View>

                </View>
            )
        }

        return (
            <View style={{flex:1,}}>
                <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>

                    <View style={{height: Dimensions.SCREEN_HEIGHT / 100 * 60, backgroundColor: '#777'}}>
                        <Swiper showsButtons={false}
                                dotColor={"#ccc"}
                                paginationStyle={{position: 'absolute', margin: 20,}}
                                activeDot={<View style={{
                                    backgroundColor: '#FFF',
                                    flex: 1,
                                    height: 4,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                }}/>}
                                dot={<View style={{
                                    backgroundColor: 'rgba(0,0,0,.2)',
                                    flex: 1,
                                    height: 4,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                }}/>}
                                activeDotColor={"#777"}
                        >

                            <ProgressiveImage style={{width: null, height: "100%",}}
                                              source={{uri: data.avatar}}/>

                        </Swiper>
                        <View style={{
                            position: 'absolute', right: 20,
                            bottom: -30,
                        }}>
                            <TouchableScale onPress={() => NavigationService.dismissModal(this.props.componentId)}>
                                <View style={{
                                    width: 60, height: 60,
                                }}>
                                    <LinearGradient
                                        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}

                                        colors={['#E64579', '#E64579', '#EC7064']}
                                        style={{
                                            flex: 1,
                                            borderRadius: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <IconFontAwesome name='arrow-down' style={{
                                            color: Colors.WHITE,
                                            fontSize: 20
                                        }}/>

                                    </LinearGradient>

                                </View>
                            </TouchableScale>
                        </View>
                    </View>
                    <View style={{flex: 1, padding: 20,}}>
                        <View style={{
                            minHeight: 100,
                            borderBottomColor: Colors.GRAY,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            paddingBottom: 15,
                        }}>
                            <View>
                                <Text
                                    style={{fontSize: 30, fontWeight: '700', color: Colors.DARK_GRAY}}>{data.full_name}
                                    <Text
                                        style={{fontWeight: '200'}}> </Text></Text>

                                <View
                                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Text style={{fontSize: 12, fontWeight: '200', color: Colors.GRAY}}>
                                        {translations.lastSeen}: </Text>
                                    <Text style={{fontSize: 12, fontWeight: '200', color: Colors.GRAY}}><TimeAgo
                                        time={this.state.lastSeen}/></Text>

                                </View>


                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'flex-start'
                                }}>
                                    <IconFontAwesome name='map-marker' style={{
                                        color: Colors.GRAY,
                                        marginBottom: 5,
                                        fontSize: 18
                                    }}/>
                                    {this.renderDistance()}

                                </View>


                            </View>

                            <View style={{marginTop: 30}}>
                                <Text
                                    style={{fontSize: 18, color: Colors.GRAY, fontWeight: '200'}}>{data.about_me}</Text>
                            </View>


                        </View>


                        <View style={{
                            padding: 15,
                            minHeight: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomColor: Colors.GRAY,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}>
                            <TouchableScale>
                                <View>
                                    <Text style={{
                                        fontSize: 15,
                                        color: Colors.PRIMARY_COLOR,
                                        textAlign: 'center',
                                        fontWeight: '700',
                                        textTransform: 'uppercase'
                                    }}>{dictionary.share} {data.full_name}'S {dictionary.share}</Text>
                                    <Text style={{
                                        fontSize: 11,
                                        color: Colors.PRIMARY_COLOR,
                                        textAlign: 'center',
                                        fontWeight: '600'
                                    }}>{translations.shareDesc}</Text>
                                </View>
                            </TouchableScale>
                        </View>

                        <View style={{
                            padding: 15,
                            minHeight: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomColor: Colors.GRAY,
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}>
                            <TouchableScale>
                                <View>
                                    <Text style={{
                                        fontSize: 15,
                                        color: Colors.GRAY,
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        textTransform: 'uppercase'
                                    }}>{dictionary.report} {data.full_name}</Text>

                                </View>
                            </TouchableScale>
                        </View>


                    </View>

                </ScrollView>

                <View style={{position:'absolute', bottom:10, right:0, left:0, }}>
                    {this.renderButtons()}
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    translations: state.languages.selected ? state.languages.selected.translations.userDetailScreen : {},
    dictionary: state.languages.selected ? state.languages.selected.translations.dictionary : {},

});

const mapDispatchToProps = (dispatch) => ({
    fetchDiscover: discover => dispatch(fetchDiscover(discover)),
    removeDiscover: discover => dispatch(removeDiscover(discover)),
    addNewDialog: dialog => dispatch(addNewDialog(dialog)),

});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)

