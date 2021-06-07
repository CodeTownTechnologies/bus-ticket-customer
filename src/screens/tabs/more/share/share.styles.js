import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../../../theme'
import { wp, hp } from '../../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    listStyle: { 
        paddingHorizontal: wp(25) 
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
    listIcon: { 
        height: wp(22), 
        width: wp(22), 
        marginRight: wp(20) 
    },
    sectionHeader: { 
        color: Colors.green27, 
        marginTop: hp(25), 
        marginBottom: hp(10) 
    }
})