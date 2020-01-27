import {Colors} from "../styles";
import {Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import TouchableScale from "./TouchableScale";
import Dimensions from "../styles/dimensions";
import Loader from "./Loader";


export default function (props) {
    const {onPress, label, labelColor, backgroundColors, loading} = props;
    return (
        <TouchableScale onPress={props.onPress} loading={loading}>
            <View style={{width: Dimensions.SCREEN_WIDTH,
             alignItems: 'center', justifyContent:'center'}}>
                <View style={{
                    marginVertical: 10,
                    shadowColor: Colors.GRAY,
                    width: '90%',
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                }}>
                    <LinearGradient
                        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                        colors={backgroundColors || ['#FFF', '#FFF', '#FFF']}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                            height: 60,
                            borderRadius: 40,
                            width: '100%',

                        }}>
                        {loading ? <Loader color={labelColor} size={50}/> :
                            <Text style={{
                                color: labelColor || Colors.PRIMARY_COLOR,
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: '400'
                            }}>{label}</Text>
                        }
                    </LinearGradient>

                </View>
            </View>
        </TouchableScale>


    )
}