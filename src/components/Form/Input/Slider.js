import React, {Component} from 'react';
import {Text, TextInput, View} from 'react-native';
import MultiSlider from "@ptomasroos/react-native-multi-slider/MultiSlider";
import Colors from "../../../styles/colors";

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || [0, 100]
        }
    }

    onChange = (values) => {
        this.setState({
            value: values
        });
        this.props.onChange(values)
    };

    render() {
        return (
            <View style={{padding: 10, alignItems: 'center'}}>
                <MultiSlider
                    selectedStyle={{
                        backgroundColor: this.props.primaryColor || "#777",
                    }}
                    values={this.state.value}
                    customMarkerLeft={() => (
                        <View style={{
                            shadowColor: '#777',
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 2,
                            elevation: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{position:'absolute', top:-12,}}>
                                <Text style={{
                                    color: this.props.primaryColor,
                                    textAlign: 'center',
                                    fontSize: 12,
                                }}>{this.state.value[0]}</Text>
                            </View>
                            <View style={{
                                width: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                                height: 30,
                                backgroundColor: '#FFF'
                            }}>

                            </View>
                        </View>
                    )}

                    customMarkerRight={() => (
                        <View style={{
                            shadowColor: '#777',
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 2,
                            elevation: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{position:'absolute', top:-12,}}>
                                <Text style={{
                                    color: this.props.primaryColor,
                                    textAlign: 'center',
                                    fontSize: 12,
                                }}>{this.state.value[1]}</Text>
                            </View>
                            <View style={{
                                width: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                                height: 30,
                                backgroundColor: '#FFF'
                            }}>

                            </View>
                        </View>
                    )}
                    isMarkersSeparated={true}
                    onValuesChange={(values) => this.onChange(values)}
                    min={this.props.min || 0}
                    max={this.props.max || 100}
                    step={1}
                    snapped
                />
            </View>


        )
    }

}