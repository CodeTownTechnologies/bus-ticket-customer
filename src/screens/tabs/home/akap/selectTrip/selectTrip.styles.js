import { StyleSheet } from 'react-native'
import { Colors, AppStyles } from '../../../../../theme'
import { hp, wp } from '../../../../../utils/heightWidthRatio'

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: Colors.whiteFF 
    },
    listContainer: { 
        ...AppStyles.shadow, 
        marginBottom: hp(10), 
        marginTop: hp(5), 
        marginHorizontal: wp(25), 
        backgroundColor: Colors.whiteFF, 
        padding: wp(10), 
        borderRadius: 8 
    },
    timeTerminalView: { 
        justifyContent: 'space-between', 
        height: hp(45) 
    },
    indicatorIcon: { 
        height: hp(35), 
        width: wp(9), 
        marginLeft: wp(20), 
        marginRight: wp(10) 
    },
    seperatorLine: { 
        height: 2, 
        backgroundColor: Colors.greyE8, 
        marginVertical: hp(10) 
    },
    busLogo: { 
        height: wp(16), 
        width: wp(16), 
        marginRight: wp(10) 
    },
    selectionIcon: { 
        height: wp(30), 
        width: wp(30), 
        marginLeft: wp(10) 
    },
    cartLeftView: { 
        ...AppStyles.rowCenterView, 
        marginHorizontal: wp(25) 
    },
    upArrow: { 
        color: Colors.green27, 
        transform: [{ rotate: '270deg' }], 
        marginRight: wp(10) 
    },
    cartRightView: { 
        backgroundColor: Colors.yellowF6, 
        paddingVertical: hp(10), 
        paddingHorizontal: wp(30) 
    },
    headerBtnView: { 
        width: '100%', 
        backgroundColor: Colors.green27, 
        ...AppStyles.rowCenterView, 
        justifyContent: 'space-between', 
        paddingHorizontal: wp(50) 
    },
    arrowMargin: { 
        color: Colors.whiteFF, 
        marginRight: wp(5) 
    },
    backgroundOpacity: {
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        justifyContent: 'flex-end'  
    },
    cartModalContainer: { 
        backgroundColor: Colors.whiteFF, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        paddingHorizontal: wp(25), 
        paddingVertical: hp(12) 
    },
    cartModalTopView: { 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    downArrow: { 
        color: Colors.green27, 
        transform: [{ rotate: '90deg' }], 
        marginRight: wp(10) 
    },
    busDetailView: { 
        ...AppStyles.rowCenterView, 
        marginVertical: hp(12) 
    },
    cartModalRouteDetail: { 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginBottom: hp(12) 
    },
    filterModalContainer: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.6)', 
        justifyContent: 'flex-end' 
    },
    filterContent: { 
        backgroundColor: Colors.whiteFF, 
        flex: 1, 
        width: wp(255), 
        alignSelf: 'flex-end' 
    },
    filterHeader: { 
        ...AppStyles.rowCenterView, 
        justifyContent: 'space-between', 
        paddingHorizontal: wp(25), 
        marginTop: hp(20) 
    },
    closeBtn: { 
        paddingVertical: hp(20), 
        paddingLeft: wp(20) 
    },
    closeIcon: { 
        tintColor: Colors.black2b, 
        height: wp(14), 
        width: wp(14) 
    },
    sectionHeader: { 
        paddingHorizontal: wp(25), 
        borderTopColor: Colors.greyE8, 
        borderTopWidth: 2, 
        paddingTop: hp(20), 
        marginTop: hp(30) 
    },
    sectionListItem: { 
        ...AppStyles.rowCenterView, 
        paddingHorizontal: wp(35), 
        marginTop: hp(15) 
    },
    checkBoxIcon: { 
        height: wp(16), 
        width: wp(16), 
        marginRight: wp(15) 
    },
    sectionButton: { 
        paddingHorizontal: wp(25), 
        backgroundColor: Colors.whiteFF, 
        paddingVertical: hp(20) 
    }
})

export default styles