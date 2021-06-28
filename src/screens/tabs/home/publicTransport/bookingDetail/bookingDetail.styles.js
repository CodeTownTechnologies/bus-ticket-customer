import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts} from '../../../../../theme';
import {hp, wp} from '../../../../../utils/heightWidthRatio';

export default styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.whiteFF,
    flex: 1,
  },
  content: {
    backgroundColor: Colors.whiteFF,
    flex: 1,
    paddingHorizontal: wp(25),
  },
  topView: {
    ...AppStyles.shadow,
    backgroundColor: Colors.whiteFF,
    marginTop: hp(20),
    borderRadius: 8,
  },
  brownView: {
    backgroundColor: Colors.brownE1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(15),
  },
  indicatorImg: {
    height: hp(28),
    marginRight: wp(10),
  },
  departure: {
    color: Colors.whiteFF,
    marginBottom: hp(10),
  },
  busNumberView: {
    height: wp(34),
    width: wp(34),
    borderRadius: wp(17),
    backgroundColor: Colors.whiteFF,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topWhiteView: {
    padding: wp(15),
  },
  tripDataCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(10),
  },
  seperatorLine: {
    height: 1,
    backgroundColor: Colors.greyCb,
    marginTop: hp(18),
    marginBottom: hp(15),
  },
  priceView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  price: {
    color: Colors.brownE1,
    marginLeft: wp(20),
  },
  bottomView: {
    padding: wp(15),
  },
  promoTxt: {
    alignSelf: 'center',
    marginVertical: hp(10),
  },
  codeField: {
    borderWidth: 2,
    height: hp(40),
    borderColor: Colors.greyCb,
    borderRadius: 4,
    paddingHorizontal: wp(12),
    marginBottom: hp(25),
    fontSize: Fonts.size.font14,
    fontFamily: Fonts.type.regular,
    color: Colors.black2b,
  },
  subscriptionBtn: {
    backgroundColor: Colors.green27,
    marginTop: hp(10),
  },
});
