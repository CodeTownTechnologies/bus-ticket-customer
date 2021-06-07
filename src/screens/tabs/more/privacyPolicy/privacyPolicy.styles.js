import { StyleSheet } from 'react-native'
import { Colors, Fonts, AppStyles } from '../../../../theme'
import { wp, hp } from '../../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: { 
        backgroundColor: Colors.whiteFF,
        marginHorizontal: wp(25),
        borderRadius: 4,
        padding: wp(20), 
        maxHeight: AppStyles.screenHeight - hp(100) 
    },
    Icon: {
        alignSelf: 'flex-end',
        fontSize: hp(20),
        padding: hp(3),
        color: Colors.whiteFF,
        marginRight: -wp(30),
        marginTop: -wp(30),
        backgroundColor: Colors.green27,
        borderRadius: wp(15)
    },
    title: { 
        marginBottom: hp(20) 
    },
    
})