import { StyleSheet } from 'react-native'
import { Colors } from '../../../theme';
import { wp, hp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.whiteFF
    },
    content: {
        flex: 1,
        backgroundColor: Colors.whiteFF,
        marginHorizontal: wp(35),
    },
    buttonContainer: {
        marginTop: hp(40)
    },
    registerTextContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: hp(20)
    },
    linkContainer: {
        marginTop: 0,
        alignSelf: 'flex-start',
        marginRight: 0
    },
    fbButton: { 
        backgroundColor: '#4266b2', 
        marginTop: hp(20)
    },
    googleButton: { 
        backgroundColor: '#dd4c3b', 
        marginTop: hp(20)
    },
    txtFieldStyle: { 
        marginTop: hp(15)
    }
})

export default styles;