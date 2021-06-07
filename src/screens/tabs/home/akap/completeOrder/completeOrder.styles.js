import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../../../utils/heightWidthRatio'
import { AppStyles, Colors } from '../../../../../theme'

const styles = StyleSheet.create({
    indicatorIcon: { 
        height: hp(35), 
        width: wp(9), 
        marginLeft: wp(20), 
        marginRight: wp(10) 
    },
    timeTerminalView: { 
        justifyContent: 'space-between', 
        height: hp(40) 
    },
    busLogo: { 
        height: wp(16), 
        width: wp(16), 
        marginRight: wp(10) 
    },
    summaryContainer: { 
        ...AppStyles.shadow2, 
        marginHorizontal: 25, 
        backgroundColor: Colors.whiteFF, 
        paddingHorizontal: 15, 
        paddingVertical: 16, 
        marginVertical: 10, 
        borderRadius: 6 
    },
    summaryView: { 
        ...AppStyles.rowCenterView, 
        justifyContent: 'space-between', 
        marginBottom: hp(10) 
    },
    busLogoView: { 
        ...AppStyles.rowCenterView, 
        marginTop: hp(10) 
    },
    ticketDate: { 
        color: Colors.brownE1, 
        marginVertical: hp(10) 
    },
    bookingView: { 
        ...AppStyles.rowCenterView, 
        marginVertical: hp(20), 
        alignSelf: 'center' 
    },
    buttonContainer: { 
        ...AppStyles.shadow, 
        backgroundColor: Colors.whiteFF, 
        marginTop: hp(20), 
        height: hp(100), 
        justifyContent: 'center', 
        paddingHorizontal: wp(40) 
    },
    totalView: { 
        ...AppStyles.rowCenterView, 
        justifyContent: 'space-between', 
        marginBottom: hp(10), 
        marginHorizontal: hp(10) 
    },
    inputView: { 
        ...AppStyles.shadow2, 
        marginHorizontal: wp(25), 
        backgroundColor: Colors.whiteFF, 
        paddingHorizontal: wp(15), 
        paddingVertical: hp(16), 
        marginVertical: hp(10), 
        borderRadius: 6 
    }
})

export default styles