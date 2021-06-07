import React, { Component } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import { AppButton, Header, Text10, Text12, Text14 } from '../../../../../components';
import { Colors, Images } from '../../../../../theme';

export default class SubscriptionPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: ""
    };
  }

  renderPackageData(tripNo, days) {
    const { trip_route_name, price } = this.props.route.params
    return (
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 25, marginVertical: 15, borderBottomColor: Colors.greyE2, borderBottomWidth: 1 }}
        onPress={() => this.setState({ totalPrice: price*tripNo})}
      >
        <View style={{ marginBottom: 15}}>
          <Text12 type="light" title={trip_route_name}/>
          <Text14 type="regular" title={tripNo+" Trip"}/>
          <Text10 type="regular" title={days+" Days"}/>
        </View>
        <Text14 type="regular" title={"Rp " + price*tripNo} addStyle={{ color: Colors.brownE1 }}/>
        {this.state.totalPrice == price*tripNo ? <Image source={Images.checkMark} style={{ height: 20, width: 20 }} resizeMode="contain"/> : <View style={{ height: 20, width: 20 }}/>}
      </TouchableOpacity>
    )
  }
  render() {
    const { totalPrice } = this.state

    console.log(this.props);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.whiteFF }}>
        <Header back title="Subscription Package"/>
        {this.renderPackageData(6, 7)}
        {this.renderPackageData(12, 14)}
        {this.renderPackageData(24, 30)}
        <AppButton type={"withoutContainer"} disable={!totalPrice} title={"Next"} buttonPressed={() => this.props.navigation.push('bookingDetail', { ...this.props.route.params, price: totalPrice, fromFlow: "Subscription"})} containerStyle={{  marginHorizontal: 25 }} />

      </View>
    );
  }
}
