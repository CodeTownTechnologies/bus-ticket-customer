import React, { Component } from 'react';
import VehicleRouteProblem from '../../../../../components/trainTransFlow/vehicleRouteProblem';

export default class TrainProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <VehicleRouteProblem {...this.props} type="train" />
  }
}
