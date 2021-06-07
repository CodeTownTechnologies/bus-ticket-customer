import { StyleSheet } from 'react-native'
import { Colors } from '../../../../theme'
import { wp, hp } from '../../../../utils/heightWidthRatio'

export default style = StyleSheet.create({
    container: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    listView: {
        paddingHorizontal: wp(10),
        marginVertical: hp(10),
        marginHorizontal: wp(25),
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.whiteFF,
        paddingVertical: 7,
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingVertical: hp(10)
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
    rightTopView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    originView: {
        flexDirection: 'row'
    },
    seperatorLine: {
        height: 2,
        backgroundColor: Colors.greyEb,
        flex: 1,
        marginVertical: 4
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-between'
    },
    removeBtn: {
        marginTop: 0,
        marginBottom: 20,
        marginHorizontal: wp(25)
    }
})