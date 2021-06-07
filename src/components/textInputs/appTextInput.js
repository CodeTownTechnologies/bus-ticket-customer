import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Text12} from '../index';
import {Colors, Fonts} from '../../theme';

export default (props) => {
  const {
    onChange,
    refName,
    type,
    placeholderText,
    secure,
    value,
    iconImageRight,
    rightAction,
    containerStyle,
    onBlur,
    error,
    onSubmit,
    textInputStyle,
    customContainerStyle,
    editable,
    iconImageRightStyle,
  } = props;

  const rightImage = () => {
    return (
      <TouchableOpacity
        style={styles.imageRightContainer}
        onPress={() => {
          rightAction && rightAction();
        }}>
        <Image
          source={iconImageRight}
          style={[styles.imageRight, iconImageRightStyle]}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={
          customContainerStyle
            ? customContainerStyle
            : [styles.container, containerStyle]
        }>
        <TextInput
          ref={(input) => {
            refName && refName(input);
          }}
          editable={editable ? false : true}
          style={[styles.textInput, textInputStyle]}
          value={value}
          keyboardType={type ? type : 'default'}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            onSubmit ? onSubmit() : Keyboard.dismiss();
          }}
          secureTextEntry={secure}
          onChangeText={(val) => onChange(val)}
          placeholder={placeholderText}
          onBlur={onBlur}
        />
        {rightImage()}
      </View>
      {error ? (
        <Text12 type={'regular'} title={error} addStyle={styles.errorText} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: Colors.greyE8,
    marginTop: heightPercentageToDP(6.3),
    alignContent: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  contentStyle: {
    borderRadius: widthPercentageToDP(1.6),
    marginTop: heightPercentageToDP((-14.5 / 667) * 100),
  },
  arrowStyle: {
    marginTop: heightPercentageToDP((-15 / 667) * 100),
    width: widthPercentageToDP((6 / 375) * 100),
    height: widthPercentageToDP((6 / 375) * 100),
  },
  imageLeft: {
    height: heightPercentageToDP(2.7),
    width: widthPercentageToDP(4),
    marginHorizontal: widthPercentageToDP(4.8),
    alignSelf: 'center',
  },
  lineContainer: {
    width: 2,
    height: heightPercentageToDP(6.9),
    backgroundColor: Colors.greyE8,
  },
  textInput: {
    fontSize: Fonts.size.font14,
    fontFamily: Fonts.type.regular,
    color: Colors.black2b,
    flex: 1,
  },
  imageRightContainer: {
    alignSelf: 'center',
  },
  imageRight: {
    height: heightPercentageToDP(2.7),
    width: widthPercentageToDP(4),
  },
  tooltipcontainer: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(2.2),
    marginHorizontal: widthPercentageToDP(4),
  },
  tooltipImage: {
    height: heightPercentageToDP(2.2),
    width: widthPercentageToDP(4),
  },
  errorText: {
    color: Colors.redD0,
    marginTop: 10,
  },
  toolText: {
    color: Colors.grey4A,
    margin: widthPercentageToDP((10 / 375) * 100),
  },
});
