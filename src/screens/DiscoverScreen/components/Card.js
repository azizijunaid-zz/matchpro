import React, {Component,} from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import Colors from "../../../styles/colors";
import ProgressiveImage from "../../../components/ProgressiveImage";
import Main from "../../../styles/main";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from "react-native-linear-gradient";
import {addNewDialog} from "../../../utils/store/actions/dialogs";
import {fetchDiscover, removeDiscover} from "../../../utils/store/actions/discover";
import {connect} from "react-redux";


class Card extends Component {
    static defaultProps = {
        likeOpacity: 0,
        nopeOpacity: 0,
    };

    constructor(props){
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
        }

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
        const {profile, user, translations} = this.props;
        if(!user.location){
            return;
        }

        return(
            <Text style={{paddingLeft: 5, fontSize: 15, fontWeight: '400', zIndex:9999, color: Colors.LIGHT_GRAY}}>
                {this.distance(profile.lat, profile.lng, user.location.lat, user.location.lng, "K")} {translations.kilometersAway}
            </Text>
        )
    }

    render() {
        const {profile, likeOpacity, nopeOpacity, user} = this.props;
        if(!profile){
            return(
                <View>

                </View>
            )
        }
        return (
            <View style={[{...StyleSheet.absoluteFill}, Main.mediumShadow]}>
                <LinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,.8)']}
                    style={{
                        position:'absolute',
                        zIndex:10,
                        top:0,
                        bottom:0,
                        right:0,
                        left:0,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                    <View style={{zIndex:1, position:'absolute', bottom:10, left:20,}}>
                        <View style={styles.footer}>
                            <Text style={styles.name}>{profile.full_name}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <IconFontAwesome name='map-marker' style={{
                                color: Colors.LIGHT_GRAY,
                                marginBottom: 5,
                                fontSize: 18
                            }}/>

                            {this.renderDistance()}

                        </View>
                    </View>

                </LinearGradient>
                <ProgressiveImage style={[styles.image, {opacity:0.8}]} source={{uri: profile.avatar}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(204,204,204,0.7)',
        width: null,
        height: null,
        borderRadius: 8,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footer: {
        zIndex:1,
        flexDirection: "row",
    },
    name: {
        color: "white",
        fontSize: 32,
    },
    like: {
        borderWidth: 4,
        borderRadius: 5,
        padding: 8,
        borderColor: "#6ee3b4",
    },
    likeLabel: {
        fontSize: 32,
        color: "#6ee3b4",
        fontWeight: "bold",

    },
    nope: {
        borderWidth: 4,
        borderRadius: 5,
        padding: 8,
        borderColor: "#ec5288",
    },
    nopeLabel: {
        fontSize: 32,
        color: "#ec5288",
        fontWeight: "bold",
    },
});


const mapStateToProps = (state) => ({
    user: state.user,
    translations: state.languages.selected ? state.languages.selected.translations.userDetailScreen : {},

});

const mapDispatchToProps = (dispatch) => ({
    fetchDiscover: discover => dispatch(fetchDiscover(discover)),
    removeDiscover: discover => dispatch(removeDiscover(discover)),
    addNewDialog: dialog => dispatch(addNewDialog(dialog)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Card)

