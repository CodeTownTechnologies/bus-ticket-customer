import { StyleSheet } from 'react-native'
import { Colors } from '../../../../theme'
import { wp, hp } from '../../../../utils/heightWidthRatio'

export default style = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteFF,
        flex: 1 
    },
    listView:  { 
        paddingHorizontal: wp(10), 
        marginVertical: hp(10), 
        marginHorizontal: wp(25), 
        flex: 1, 
        flexDirection: 'row', 
        backgroundColor: Colors.whiteFF, 
        paddingVertical: 7, 
        alignItems: 'flex-start' ,
        flexWrap: 'wrap',
        paddingVertical: hp(10),
        borderRadius: 5
    },
    busNoView: { 
        backgroundColor: Colors.brownE1, 
        height: wp(30), 
        width: wp(30), 
        borderRadius: wp(15), 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: wp(10) 
    },
    rightView: {
        flex: 1
    },
    originView: { 
        flexDirection: 'row' 
    },
    seperatorLine: {
        height: 2,
        backgroundColor: Colors.greyEb,
        flex: 1,
        marginVertical: 8
    },
    stopsView: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5, 
        justifyContent: 'space-between', 
        paddingRight: wp(40) 
    },


    //AKAP LIst
    akapListView:  { 
        paddingHorizontal: wp(10), 
        marginVertical: hp(10), 
        marginHorizontal: wp(25), 
        flex: 1, 
        backgroundColor: Colors.whiteFF, 
        paddingVertical: 7, 
        paddingVertical: hp(10),
        borderRadius: 5
    },
    topView: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        flex: 1, 
        alignItems: 'center' 
    },
    ticketIcon: { 
        height: wp(16), 
        width: wp(16), 
        marginRight: wp(10) 
    },
    terminalContainer: { 
        flexDirection: 'row', 
        marginVertical: hp(15), 
        alignItems: 'center' 
    },
    terminalView: { 
        height: hp(40), 
        justifyContent: 'space-between'
    },
    indicatorIcon: { 
        height: hp(32), 
        width: wp(10), 
        tintColor: Colors.greyCb, 
        marginHorizontal: wp(10) 
    }
})