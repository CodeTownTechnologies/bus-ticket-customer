import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts } from '../../../theme';
import { wp, hp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.whiteFF
    },
    content: {
        flex: 1,
        marginHorizontal: wp(35),
    },
    buttonContainer: {
        marginTop: hp(50)
    },
    bottomText: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center'
    },
    linkContainer: {
        marginTop: 0,
        alignSelf: 'flex-start',
        marginRight: 0,
        color: Colors.redD0
    },
    otpContainer: { 
        width: '80%',
        alignSelf: 'center',
        height: 60,
        marginBottom: 20,
        marginTop: 35
    },
    otpInput: { 
        color: Colors.whiteFF, 
        backgroundColor: Colors.greyCb, 
        fontSize: Fonts.size.font16 
    },
    linkTextStyle: {
        color: Colors.redD0
    }
})

export default styles;