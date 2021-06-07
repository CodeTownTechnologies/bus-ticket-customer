import { StyleSheet } from 'react-native'
import { Colors } from '../../../../theme'
import { wp, hp } from '../../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    listView: { 
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        marginHorizontal: wp(25), 
        marginVertical: hp(10), 
        paddingHorizontal: wp(10), 
        paddingVertical: hp(15), 
        backgroundColor: Colors.whiteFF
    },
    messageIcon: { 
        height: wp(30), 
        width: wp(30), 
        marginRight: wp(10) 
    },
    titleMargin: { 
        marginBottom: hp(5) 
    },
    cardBottomTxt: { 
        marginTop: hp(70)
    }
})