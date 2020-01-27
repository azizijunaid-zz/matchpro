import React from "react";
import {Animated, Easing, Image, ScrollView, Text, View} from "react-native";
import Colors from "../styles/colors";
import {IMAGES} from "../config";
import TouchableScale from "./TouchableScale";

const ANIMATION_DURATION = 250;

export default class Placeholder extends React.Component {

    animatedValue = new Animated.Value(0);

    componentDidMount() {
        this.handleAnimation();

    }

    handleAnimation = () => {
        // A loop is needed for continuous animation
        Animated.loop(
            // Animation consists of a sequence of steps
            Animated.sequence([
                // start rotation in one direction (only half the time is needed)
                Animated.timing(this.animatedValue, {
                    toValue: 0.2,
                    duration: ANIMATION_DURATION,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                // rotate in other direction, to minimum value (= twice the duration of above)
                Animated.timing(this.animatedValue, {
                    toValue: -0.2,
                    duration: ANIMATION_DURATION * 2,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                // return to begin position
                Animated.timing(this.animatedValue, {
                    toValue: 0.0,
                    duration: ANIMATION_DURATION,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ])
        ).start();

    }


    render() {
        const {heading, message, onPress, } = this.props;
        return (
            <ScrollView style={{flex: 1,}} {...this.props} >
                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100,}}>
                    <TouchableScale onPress={onPress}>
                        <Animated.View style={{
                            transform: [{
                                rotate: this.animatedValue.interpolate({
                                    inputRange: [-1, 1],
                                    outputRange: ['-0.1rad', '0.1rad']
                                })
                            }],
                        }}>

                            <Image source={IMAGES.placeHolderImage} resizeMode={"contain"}
                                   style={{height: 300, width: 300}}/>
                        </Animated.View>
                    </TouchableScale>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 22,
                        color: Colors.DARK_GRAY
                    }}>{heading || "Check back later"}</Text>
                    <Text
                        style={{fontWeight: "300", marginTop: 10, color: Colors.DARK_GRAY}}>{message}</Text>
                </View>
            </ScrollView>
        )

    }
}

