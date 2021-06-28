import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {
  Header,
  PaymentTypes,
  AppButton,
  Text14,
  Text16,
} from '../../../../../components';
import {Colors} from '../../../../../theme';

export default class PaymentMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: '',
    };
  }

  render() {
    const {paymentType} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header back title="Payment Method" />
        <ScrollView>
          <View style={{alignItems: 'center', marginVertical: 35}}>
            <Text16 type="regular" title={'1 X Trip'} />
            <Text16
              type="regular"
              title={'Rp ' + this.props.route.params.price}
              addStyle={{color: Colors.brownE1, marginTop: 15}}
            />
          </View>
          <PaymentTypes
            selectPaymentType={(item) => this.setState({paymentType: item})}
            paymentType={this.state.paymentType}
          />
        </ScrollView>
        <AppButton
          type={'withoutContainer'}
          disable={!paymentType}
          title={'Next'}
          buttonPressed={() =>
            this.props.navigation.navigate('PaymentDetails', {
              ...this.props.route.params,
              paymentType: paymentType,
            })
          }
          containerStyle={{marginTop: 0}}
        />
      </View>
    );
  }
}
