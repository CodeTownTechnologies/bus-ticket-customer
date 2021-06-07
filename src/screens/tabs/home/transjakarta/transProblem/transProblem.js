import React, { Component } from 'react';
import { View, Text } from 'react-native';
import VehicleRouteProblem from '../../../../../components/trainTransFlow/vehicleRouteProblem';

export default class TransProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <VehicleRouteProblem {...this.props} type="trans" />
  }
}
