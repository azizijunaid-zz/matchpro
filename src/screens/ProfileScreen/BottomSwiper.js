import React, {Component} from "react";
import {Text, View} from "react-native";
import {Colors} from "../../styles";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from "react-native-swiper";

export default class BottomSwiper extends Component{
    render(){
        return(
            <Swiper
                showsButtons={false}
                    dotColor={"#ccc"}
                    activeDotColor={"#777"}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <IconFontAwesome name='map-marker' style={{
                            color: Colors.PRIMARY_COLOR,
                            marginBottom: 12,
                            marginRight: 10,
                            fontSize: 30
                        }}/>

                        <Text style={{
                            color: '#444',
                            fontSize: 30,
                            fontWeight: 'bold'

                        }}>Hello Swiper</Text>


                    </View>

                    <Text style={{
                        marginTop: 10,
                        color: '#777',
                        fontSize: 14,
                        fontWeight: '400'
                    }}>Hello Swiper sdskd asjaksjak</Text>

                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <IconFontAwesome name='map-marker' style={{
                            color: Colors.PRIMARY_COLOR,
                            marginBottom: 12,
                            marginRight: 10,
                            fontSize: 30
                        }}/>

                        <Text style={{
                            color: '#444',
                            fontSize: 30,
                            fontWeight: 'bold'

                        }}>Hello Swiper</Text>


                    </View>
                    <Text style={{
                        marginTop: 10,
                        color: '#777',
                        fontSize: 14,
                        fontWeight: '400'
                    }}>Hello Swiper sdskd asjaksjak</Text>

                </View>
            </Swiper>
        )
    }

}