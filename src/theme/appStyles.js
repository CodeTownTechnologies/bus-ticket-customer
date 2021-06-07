import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Dimensions } from 'react-native'
import { Colors } from '.';

const appStyles = {
    marginRight: wp(6.4),
    marginLeft: wp(6.4),
    marginTop: hp(2.5),
    marginBottom: 20,
    marginHorizontal: wp(6.4),
    marginVertical: 20,
    horizontal10: wp(2.6),
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3.00,
        elevation: 5,
    },
    shadow2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 3.00,
        elevation: 2,
    },
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    rowCenterView: { flexDirection: 'row', alignItems: 'center' },
    container: { flex: 1, backgroundColor: Colors.whiteFF }
}
export default appStyles