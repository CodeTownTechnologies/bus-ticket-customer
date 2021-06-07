import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../../utils/heightWidthRatio'
import { Colors } from '../../../../theme'

export default styles = StyleSheet.create({
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        borderBottomWidth: 2, 
        borderBottomColor: Colors.greyEb, 
        alignItems: 'center', 
        height: hp(48) ,
        marginHorizontal: wp(25)
    },
})