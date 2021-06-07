import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Fonts, Colors } from '../../theme/index'
const fontSize = Fonts.size.font18;

export default function Text18 (props) {
    const { title, type, addStyle } = props
    return <Text numberOfLines={1} style={[styles[type], { fontSize }, addStyle]}>{title}</Text>
}

const styles = StyleSheet.create({
    bold: {
        color: Colors.black2b,
        fontFamily: Fonts.type.bold
    },
    semiBold: {
        color: Colors.black2b,
        fontFamily: Fonts.type.semiBold
    },
    regular: {
        color: Colors.black2b,
        fontFamily: Fonts.type.regular
    },
    light: {
        color: Colors.black2b,
        fontFamily: Fonts.type.light
    }
})