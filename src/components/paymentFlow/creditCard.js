import React, { Component } from 'react';
import { View, Image, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import Header from '../header/header';
import { AppStyles, Colors, Images, Fonts } from '../../theme';
import { Text12, Text10, Text14 } from '..';
import AppButton from '../appButton/appButton';
import { wp, hp } from '../../utils/heightWidthRatio';

export default class creditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveCard: false,
      expiredModalVisible: false
    };
  }

  renderExpiredModal() {
    const { expiredModalVisible } = this.state
    return (
      <Modal
        visible={expiredModalVisible}
        transparent
      >
        <View style={styles.expiredModalContainer}>
          <View style={styles.expiredModalContent}>
            <Image source={Images.reservationExpired} style={styles.expiredIcon} resizeMode="contain"/>
            <Text14 type="regular" title="Reservation Expired"/>
            <Text10 type="light" title="The ticket have been removed from the cart" addStyle={styles.expiredModalDescription}/>
            <TouchableOpacity style={styles.searchedAgainBtn} onPress={() => this.setState({ expiredModalVisible: false }, () => this.props.navigation.navigate('akap'))}>
              <Text14 type="regular" title="Search Again" addStyle={{ color: Colors.green27 }}/>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderInput(placeholder) {
    return (
      <TextInput
        placeholder={placeholder}
        style={styles.input}
      />
    )
  }

  render() {
    const { saveCard } = this.state
    return (
      <View style={AppStyles.container}>
        <Header back title={"Credit card"} />
        {this.renderExpiredModal()}
        <View style={styles.content}>
          {this.renderInput("Card Number")}
          <View style={[AppStyles.rowCenterView, { justifyContent: 'space-between' }]}>
            <View style={styles.dateCvvView}>
              {this.renderInput("Expiry date (MM/YY)")}
            </View>
            <View style={styles.dateCvvView}>
              {this.renderInput("CVC/CVV")}
            </View>
          </View>
          {this.renderInput("Cardholder Name")}
          <View style={styles.bottomView}>
            <TouchableOpacity style={[AppStyles.rowCenterView, styles.saveCardBtn]} onPress={() => this.setState({ saveCard: !saveCard })}>
              <Image source={saveCard ? Images.checkMark : Images.greenCheckBox} style={styles.checkBox} />
              <Text12 type="regular" title="Save Payment Information" />
            </TouchableOpacity>
            <Text10 type="light " title="Book easier and faster next time. Your payment information is encrypted and safely stored." addStyle={styles.description} />
            <AppButton type={"withoutContainer"} title={"Pay"} buttonPressed={() => { this.setState({ expiredModalVisible: true }) }} containerStyle={{ width: '100%' }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: wp(25)
  },
  dateCvvView: {
    width: (AppStyles.screenWidth / 1.8) - wp(25)
  },
  bottomView: {
    alignItems: 'center',
    paddingHorizontal: wp(15)
  },
  saveCardBtn: {
    alignSelf: 'center',
    marginTop: hp(60),
    marginBottom: hp(20)
  },
  checkBox: {
    height: wp(20),
    width: wp(20),
    marginRight: wp(10)
  },
  description: {
    paddingHorizontal: wp(25)
  },
  expiredModalContainer: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: wp(60) 
  },
  expiredModalContent: { 
    borderRadius: 7, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: Colors.whiteFF, 
    borderRadius: 10, 
    width: '100%'
  },
  expiredIcon: { 
    height: hp(61), 
    width: wp(55), 
    marginBottom: hp(24), 
    marginTop: hp(20) 
  },
  searchedAgainBtn: { 
    paddingVertical: hp(20) 
  },
  expiredModalDescription: { 
    marginVertical: hp(15) 
  },
  input: {
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: Colors.greyE8,
    fontSize: Fonts.size.font12,
    fontFamily: Fonts.type.light
  }
})