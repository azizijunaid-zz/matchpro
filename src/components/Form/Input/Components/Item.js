import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, Animated} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

export default class extends Component {
    state = {
        selected: [],
    };
    scaleValue = new Animated.Value(this.props.selected ? 1 : 0);

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selected !== prevProps.selected){
            this.animate()
        }
    }

    animate = () => {
        let selected = this.props.selected;

        if (selected) {
            Animated.spring(this.scaleValue, {
                toValue: 1,
                useNativeDriver: true,
            }).start();

        } else {
            Animated.spring(this.scaleValue, {
                toValue: 0,
                useNativeDriver: true,
            }).start();

        }
    }

    onPress = () => {
        this.props.onPress(this.props.item);
    };


    render() {
        let borderSelectedColor = "#000";
        if (this.props.primaryColor) {
            borderSelectedColor = this.props.primaryColor;
        }
        const selected = this.props.selected;
        const item = this.props.item;

        return (

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.onPress()}
                    style={{
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        paddingTop: 10,
                        paddingBottom: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                    <View style={{
                        height: 20,
                        width: 20,
                        borderRadius: 12,
                        borderWidth: selected ? 0 : 1,
                        borderColor: '#ddd',
                    }}>
                        <Animated.View style={{
                            position: 'absolute',
                            transform: [{scale: this.scaleValue}],
                            opacity: this.scaleValue,
                            backgroundColor: borderSelectedColor,
                            height: 20,
                            width: 20,
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                           <IconFontAwesome name={"check"} color={"#FFF"}/>
                        </Animated.View>
                    </View>
                    <Text style={{
                        paddingLeft: 10,
                        paddingRight: 5,
                        color: selected ? '#000' : '#ccc'
                    }}>{item.label}</Text>
                </TouchableOpacity>


        )
    };

}