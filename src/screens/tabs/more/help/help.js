import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Linking } from 'react-native';
import { Header, Text14 } from '../../../../components';
import styles from './help.styles';
import { Images } from '../../../../theme';

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    buttonPressed(type, title) {
        if(type == "email") {
            Linking.openURL(`mailto:${title}`)
        }
    }

    renderButton(image, title, type) {
        return (
            <TouchableOpacity disabled={title == "Contact us"} style={[styles.buttonContainer, image ? {} : styles.border]} onPress={() => this.buttonPressed(type, title)}>
                <View style={styles.leftView}>
                    {image ? <Image source={image} resizeMode='contain' style={styles.listIcon} /> : null}
                    <Text14 title={title} type="light" />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Header back title="Help" />
                <View style={styles.content}>
                    {this.renderButton("", "Contact us")}
                    {this.renderButton(Images.email, "cs@busticket.com", 'email')}
                    {this.renderButton(Images.whatsapp, "00000000", 'number')}
                </View>
            </View>
        );
    }
}
