import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../theme'
import { wp, hp } from '../../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    content: {
        paddingHorizontal: wp(25),
        marginTop: hp(20)
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: hp(48),
    },
    border: {
        borderBottomWidth: 2, 
        borderBottomColor: Colors.greyEb, 
    },
    leftView: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    listIcon: { 
        height: wp(22), 
        width: wp(22), 
        marginRight: wp(20) ,
        tintColor: Colors.green27
    }
})