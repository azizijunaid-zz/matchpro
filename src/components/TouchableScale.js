import React, {PureComponent} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

export default class TouchableScale extends PureComponent {

    componentWillMount() {
        this.animatedValue = new Animated.Value(1);
    }

    handlePressIn = () => {
        if (!this.props.loading) {
            Animated.spring(this.animatedValue, {
                toValue: 0.97,
            }).start();
        }
    };

    handlePressOut = () => {
        Animated.spring(this.animatedValue, {
            toValue: 1,

        }).start();
    };

    render() {
        const animatedStyle = {
            transform: [{scale: this.animatedValue}],
        };

        return (
            <TouchableOpacity {...this.props} activeOpacity={1} onPressIn={() => this.handlePressIn()}
                              onPressOut={() => this.handlePressOut()}
                              onPress={this.props.loading ? console.log("button disabled on loading") : this.props.onPress}>
                <Animated.View {...this.props} style={[animatedStyle]}>
                    {this.props.children}
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

