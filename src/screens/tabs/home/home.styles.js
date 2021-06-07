import { StyleSheet } from 'react-native'
import { hp, wp } from '../../../utils/heightWidthRatio';
import { Colors, AppStyles } from '../../../theme';

export default styles = StyleSheet.create({
    mainContainer: { 
        backgroundColor: Colors.whiteFF, 
        flex: 1 
    },
    headerView: { 
        backgroundColor: Colors.green27, 
        height: hp(109) ,
    },
    headerContainer: { 
        flex: 1, 
        justifyContent: 'center',
    },
    cityName: { 
        color: Colors.whiteFF, 
        right: wp(24), 
        position: 'absolute', 
        width: 100,
    },
    logoView: { 
        width: '100%', 
        alignItems: 'center' 
    },
    logo: { 
        height: hp(55),
        width: wp(81),
        marginHorizontal: wp(40), 
    },
    mapContainer: { 
        flex: 1 
    },
    startTripBtn: { 
        height: hp(45), 
        backgroundColor: Colors.yellowF6, 
        marginHorizontal: wp(40), 
        borderRadius: 5, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: wp(15), 
        top: wp(-22), 
        position: 'absolute', 
        width: AppStyles.screenWidth - wp(79) 
    },
    tiltArrow: { 
        height: 13,
        width: 12
    },
    wrapper: {
        height: hp(150),
    },
    swipperContainer: {
        backgroundColor: Colors.greyCb,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    transportationView: { 
        backgroundColor: Colors.whiteFF, 
        width: '90%', 
        alignSelf: 'center', 
        borderRadius: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingHorizontal: wp(24),
        paddingVertical: 10
    },
    transporationImg: { 
        height: wp(40), 
        width: wp(40), 
        marginBottom: hp(5) 
    },
    transView: { 
        position: 'absolute', 
        bottom: hp(20), 
        alignSelf: 'center' 
    },
    locationIcon:{ 
        height: wp(20),
        width: wp(20)
    },
    locationBtn: { 
        ...AppStyles.shadow, 
        height: wp(33), 
        width: wp(33), 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5, 
        backgroundColor: Colors.whiteFF, 
        alignSelf: 'flex-end', 
        marginRight: wp(24), 
        marginBottom: hp(20), 
    }
})