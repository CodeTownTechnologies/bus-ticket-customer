import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VehicleList from '../../../../components/trainTransFlow/vehicleList';

export default class Train extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props
    return <VehicleList navigation={navigation} type="train"/>
  }
}
