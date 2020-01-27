import React, {Component} from 'react'
import {Image, View, Text, StyleSheet} from 'react-native'
import Colors from "../styles/colors";
import ProgressiveImage from "./ProgressiveImage";
import TouchableScale from "./TouchableScale";

export default class ProfileIcon extends Component{



    randomizeColor = (id) => {
        let final_id = id.match(/\d/g);
        final_id = final_id.join("");

        return Colors.PROFILE_ICON_COLORS[(final_id * 1151) % Colors.PROFILE_ICON_COLORS.length]
    }

    getIconLabel(id) {
        const words = this.props.name.split(' ')

        return (
            words.length > 1
                ? this.props.label = `${words[0].slice(0, 1)}${words[1].slice(0, 1)}`
                : this.props.name.slice(0, 1)
        )
    }

    render(){
        const {id, photo, name, iconSize, onPress, user_id} = this.props;


        const styles = iconSize === 'large' ? largeIcon : (iconSize === 'medium' ? mediumIcon : smallIcon)
        return (
            <TouchableScale onPress={onPress}>
                <View>
                    {photo
                        ? <ProgressiveImage style={styles.photo} source={{uri: photo}}/>
                        : <View style={[styles.photo, styles.randomPhoto, {backgroundColor: this.randomizeColor(id)}]}>
                            <Text style={styles.randomIcon}>{this.getIconLabel(id)}</Text>
                        </View>
                    }
                </View>
            </TouchableScale>
        )
    }


}

const largeIcon = StyleSheet.create({
    photo: {
        borderRadius: 25,
        height: 50,
        width: 50,
        marginVertical: 10,
        marginRight: 10
    },
    randomPhoto: {
        borderColor: Colors.GRAY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    randomIcon: {
        fontSize: 25,
        bottom:-4,
        fontWeight: '700',
        color: 'white'
    }
})

const mediumIcon = StyleSheet.create({
    photo: {
        borderRadius: 20,
        height: 40,
        width: 40,
        marginVertical: 10,
        margin: 10,
        marginBottom: 0,
    },
    randomPhoto: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    randomIcon: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white'
    }
})

const smallIcon = StyleSheet.create({
    photo: {
        borderRadius: 15,
        height: 30,
        width: 30,
        margin: 5,
        marginBottom: 0,
    },
    randomPhoto: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    randomIcon: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white'
    }
})