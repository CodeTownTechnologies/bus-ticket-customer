import React, { Component } from 'react';
import { View } from 'react-native'
import { HeaderOnbording, Text12, AppButton, LinkText, Loader } from '../../../components';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import styles from './otpVerification.styles'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Colors } from '../../../theme';
import { checkOtp, getOtp } from '../../../store/reducerActions/login/login.action';
import { connect } from 'react-redux';

class OTPVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            errorText: "",
            isButtonDisabled: true,
            isLoading: false,
            otpVal : ""
        }
    }

    componentDidMount() {
        const { otp } = this.props.route.params.data
        console.log('this.props.route.params', this.props.route.params);
        this.setState({ otpVal: otp })
    }

    settextFieldValue(value) {
        this.setState(
            { code: value },
            () => this.validateTextField(value)
        )
    }

    validateTextField(val) {
        const { code } = this.state
        if (val && val != "" && val.length == 4) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    buttonPressed() {
        const { navigation, route, checkOtp } = this.props
        const { code } = this.state

        this.setState({ isLoading: true })

        let data = {
            email: route.params.data.email,
            otp: code
        }
        checkOtp(data)
            .then((res) => {
                this.setState({ isLoading: false })
                console.log('res', res);
                if (res.payload.data.status == "ok") {
                    navigation.navigate('resetPassword', { email: data.email, userId: res.payload.data.data.id })
                } else if (res.payload.data.message) {
                    setTimeout(() => {
                        alert(res.payload.data.message)
                    }, 200);
                } else {
                    setTimeout(() => {
                        alert("Something went wrong, Please try again later")
                    }, 200);
                }
            })
            .catch(e => this.setState({ isLoading: false }))
    }

    resendOTP() {
        const { navigation, getOtp, route } = this.props

        this.setState({ isLoading: true })
        let data = {
            email: route.params.data.email
        }
        getOtp(data)
            .then((res) => {
                this.setState({ isLoading: false })
                if (res.payload.data.status == "ok") {
                    setTimeout(() => {
                        alert("OTP send on your registered mail address.")
                    }, 200);
                } else {
                    setTimeout(() => {
                        alert("Something went wrong, Please try again later")
                    }, 200);
                }
            })
            .catch(e => this.setState({ isLoading: false }))
    }

    render() {
        const { code, isButtonDisabled, isLoading, otpVal } = this.state
        return (
            <>
                <HeaderOnbording back title={"Verification"} description={"Please Enter your OTP code sent\nto your email"} />
                <Loader isLoading={isLoading} />
                <KeyboardAvoidingScrollView style={styles.mainContainer}>
                    <View style={styles.content}>
                        <OTPInputView
                            style={styles.otpContainer}
                            pinCount={4}
                            code={code}
                            onCodeChanged={code => { this.settextFieldValue(code) }}
                            autoFocusOnLoad
                            placeholderTextColor={Colors.black2b}
                            codeInputFieldStyle={styles.otpInput}
                        />
                        <Text12 title={otpVal} type={'light'} addStyle={{ alignSelf: 'center'}}/>
                        <View style={styles.bottomText}>
                            <Text12 title={"Didnt get code? "} type={'light'} />
                            <LinkText title={" Resend OTP"} containerStyle={styles.linkContainer} textStyle={styles.linkTextStyle} linkPressed={() => this.resendOTP()} />
                        </View>
                        <AppButton type={"withoutContainer"} title={"Verify"} disable={isButtonDisabled} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer} />
                    </View>
                </KeyboardAvoidingScrollView>
            </>
        )
    }
}
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    checkOtp: (data) => dispatch(checkOtp(data)),
    getOtp: (data) => dispatch(getOtp(data))
});

export default connect(null, mapDispatchToProps)(OTPVerification);