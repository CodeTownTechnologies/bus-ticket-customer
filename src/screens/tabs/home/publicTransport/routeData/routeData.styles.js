import { StyleSheet } from 'react-native'
import { Colors, AppStyles } from '../../../../../theme'
import { hp, wp } from '../../../../../utils/heightWidthRatio'

export default styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.whiteFF,
        flex: 1
    },
    headerView: {
        backgroundColor: Colors.green27,
        height: hp(200)
    },
    headerContainer: {
        paddingHorizontal: wp(25),
        flexDirection: 'column',
        position: 'absolute',
        top: 20,
        width: '100%'
    },
    backButton: {
        height: wp(40),
        width: wp(40),
        borderRadius: 7,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backImage: {
        height: 14,
        width: 18
    },
    emptyView: {
        height: wp(40),
        width: wp(40)
    },
    mapContainer: {
        flex: 1
    },
    startTripBtn: {
        height: hp(45),
        backgroundColor: Colors.blue57,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(15),
        width: '100%',
        marginTop: hp(20)
    },
    tiltArrow: {
        height: 13,
        width: 12,
        marginRight: wp(20)
    },

    bottomContainer: {
        backgroundColor: Colors.whiteFF,
        paddingHorizontal: wp(23),
        alignItems: 'flex-end'
    },
    routeDetail: {
        backgroundColor: Colors.whiteFF,
        width: '100%',
        paddingVertical: hp(20),
        paddingHorizontal: wp(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(-35),
        flexWrap: 'wrap',
        borderRadius: 6
    },
    busNumberView: {
        height: wp(30),
        width: wp(30),
        borderRadius: wp(15),
        backgroundColor: Colors.brownE1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(10)
    },
    startTime: {
        color: Colors.brownE1,
        marginTop: 5
    },
    stepIndicator0: {
        height: 30,
        width: 30,
        backgroundColor: Colors.brownE1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerIndicatorView: {
        height: 40,
        width: 40,
        backgroundColor: Colors.brownE1
    },
    stepIndicator: {
        height: 30,
        width: 30,
        backgroundColor: Colors.brownE1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtn: {
        height: wp(35),
        width: wp(35),
        borderRadius: wp(35) / 2,
        backgroundColor: Colors.whiteFF,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: 0,
        position: 'absolute'
    },
    closeIcon: {
        height: hp(16),
        width: wp(14)
    },
    navView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },
    navArrowImg: { 
        height: 11, 
        width: 8 
    },
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitButton: { 
        width: '90%', 
        marginBottom: hp(10), 
        alignSelf: 'center' 
    },
    stepContainer: { 
        ...AppStyles.shadow, 
        flex: 1, 
        backgroundColor: 
        Colors.whiteFF, 
        width: '100%', 
        paddingHorizontal: wp(15), 
        marginTop: hp(10), 
        borderRadius: 8 
    }
})