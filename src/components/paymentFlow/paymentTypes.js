import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Text12, Text14, Text10} from '..';
import {Images, AppStyles, Colors} from '../../theme';
import {hp, wp} from '../../utils/heightWidthRatio';

export default class paymentTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCreditCard(header, listData) {
    return (
      <View style={styles.card}>
        <Text10 type="light" title={header} addStyle={styles.cardHeader} />
        {listData.map((item) => (
          <TouchableOpacity
            style={styles.cardList}
            onPress={() => {
              this.props.selectPaymentType(item);
            }}>
            <Text14 type="light" title={item} />
            <Image
              source={
                this.props.paymentType == item
                  ? Images.checkMark
                  : Images.greenCheckBox
              }
              style={styles.greenCheckBox}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text12
          type="regular"
          title={'Pay with'}
          addStyle={styles.payWithText}
        />
        {this.renderCreditCard('Credit Card', ['creditCard'])}
        {this.renderCreditCard('E-Wallet', ['goPay', 'ovo', 'dana', 'linkAja'])}
        {this.renderCreditCard('Virtual Account', ['img'])}
        {this.renderCreditCard('Over the Counter', ['img'])}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  payWithText: {
    marginHorizontal: wp(25),
    marginVertical: hp(10),
  },
  card: {
    ...AppStyles.shadow2,
    marginHorizontal: wp(25),
    backgroundColor: Colors.whiteFF,
    paddingHorizontal: wp(15),
    paddingVertical: hp(16),
    marginVertical: hp(10),
    borderRadius: 6,
  },
  cardHeader: {
    marginBottom: hp(10),
  },
  cardList: {
    ...AppStyles.rowCenterView,
    justifyContent: 'space-between',
    height: hp(52),
    borderTopColor: Colors.greyEb,
    borderTopWidth: 2,
  },
  greenCheckBox: {
    height: wp(20),
    width: wp(20),
  },
});
