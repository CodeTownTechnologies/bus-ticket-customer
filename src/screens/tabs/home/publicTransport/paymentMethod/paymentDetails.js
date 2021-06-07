import React, { Component } from 'react';
import { View, Text, Modal, Image } from 'react-native';
import api from '../../../../../api/api';
import { Header, Text12, AppButton, Text14, Text16, Loader } from '../../../../../components';
import { Colors, Images } from '../../../../../theme';
import moment from 'moment'

export default class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      ticketSuccessModal: false
    };
  }

  buyPressed() {
    const { trip_id, price, departureDate } = this.props.route.params

    this.setState({ isLoading: true })
    let data = {
      trip_id: trip_id,
      price: price,
      booking_date: moment(departureDate).format('YYYY-MM-DD')
    }
    api.home.createBooking(data)
      .then(res => {
        this.setState({ isLoading: false })
        console.log('createBooking', res);
        if (res != 'error') {
          // this.props.navigation.navigate('creditCard')
          // this.props.navigation.navigate('publicTransport')
          this.setState({ ticketSuccessModal: true })

        }
      })
  }

  renderSuccessModal() {
    return (
      <Modal
        visible={this.state.ticketSuccessModal}
        transparent
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: Colors.whiteFF, alignItems: 'center', marginHorizontal: 25, width: '85%', borderRadius: 4, paddingVertical: 15 }}>
            <Text12 type="regular" title={"Ticket Purchase Successful"} />
            <Image source={Images.roundCheckMark} style={{ height: 53, width: 53, marginVertical: 25 }} />
            <AppButton type={"withoutContainer"} title={"Use Ticket"} buttonPressed={() => {
              this.setState({ ticketSuccessModal: false },
                () => this.props.navigation.navigate('UseTicket', this.props.route.params)
              )
            }} containerStyle={{ width: '90%', marginTop: 0 }} />
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Loader isLoading={this.state.isLoading} />
        {this.renderSuccessModal()}
        <Header back title="Payment Method" />
        <View style={{ alignItems: 'center', marginVertical: 35 }}>
          <Text16 type="regular" title={"1 X Trip"} />
          <Text16 type="regular" title={"Rp " + this.props.route.params.price} addStyle={{ color: Colors.brownE1, marginTop: 15 }} />
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <View>
            <Text14 type="regular" title={this.props.route.params.paymentType} />
          </View>
          <View style={{ borderTopWidth: 1, borderBottomWidth: 1, marginVertical: 13, paddingVertical: 13, borderColor: Colors.greyEb }}>
            <Text14 type="regular" title={"Pricing Details"} addStyle={{ marginVertical: 13 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text12 type="light" title={"Total Price"} />
              <Text14 type="regular" title={"Rp " + this.props.route.params.price} addStyle={{ color: Colors.brownE1 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text12 type="light" title={"Discounts"} />
              <Text14 type="regular" title={"Rp 0"} addStyle={{ color: Colors.brownE1 }} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text14 type="regular" title={"Total Payment"} />
            <Text14 type="regular" title={"Rp " + this.props.route.params.price} addStyle={{ color: Colors.brownE1 }} />
          </View>
          <AppButton type={"withoutContainer"} title={"Pay with " + this.props.route.params.paymentType} buttonPressed={() => this.buyPressed()} containerStyle={{}} />
        </View>
      </View>
    );
  }
}
