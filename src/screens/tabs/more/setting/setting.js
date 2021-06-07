import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native'
import { Header, Text14, AppTextInput, Text12, Text10, AppButton } from '../../../../components';
import styles from './setting.styles'

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    buttonPressed(title) {
        const { navigation } = this.props
        
        if(title == "language") {
            //navigation.navigate("changeLanguage")
            
        } else {
          //  navigation.navigate('selectCity')
            navigation.navigate('selectCityOnboarding', { from: 'home' })
        }
    }

    renderButton(title) {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.buttonPressed(title.toLowerCase())}>
                <Text14 title={title} type="light" />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                <Header back title="Setting"/>
                {this.renderButton("Change City Area")}
                {this.renderButton("Language")}
            </View>
        )
    }
}