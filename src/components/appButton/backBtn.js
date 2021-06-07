import React from 'react';
import {Colors} from '../../theme/index';
import {hp} from '../../utils/heightWidthRatio';
import Icon from 'react-native-vector-icons/MaterialIcons';
/*@params
// type - withoutContainer / borderContainer
*/
export default function BackButton({onPressIcon}) {
  return (
    <Icon
      onPress={onPressIcon}
      name={'arrow-back'}
      style={{color: Colors.whiteFF, fontSize: hp(28), marginTop: hp(6)}}
    />
  );
}
