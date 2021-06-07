import { StyleSheet } from 'react-native'
import { Colors } from '../../../../theme'
import { hp, wp } from '../../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    container: { 
        borderWidth: 2,
        borderColor: Colors.greyEb,
        marginHorizontal: wp(25),
        marginTop : hp(20)
    },
    emailView: { 
        borderBottomWidth: 2,
        borderBottomColor: Colors.greyEb,
        paddingVertical: hp(15),
        paddingHorizontal: wp(15)
    },
    accountInfoView: { 
        paddingHorizontal: wp(15), 
        paddingTop: hp(13), 
        paddingBottom: hp(31), 
        flexDirection: 'row', 
        alignItems: 'flex-start' 
    },
    userIcon: { 
        height: wp(50), 
        width: wp(50), 
        marginRight: wp(26) 
    },
    nameTxtField: { 
        borderBottomWidth: 2, 
        borderBottomColor: Colors.greyEb, 
        flexDirection: 'row',
        width: wp(200)
    },
    lnameTxtField: { 
        borderBottomWidth: 2, 
        borderBottomColor: Colors.greyEb, 
        flexDirection: 'row',
        marginTop: 20,
    },
    dateView: {
        borderBottomColor: Colors.greyEb,
        borderBottomWidth: 2,
        height: hp(20),
        marginVertical: hp(20)
    },
    genderView: { 
        flexDirection: 'row',
        width: wp(120), 
        justifyContent: 'space-between',
        paddingTop: hp(20)
    },
    genderComp: { 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    checkImage: { 
        height: wp(20), 
        width: wp(20), 
        marginRight: wp(20) 
    },
    checkBox: {
        height: wp(20),
        width: wp(20), 
        backgroundColor: Colors.green27, 
        borderRadius: 3, 
        marginRight: wp(20) 
    },
    buttonContainer: { 
        paddingHorizontal: wp(40) 
    }
})