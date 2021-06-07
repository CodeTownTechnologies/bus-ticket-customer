import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Fonts, Colors } from '../../theme/index'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'


export default function LinkText (props) {
    const {title, linkPressed, containerStyle, textStyle} = props
    return (
        <TouchableOpacity onPress={()=>{(linkPressed) && linkPressed()}} style={[styles.container, containerStyle]}>
            <Text style={[styles.light, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    light: {
        fontSize: Fonts.size.font12,
        color: Colors.green27,
        fontFamily: Fonts.type.light
    },
    container:{
        marginTop: heightPercentageToDP(2.85),
        alignSelf: 'flex-end',
        marginRight: widthPercentageToDP(6.4)
    }
})