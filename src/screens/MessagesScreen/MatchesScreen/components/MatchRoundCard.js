import React from "react";
import {Text, View} from "react-native";
import {Colors} from "../../../../styles/index";
import TouchableScale from "../../../../components/TouchableScale";
import NavigationService from "../../../../services/NavigationService";
import ProgressiveImage from "../../../../components/ProgressiveImage";

export default function (props) {

    return (

        <TouchableScale onPress={() => NavigationService.showProfileDetail(props.match)}>
            <View style={{alignItems: 'center', marginRight: 20, justifyContent: 'center'}}>

                <ProgressiveImage style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: Colors.GRAY
                }} source={{uri: props.match.avatar}}/>
                <Text numberOfLines={1} style={{
                    textAlign: 'center',
                    marginTop: 5,
                    color: Colors.DARK_GRAY,
                    fontWeight: '600',
                    fontSize: 15
                }}>{props.match.full_name}</Text>
            </View>

        </TouchableScale>
    )
}