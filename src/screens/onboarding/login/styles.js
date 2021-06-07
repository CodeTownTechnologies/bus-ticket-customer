import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../../theme';
import { wp, hp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.whiteFF,
    },
    content: {
        flex: 1,
        paddingHorizontal: wp(35),
        // paddingTop: hp(80),
        backgroundColor: Colors.whiteFF
    },
    wrapper: {
        height: hp(120),
    },
    swipperContainer: {
        backgroundColor: Colors.greyCb,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerTextContainer: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        marginTop: heightPercentageToDP(4.2),
        flex: 1
    },
    linkContainer: {
        marginTop: 0,
        alignSelf: 'flex-start',
        marginRight: 0
    },
    passwordField: { 
        marginTop: (Platform.OS == 'android') ? hp(10) : hp(30) 
    },
    fbBtn: { 
        backgroundColor: '#4266b2', 
        marginTop: hp(25) 
    },
    gBtn: { 
        backgroundColor: '#dd4c3b', 
        marginTop: hp(25) 
    }
})

export default styles;