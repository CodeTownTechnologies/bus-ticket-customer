import React, { Component } from 'react';
import {  SelectionList } from '../../../../../components';

export default class ChangeLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { navigation } = this.props
        return (
            <SelectionList 
                header="Language" 
                selectedData={{id: 1, cityName: "english"}}
                data={[{id: 1, cityName: "english"}]} 
                buttonPressed={() => {navigation.goBack()}}
            />
        )
    }
}
