import React from "react";

import {Image, Text, StyleSheet,  View} from "react-native";
import {Dimensions, Colors} from "../../../../styles/index";

export default function (props) {

    return(
        <View style={{flexDirection: 'row', borderBottomColor:Colors.GRAY, borderBottomWidth:StyleSheet.hairlineWidth, height: 100, flex: 1,}}>
            <View style={{flex: 1, alignItems:'center', justifyContent:'center',}}>
                <Image style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                }} source={{uri: props.thumbnail}}/>
            </View>
            <View style={{flex: 3, alignItems:'flex-start', justifyContent:'center',}}>
                <Text style={{textAlign: 'center', color: Colors.DARK_GRAY, fontWeight:'600', fontSize: 20}}>{props.name}</Text>
                <Text style={{color: Colors.GRAY}}>so you work at Tinder?</Text>
            </View>

        </View>
    )
}