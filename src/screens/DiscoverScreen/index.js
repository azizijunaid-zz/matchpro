import React, {Component} from "react";
import {
    StyleSheet,
    View,
    LayoutAnimation,
} from "react-native";
import Card from "./components/Card";
import {Colors} from "../../styles";
import DiscoverPlaceHolder from "./placeholder";
import UserService from "../../services/UserService";
import Swiper from "react-native-deck-swiper";
import Dimensions from "../../styles/dimensions";
import {connect} from "react-redux";
import {addNewDialog} from "../../utils/store/actions/dialogs";
import {fetchDiscover, removeDiscover} from "../../utils/store/actions/discover";
import {SWIPE_ACTIONS} from "../../config";
import ActionButtons from "../../components/ActionButtons";
import NavigationService from "../../services/NavigationService";
import AdmobService from "../../services/AdmobService";
import MapView from "./Map";

class DiscoverScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardIndex: 0,
            map: false

        };
    }

    componentDidMount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        // AdmobService.showInterstitial();
        this.getData();
    }


    getData = () => {
        UserService.discover().then(this.props.fetchDiscover);
    }


    renderButtons() {
        const {discover} = this.props;

        return (
            <ActionButtons
                onSuccess={this.getData}
                onMapPress={(map) => this.setState({map: map})}
                user_id={discover[0] && discover[0].id}
            />
        )
    }

    postLike(like, user_id) {

        const data = {
            like: like,
            user_id: user_id
        };

        UserService.like(data).then(res => {

        }).finally(e => {

        })

    }


    renderSwiper() {
        const {discover} = this.props;


        return (
            <Swiper
                marginTop={0}
                cardVerticalMargin={10}
                cardStyle={{padding: 0,}}
                containerStyle={{
                    margin: 0,
                    top: 0,
                    padding: 0,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}
                onTapCard={(index) => NavigationService.showProfileDetail(discover[index])}
                cards={discover || []}
                renderCard={(card) => (
                    <View style={{height: Dimensions.SCREEN_HEIGHT / 100 * 70}}>
                        <Card profile={card}/>
                    </View>)}
                onSwiped={(index) => {
                }}
                onSwipedAll={() => {
                    this.getData()
                }}
                onSwipedLeft={(index) => this.postLike(SWIPE_ACTIONS.NOPE, discover[index].id)}
                onSwipedRight={(index) => this.postLike(SWIPE_ACTIONS.LIKE, discover[index].id)}
                onSwipedTop={(index) => this.postLike(SWIPE_ACTIONS.BLEAH, discover[index].id)}
                onSwipedBottom={(index) => this.postLike(SWIPE_ACTIONS.SUPER_LIKE, discover[index].id)}
                cardIndex={0}
                backgroundColor={'#FFF'}
                stackSize={3}
                stackSeparation={15}
                overlayLabels={{
                    bottom: {
                        title: 'BLEAH',
                        style: {
                            label: {
                                backgroundColor: 'black',
                                borderColor: 'black',
                                color: 'white',
                                borderWidth: 1
                            },
                            wrapper: {
                                elevation: 10,
                                zIndex: 9999,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }
                    },
                    left: {
                        title: 'NOPE',
                        style: {
                            label: {
                                backgroundColor: 'transparent',
                                borderColor: Colors.PRIMARY_COLOR,
                                color: Colors.PRIMARY_COLOR,
                                borderWidth: 1
                            },
                            wrapper: {
                                elevation: 10,
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-start',
                                marginTop: 30,
                                marginLeft: -30
                            }
                        }
                    },
                    right: {
                        title: 'LIKE',
                        style: {
                            label: {
                                zIndex: 9999,
                                backgroundColor: 'transparent',
                                borderColor: "#6ee3b4",
                                color: '#6ee3b4',
                                borderWidth: 1
                            },
                            wrapper: {
                                elevation: 10,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                marginTop: 30,
                                marginLeft: 30
                            }
                        }
                    },
                    top: {
                        title: 'SUPER LIKE',
                        style: {
                            label: {
                                backgroundColor: 'black',
                                borderColor: 'black',
                                color: 'white',
                                borderWidth: 1
                            },
                            wrapper: {
                                elevation: 10,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }
                    }
                }}
                animateOverlayLabelsOpacity
                animateCardOpacity
                swipeBackCard>

            </Swiper>
        )
    }


    render() {
        const {discover, translations} = this.props;

        if (discover.length < 1) {
            return (
                <DiscoverPlaceHolder translations={translations} loaderOnPress={() => this.getData()}/>
            )
        }

        return (
            <View style={styles.container}>
                <View style={{flex: 1,}}>
                    {this.state.map ? <MapView discover={this.props.discover}/> : this.renderSwiper()}
                </View>

                <View style={{position: 'absolute', bottom: 0, right: 0, left: 0, marginBottom: 40}}>
                    {this.renderButtons()}
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    cards: {
        flex: 1,
        margin: 8,
        zIndex: 100,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 16,
    },
    circle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "gray",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.18,
        shadowRadius: 2,
    },
});

const mapStateToProps = (state) => ({
    discover: state.discover,
    translations: state.languages.selected.translations.discoverScreen
});

const mapDispatchToProps = (dispatch) => ({
    fetchDiscover: discover => dispatch(fetchDiscover(discover)),
    removeDiscover: discover => dispatch(removeDiscover(discover)),
    addNewDialog: dialog => dispatch(addNewDialog(dialog)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverScreen)
