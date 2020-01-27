import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import NavigationService from "../../services/NavigationService";
import Loader from "../../components/Loader";
import RoundButton from "../../components/RoundButton";
import Colors from "../../styles/colors";

export default function (props) {
    const {discoverButtonText, placeholderMessage} = props.translations;

    return (
        <View style={{
            flex: 1,
            paddingBottom: 40,
            backgroundColor: '#FFF',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height:300}}>
                    <Loader onPress={props.loaderOnPress}/>
                </View>

                <View style={{marginTop: 20,}}>
                    <Text style={{textAlign: 'center', fontSize: 16, color: '#777', fontWeight: '200'}}>
                        {placeholderMessage}
                    </Text>

                    <RoundButton
                        onPress={() => NavigationService.showSettings()}
                        labelColor={Colors.WHITE}
                        label={discoverButtonText}
                        backgroundColors={[Colors.PRIMARY_COLOR, Colors.PRIMARY_COLOR, Colors.SECONDARY_COLOR]}/>
                </View>

            </View>


        </View>
    );
}



