import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../theme'
import { wp, hp } from '../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    content: { 
        paddingHorizontal: wp(25) 
    },
    acInfoView: { 
        flexDirection: 'row', 
        marginTop: hp(36), 
        alignItems: 'center', 
        marginBottom: hp(15) 
    },
    userInfoImg: { 
        width: wp(50), 
        height: wp(50), 
        marginRight: wp(26) 
    },
    emailTxt: { 
        marginTop: 5 
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderTopWidth: 2, 
        borderTopColor: Colors.greyEb, 
        alignItems: 'center', 
        height: hp(48) 
    },
    leftView: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    notificationView: { 
        backgroundColor: Colors.redD0, 
        paddingHorizontal: 4, 
        borderRadius: 6, 
        paddingVertical: 1 
    },
    newTxt: { 
        fontSize: 8, 
        fontFamily: Fonts.type.light, 
        color: Colors.whiteFF
    },
    listIcon: { 
        height: 15, 
        width: 15, 
        marginRight: wp(20) 
    }
})