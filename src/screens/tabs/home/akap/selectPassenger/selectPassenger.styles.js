import { StyleSheet }  from 'react-native'
import { AppStyles, Colors } from '../../../../../theme'
import { wp, hp } from '../../../../../utils/heightWidthRatio'

const styles = StyleSheet.create({
    checkMarkIcon: { 
        height: hp(15), 
        width: wp(21)
    },
    listItem: { 
        ...AppStyles.rowCenterView,
        borderBottomColor: Colors.greyE8, 
        borderBottomWidth: 2, 
        justifyContent: 'space-between', 
        marginHorizontal: wp(25), 
        height: hp(45) 
    },
    calculationView: {
        ...AppStyles.rowCenterView,
        width: wp(90), 
        justifyContent: 'space-between'
    }
})

export default styles