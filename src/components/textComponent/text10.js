import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Fonts, Colors } from '../../theme/index'
const fontSize = Fonts.size.font10

export default function Text10 (props) {
    const { title, type, addStyle } = props
    return <Text style={[styles[type], {fontSize}, addStyle]}>{title}</Text>
}

const styles = StyleSheet.create({
    bold: {
        color: Colors.black2b,
        fontFamily: Fonts.type.bold
    },
    regular: {
        color: Colors.black2b,
        fontFamily: Fonts.type.regular
    },
    light: {
        color: Colors.black2b,
        fontFamily: Fonts.type.light
    },
    semiboldGrey84: {
        color: Colors.grey84,
        fontFamily: Fonts.type.semiBold
    },
    boldBlue: {
        color: Colors.blueTheme,
        fontFamily: Fonts.type.bold
    },
    reagulerBlue: {
        color: Colors.blue87,
        fontFamily: Fonts.type.regular
    }
}) 