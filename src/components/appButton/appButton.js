import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { Fonts, Colors } from '../../theme/index'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen'
import { hp, wp } from '../../utils/heightWidthRatio'
import Text12 from '../textComponent/text12'

/*@params
// type - withoutContainer / borderContainer
*/
export default function AppButton(props) {
    const { title, buttonPressed, type, containerStyle, disable, image } = props
    return (
        <TouchableOpacity disabled={(disable) ? disable : false} onPress={() => { (buttonPressed) && buttonPressed() }} style={[styles[type], (disable) && styles.disableColor, containerStyle]}>
            {image ?
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Image source={image} style={styles.buttonIcon} resizeMode={"contain"}/>
                    <Text12 type="regular" title={title} addStyle={{ color: Colors.whiteFF }}/>
                </View>
                :
                <Text style={styles[type + 'Text']}>{title}</Text>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    borderContainerText: {
        fontSize: Fonts.size.font10,
        color: Colors.black2b,
        textAlign: 'center',
        fontFamily: Fonts.type.light
    },
    disableColor: {
        backgroundColor: Colors.greyAc,
    },
    withoutContainerText: {
        fontSize: Fonts.size.font16,
        color: Colors.whiteFF,
        textAlign: 'center',
        fontFamily: Fonts.type.bold
    },
    borderContainer: {
        marginTop: heightPercentageToDP(4.35),
        height: hp(60),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteFF,
        borderColor: Colors.greyEb,
        borderTopWidth: 2,
        bottom: 0,
    },
    withoutContainer: {
        marginTop: heightPercentageToDP(4.35),
        height: hp(40),
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.yellowF6,
        borderRadius: 4
    },
    buttonIcon: {
        height: wp(15),
        width: wp(15),
        marginRight: wp(10)
    }
})