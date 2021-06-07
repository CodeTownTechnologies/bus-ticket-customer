import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../../utils/heightWidthRatio';
import {Colors, AppStyles, Fonts} from '../../../../theme';

export default styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.whiteFF,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: wp(15),
    backgroundColor: Colors.green27,
    paddingVertical: hp(20),
  },
  cityView: {
    height: hp(50),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.greyEb,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkImage: {
    height: wp(20),
    width: wp(20),
  },
  listView: {
    paddingHorizontal: wp(10),
    marginVertical: hp(10),
    marginHorizontal: wp(25),
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.whiteFF,
    paddingVertical: 7,
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: hp(10),
  },
  busNoView: {
    backgroundColor: Colors.brownE1,
    height: wp(30),
    width: wp(30),
    borderRadius: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(10),
  },
  rightView: {
    flex: 1,
  },
  rightTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  originView: {
    flexDirection: 'row',
  },
  timeView: {
    backgroundColor: Colors.brownE1,
    borderRadius: 5,
    paddingHorizontal: wp(10),
    paddingVertical: wp(3),
  },
  seperatorLine: {
    height: 2,
    backgroundColor: Colors.greyEb,
    flex: 1,
    marginVertical: wp(4),
  },
  filterBottomBtn: {
    bottom: hp(30),
    right: wp(10),
    position: 'absolute',
  },
  filterIcon: {
    height: wp(61),
    width: wp(61),
  },
  headerContent: {
    marginTop: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeIndicator: {
    height: hp(54),
  },
  headerFieldView: {
    flex: 1,
    marginHorizontal: wp(10),
  },
  routeField: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: 4,
    color: Colors.whiteFF,
    paddingHorizontal: wp(12),
    fontSize: Fonts.size.font14,
    fontFamily: Fonts.type.light,
    height: hp(40),
    marginBottom: hp(10),
  },
  doubleArrowBtn: {
    paddingVertical: hp(20),
  },
  doubleArrow: {
    height: wp(19),
    width: wp(19),
  },
  filterModalCont: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  filterModalContent: {
    height: '60%',
    width: '100%',
    backgroundColor: Colors.whiteFF,
    paddingHorizontal: wp(25),
    paddingTop: hp(10),
  },
  filterModalBtn: {
    top: hp(-30),
    right: wp(10),
    position: 'absolute',
  },
  borderLine: {
    height: 4,
    width: wp(30),
    backgroundColor: Colors.greyCb,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: hp(20),
  },
  leaveNowView: {
    top: hp(-17),
    flexDirection: 'row',
    marginLeft: wp(38),
    marginRight: wp(40),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  leaveNowBtn: {
    height: hp(35),
    width: wp(90),
    backgroundColor: Colors.whiteFF,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshIcon: {
    height: hp(41),
    width: wp(60),
  },
  closeBtn: {
    height: wp(35),
    width: wp(35),
    borderRadius: wp(35) / 2,
    backgroundColor: Colors.whiteFF,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    height: hp(16),
    width: wp(14),
  },
  listBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
    justifyContent: 'space-between',
  },
});
