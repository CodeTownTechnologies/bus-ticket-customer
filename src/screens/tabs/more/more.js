import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Linking   } from 'react-native'
import { Text16, Text12, CustomSafeArea } from '../../../components';
import { Images, Colors } from '../../../theme';
import styles from './more.styles'
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import PrivacyPolicy from './privacyPolicy/privacyPolicy';

class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    resetStack = (whichStack) => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: whichStack }],
            }),
        );
    };

    buttonPressed(navScreen) {
        const { navigation } = this.props
        if(navScreen == "rate the app") {
            let link = "itms-apps://itunes.apple.com/us/app/id${APP_STORE_LINK_ID}?mt=8"
            Linking.canOpenURL(link).then(supported => {
                console.log('supported', supported);
                supported && Linking.openURL(link);
            }, (err) => console.log(err));
            return
        }
        

        if (navScreen == "log out") {
            AsyncStorage.removeItem('USER');
            this.resetStack('onboardingStack')
            return
        }
        if (navScreen == "privacy policy") {
            this.setState({visible: true})
            return
        }

        navigation.navigate(navScreen)
    }

    renderButton(image, title) {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.buttonPressed(title == "Share with friends" ? "share" : title.toLowerCase())}>
                <View style={styles.leftView}>
                    <Image source={image} resizeMode='contain' style={styles.listIcon} />
                    <Text12 title={title} type="light" />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation, user } = this.props
        const { email, firstname, lastname } = user
        
        return (
            <View style={styles.container}>
                <CustomSafeArea backgroundColor={Colors.whiteFF}/>
                <PrivacyPolicy visible={this.state.visible} onBackPress={() => this.setState({visible: false})} />
                <View style={styles.content}>
                    <TouchableOpacity style={styles.acInfoView} onPress={() => navigation.navigate("editAccount", { user  })}>
                        <Image source={Images.userIcon} style={styles.userInfoImg} />
                        <View>
                            <Text16 title={firstname + " " + lastname} type="regular" />
                            <Text12 title={email} type="lightGrey" addStyle={styles.emailTxt} />
                        </View>
                    </TouchableOpacity>
                    {this.renderButton(Images.share, "Share with friends")}
                    {this.renderButton(Images.warning, "Privacy policy")}
                    {this.renderButton(Images.rate, "Rate the app")}
                    {this.renderButton(Images.help, "Help")}
                    {this.renderButton(Images.setting, "Setting")}
                    {this.renderButton(Images.logout, "Log out")} 
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.loginReducer.user
});
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(More);