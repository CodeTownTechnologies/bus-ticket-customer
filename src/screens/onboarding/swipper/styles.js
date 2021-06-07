import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Fonts, Colors } from '../../../theme/';
import { hp, wp } from '../../../utils/heightWidthRatio';

const styles = StyleSheet.create({
    swipperContainer: { 
        backgroundColor: Colors.green27, 
        flex: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 31 
    },
    swipper1Img: {
        height: hp(48),
        width: wp(275),
        marginVertical: hp(30)
    },
    swipper2Img: {
        height: hp(124),
        width: wp(191),
        marginVertical: hp(30)
    },
    swipper3Img: {
        height: hp(116),
        width: wp(108),
        marginVertical: hp(30)
    },
    bannerTitle: {
      fontSize: Fonts.size.font32,
      fontFamily: Fonts.type.regular,
      color: Colors.whiteFF,
      lineHeight: hp(30)
    },
    description: { 
      color: Colors.whiteFF, 
      marginRight: wp(40) ,
      lineHeight: hp(18)

    },
    dotStyle: {
      borderColor: 'white',
      borderWidth: 1,
      width: widthPercentageToDP((11/375)*100),
      height: widthPercentageToDP((11/375)*100),
      borderRadius: widthPercentageToDP((5.5/375)*100),
      opacity: 0.2
    },
    activeDotSyle: {
      width: widthPercentageToDP((11/375)*100),
      height: widthPercentageToDP((11/375)*100),
      borderRadius: widthPercentageToDP((5.5/375)*100),
    }
  })

export default styles;