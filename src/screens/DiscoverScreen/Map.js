import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
} from "react-native";

import MapView from "react-native-maps";
import Card from "./components/Card";
import Colors from "../../styles/colors";
import TouchableScale from "../../components/TouchableScale";
import NavigationService from "../../services/NavigationService";

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 100 * 40;
const CARD_WIDTH = CARD_HEIGHT / 100 * 70;

export default class Map extends Component {
    index = 0;
    animation = new Animated.Value(0);

    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({value}) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.props.discover.length) {
                index = this.props.discover.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const marker = this.props.discover[index];
                    this.map.animateToRegion(
                        {
                            latitude: marker.lat,
                            longitude: marker.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        350
                    );
                }
            }, 10);
        });


    }

    componentWillUnmount() {
        this.animation.removeAllListeners();
    }


    render() {
        const interpolations = this.props.discover.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return {scale, opacity};
        });

        return (
            <View style={styles.container}>
                <MapView
                    minZoomLevel={8}
                    ref={map => this.map = map}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    // initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.props.discover.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={{
                                latitude: marker.lat,
                                longitude: marker.lng,
                            }}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]}/>
                                    <View style={styles.marker}/>

                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        {useNativeDriver: true}
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.props.discover.map((marker, index) => (
                        <TouchableScale onPress={() => NavigationService.showProfileDetail(this.props.discover[index])}>

                            <View style={styles.card} key={index}>
                                <Card profile={marker}/>
                            </View>
                        </TouchableScale>

                    ))}


                </Animated.ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
        paddingBottom: 115,

    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        backgroundColor: "transparent",
        marginHorizontal: 10,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.PRIMARY_COLOR,
    },
    ring: {
        zIndex:9999,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "rgba(230,69,121,0.5)",
        position: "absolute",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.PRIMARY_COLOR,
    },
});

