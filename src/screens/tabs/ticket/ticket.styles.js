import { StyleSheet } from 'react-native'
import { Colors, Fonts, AppStyles } from '../../../theme'
import { wp, hp } from '../../../utils/heightWidthRatio'

export default style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteFF,
    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: Colors.green27,
        height: 80,
        paddingBottom: 15
    },
    tabTextStyle: {
        fontSize: Fonts.size.font14,
        fontFamily: Fonts.type.light
    },
    underlineView: {
        height: 2.5,
        marginRight: 5,
        marginTop: 8
    },
    tabContainer: {
        width: AppStyles.screenWidth / 2,
        alignItems: 'center',
    }
})