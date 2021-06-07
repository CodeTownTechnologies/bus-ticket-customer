import React, { Component } from 'react';
import {  SelectionList } from '../../../../../components';

export default class SelectCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <SelectionList 
                header="Change City Area" 
                data={[{id: 1, cityName: "jaipur"}, {id: 2, cityName: "gurgaon"}, {id: 3, cityName: "delhi"}, {id: 4, cityName: "agra"}]} 
                buttonPressed={() => {alert()}}
            />
        )
    }
}
