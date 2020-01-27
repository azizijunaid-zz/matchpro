import React, {Component} from "react";
import {View, Animated, Text, SafeAreaView, Easing} from "react-native";
import NavigationService from "../services/NavigationService";
import Colors from "../styles/colors";
import Main from "../styles/main";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const ANIMATION_DURATION = 500;
const HEIGHT = 130;
const NOTIFICATION_DURATION = 3000;
const BORDER_RADIUS = 50;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
import {Navigation} from "react-native-navigation";

export default class InAppNotification extends Component {


    animatedValue = new Animated.Value(0);
    animatedHeight = new Animated.Value(0);
    opacity = new Animated.Value(0);

    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            layout: {
                backgroundColor: 'transparent'
            }
        });

        this.animateHeight()
    }

    dismiss() {
        setTimeout(() => {
            Animated.parallel([
                Animated.timing(this.animatedHeight, {
                    toValue: 0,
                    duration: ANIMATION_DURATION,

                }),
                Animated.timing(this.opacity, {
                    toValue: 0,
                    duration: ANIMATION_DURATION,

                }),
            ]).start(() => {
                NavigationService.dismissOverlay(this.props.componentId)
            });

        }, NOTIFICATION_DURATION)
    }


    handleAnimation = () => {
        // A loop is needed for continuous animation

        // Animation consists of a sequence of steps
        Animated.sequence([
            // start rotation in one direction (only half the time is needed)
            Animated.timing(this.animatedValue, {toValue: 1.0, duration: 150, easing: Easing.linear,}),
            // rotate in other direction, to minimum value (= twice the duration of above)
            Animated.timing(this.animatedValue, {toValue: -1.0, duration: 300, easing: Easing.linear,}),
            // return to begin position
            Animated.timing(this.animatedValue, {toValue: 0.0, duration: 150, easing: Easing.linear,})
        ]).start()

    }

    animateHeight() {
        Animated.parallel([
            Animated.timing(this.animatedHeight, {
                toValue: HEIGHT,
                duration: ANIMATION_DURATION,

            }),
            Animated.timing(this.opacity, {
                toValue: 1,
                duration: ANIMATION_DURATION,

            }),
        ]).start(() => {
            this.handleAnimation()
            this.dismiss()
        });
    }

    render() {
        const {message, title} = this.props;

        return (
            <Animated.View style={[{
                marginTop: -50,
                backgroundColor:'transparent',
                alignItems: 'center',
                justifyContent: 'flex-end',

            }, Main.smallShadow]}>
                <AnimatedLinearGradient
                    start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                    colors={[Colors.PRIMARY_COLOR, Colors.SECONDARY_COLOR]}
                    style={{
                        transform: [{
                            rotate: this.animatedValue.interpolate({
                                inputRange: [-1, 1],
                                outputRange: ['-0.1rad', '0.1rad']
                            })
                        }],
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        minHeight: this.animatedHeight,
                        width: '100%',
                        opacity: this.opacity,
                        borderBottomLeftRadius: BORDER_RADIUS,
                        borderBottomRightRadius: BORDER_RADIUS

                    }}>
                    <View style={{
                        flexDirection: 'row',
                        height: 50,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Ionicons name={"ios-warning"} color={Colors.WHITE}
                                      size={40}/>
                        </View>
                        <View style={{flex: 2, alignItems: 'center'}}>
                            <Text style={{color: Colors.WHITE, fontSize: 17, fontWeight: '700'}}>{title}</Text>
                            <Text style={{color: Colors.WHITE, fontSize: 10, fontWeight: '400'}}>{message}</Text>

                        </View>
                        <View style={{flex: 1,}}>
                        </View>
                    </View>
                </AnimatedLinearGradient>
            </Animated.View>
        )
    }

}