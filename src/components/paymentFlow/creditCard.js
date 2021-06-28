import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../header/header';
import {AppStyles, Colors, Images, Fonts} from '../../theme';
import {Text12, Text10, Text14} from '..';
import AppButton from '../appButton/appButton';
import {wp, hp} from '../../utils/heightWidthRatio';
import Xendit from 'xendit-js-node';
import {WebView} from 'react-native-webview';
import Loader from '../modals/loader';

const runFirst = `(function() {
  window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};
})()`;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default class creditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveCard: false,
      expiredModalVisible: false,

      amount: props.route.params.price,
      cardNumber: '',
      cardExpMonth: '',
      cardExpYear: '',
      cardCvn: '',
      cardHolderName: '',
      cardExpiryDate: '',
      isMultipleUse: false,
      isSkip3DS: false,
      isTokenizing: false,
      isRenderWebview: false,
      webviewUrl: '',

      isLoading: false,
    };
  }

  setIsTokenizing = () => {
    this.setState((p) => ({
      isTokenizing: !p.isTokenizing,
    }));
  };

  tokenize = () => {
    this.setState({isLoading: true});
    const tokenData = this.getTokenData();
    this.setIsTokenizing();
    Xendit.setPublishableKey(
      'xnd_public_development_AWllzawLjUOSzJkwr2OPklf5Sy8sFk4Qt8hHWDHcPhSZiIBQtpDAct70zeFVjg4I',
    );
    Xendit.card.createToken(tokenData, this._tokenResponseHandler);
  };

  getTokenData = () => {
    const {
      amount,
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCvn,
      isMultipleUse,
      isSkip3DS,
      cardExpiryDate,
    } = this.state;

    // console.log(cardExpiryDate.split('/'));

    return {
      amount,
      card_number: cardNumber,
      card_exp_month: cardExpiryDate.split('/')[0],
      card_exp_year: cardExpiryDate.split('/')[1],
      card_cvn: cardCvn,
      is_multiple_use: isMultipleUse,
      should_authenticate: !isSkip3DS,
    };
  };

  _tokenResponseHandler = (err, token) => {
    console.log(JSON.stringify(token, null, 2));
    // console.log(JSON.stringify(token, null, 2));
    if (err) {
      console.log(JSON.stringify(err, null, 2));
      this.setIsTokenizing();
      alert(err.message);
      this.setState({isLoading: false});
      return;
    }

    switch (token.status) {
      case 'APPROVED':
        this.setState({isLoading: false});
      case 'VERIFIED':
        this.setState({isLoading: false});
      case 'FAILED':
        this.setState({isLoading: false});
        alert(JSON.stringify(token));
        break;
      case 'IN_REVIEW':
        this.setState({
          webviewUrl: token.payer_authentication_url,
          isRenderWebview: true,
        });

        break;
      default:
        this.setState({isLoading: false});
        alert('Unknown token status');
        break;
    }

    this.setIsTokenizing();
  };

  onMessage = (rawData) => {
    const data = JSON.parse(rawData.nativeEvent.data);
    this.setState(
      {
        isRenderWebview: false,
      },
      () => {
        const {status, id, authentication_id} = data;
        if (status === 'VERIFIED') {
          this.props.route.params.completeTransaction(
            id,
            authentication_id,
            this.state.cardCvn,
          );
          this.props.navigation.goBack();
        } else {
          alert('payment failed');
        }
      },
    );
  };

  renderExpiredModal() {
    const {expiredModalVisible} = this.state;
    return (
      <Modal visible={expiredModalVisible} transparent>
        <View style={styles.expiredModalContainer}>
          <View style={styles.expiredModalContent}>
            <Image
              source={Images.reservationExpired}
              style={styles.expiredIcon}
              resizeMode="contain"
            />
            <Text14 type="regular" title="Reservation Expired" />
            <Text10
              type="light"
              title="The ticket have been removed from the cart"
              addStyle={styles.expiredModalDescription}
            />
            <TouchableOpacity
              style={styles.searchedAgainBtn}
              onPress={() =>
                this.setState({expiredModalVisible: false}, () =>
                  this.props.navigation.navigate('akap'),
                )
              }>
              <Text14
                type="regular"
                title="Search Again"
                addStyle={{color: Colors.green27}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderInput(placeholder, name) {
    const isNumber = name === 'cardHolderName' ? false : true;
    return (
      <TextInput
        keyboardType={isNumber ? 'number-pad' : 'default'}
        placeholder={placeholder}
        value={this.state[name]}
        onChangeText={(text) => {
          if (
            name === 'cardExpiryDate' &&
            text.length === 2 &&
            !text.includes('/')
          ) {
            this.setState({[name]: text + '/'});
          } else {
            this.setState({[name]: text});
          }
        }}
        style={styles.input}
      />
    );
  }

  validateInput = () => {
    const {cardNumber, cardCvn, cardExpiryDate} = this.state;
    if (cardNumber.length !== 16 || !isNumeric(cardNumber)) {
      alert('invalid card number');
      return false;
    }
    if (cardCvn.length !== 3 || !isNumeric(cardCvn)) {
      alert('invald cvn');
      return false;
    }
    if (
      cardExpiryDate.length !== 7 ||
      cardExpiryDate[2] !== '/' ||
      !(
        parseInt(cardExpiryDate.split('/')[0]) > 0 &&
        parseInt(cardExpiryDate.split('/')[0]) < 13
      ) ||
      !(parseInt(cardExpiryDate.split('/')[1]) >= new Date().getFullYear())
    ) {
      alert('invalid expiry date');
      return false;
    }
    return true;
  };

  render() {
    const {
      saveCard,
      isRenderWebview,
      webviewUrl,
      isTokenizing,
      isLoading,
    } = this.state;

    if (isRenderWebview) {
      return (
        <>
          <Loader isLoading={isLoading} />
          <WebView
            scalesPageToFit
            onLoadStart={() => this.setState({isLoading: true})}
            onLoad={() => this.setState({isLoading: false})}
            source={{uri: webviewUrl}}
            injectedJavaScript={runFirst}
            onMessage={this.onMessage}
          />
        </>
      );
    }

    return (
      <View style={AppStyles.container}>
        <Loader isLoading={isLoading} />
        <Header back title={'Card Details'} />
        {this.renderExpiredModal()}
        <View style={styles.content}>
          {this.renderInput('Card Number', 'cardNumber')}
          <View
            style={[
              AppStyles.rowCenterView,
              {justifyContent: 'space-between'},
            ]}>
            <View style={styles.dateCvvView}>
              {this.renderInput('Expiry date (MM/YY)', 'cardExpiryDate')}
            </View>
            <View style={styles.dateCvvView}>
              {this.renderInput('CVC/CVV', 'cardCvn')}
            </View>
          </View>
          {this.renderInput('Cardholder Name', 'cardHolderName')}
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[AppStyles.rowCenterView, styles.saveCardBtn]}
              onPress={() => this.setState({saveCard: !saveCard})}>
              <Image
                source={saveCard ? Images.checkMark : Images.greenCheckBox}
                style={styles.checkBox}
              />
              <Text12 type="regular" title="Save Payment Information" />
            </TouchableOpacity>
            <Text10
              type="light "
              title="Book easier and faster next time. Your payment information is encrypted and safely stored."
              addStyle={styles.description}
            />
            <AppButton
              type={'withoutContainer'}
              title={'Pay'}
              buttonPressed={() => {
                const validated = this.validateInput();
                if (!isTokenizing && validated) {
                  this.tokenize();
                }
                // this.setState({expiredModalVisible: true});
              }}
              containerStyle={{width: '100%'}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: wp(25),
  },
  dateCvvView: {
    width: AppStyles.screenWidth / 1.8 - wp(25),
  },
  bottomView: {
    alignItems: 'center',
    paddingHorizontal: wp(15),
  },
  saveCardBtn: {
    alignSelf: 'center',
    marginTop: hp(60),
    marginBottom: hp(20),
  },
  checkBox: {
    height: wp(20),
    width: wp(20),
    marginRight: wp(10),
  },
  description: {
    paddingHorizontal: wp(25),
  },
  expiredModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(60),
  },
  expiredModalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteFF,
    borderRadius: 10,
    width: '100%',
  },
  expiredIcon: {
    height: hp(61),
    width: wp(55),
    marginBottom: hp(24),
    marginTop: hp(20),
  },
  searchedAgainBtn: {
    paddingVertical: hp(20),
  },
  expiredModalDescription: {
    marginVertical: hp(15),
  },
  input: {
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: Colors.greyE8,
    fontSize: Fonts.size.font12,
    fontFamily: Fonts.type.light,
  },
});
