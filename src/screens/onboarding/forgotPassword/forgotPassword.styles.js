import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { Colors } from '../../../theme';
import { wp, hp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.whiteFF
    },
    content: {
        flex: 1,
        marginHorizontal: wp(35),
    },
    buttonContainer: {
        marginTop: hp(70)
    }
})

export default styles;