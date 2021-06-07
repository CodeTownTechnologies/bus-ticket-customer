import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VehicleRoute from '../../../../../components/trainTransFlow/vehicleRoute';

export default class TrainRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <VehicleRoute {...this.props} type="train"/>
  }
}
