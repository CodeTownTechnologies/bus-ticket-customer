import React, { Component } from 'react';
import { View } from 'react-native'
import { HeaderOnbording, AppTextInput, AppButton, Loader } from '../../../components';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import styles from './resetPassword.styles'
import { Images, Colors } from '../../../theme';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { updatePassword, profileDetail } from '../../../store/reducerActions/login/login.action';
import { hp } from '../../../utils/heightWidthRatio';
import AsyncStorage from '@react-native-community/async-storage';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureEntryNewPassword: true,
            secureEntryConfirmPassword: true,
            errorText: "",
            isButtonDisabled: true,
            confirmPassword: "",
            newPassword: "",
            isLoading: false
        }
    }

    settextFieldValue(value, type) {
        this.setState(
            { [type]: value, errorText: "" },
            () => this.validateTextField(value)
        )
    }

    validateTextField(val) {
        const { confirmPassword, newPassword } = this.state
        if (confirmPassword && newPassword && confirmPassword == newPassword) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    buttonPressed() {
        const { route, updatePassword } = this.props
        const { confirmPassword, newPassword } = this.state

        this.setState({ isLoading: true })

        let data = {
            user_id: route.params.userId,
            new_password: newPassword,
            confirm_password: confirmPassword
        }
        updatePassword(data)
            .then(res => {
                console.log('res', res);
                if (res.payload.data.status == "ok") {
                    this.getProfileDetail(data.user_id)
                } else if (res.payload.data.message) {
                    this.setState({ isLoading: false },
                        () => setTimeout(() => {
                            alert(res.payload.data.message)
                        }, 200)
                    )
                } else {
                    this.setState({ isLoading: false },
                        () => setTimeout(() => {
                            alert("Something went wrong, Please try again later")
                        }, 200)
                    )
                }
            })
            .catch(e => { this.setState({ isLoading: false }) })
    }

    getProfileDetail(id) {
        const { profileDetail } = this.props

        profileDetail({ user_id: id })
            .then(res => {
                this.setState({ isLoading: false })
                console.log('profileDetail', res);

                if (res.payload.data.status == "ok") {
                    AsyncStorage.setItem('USER', JSON.stringify(res.payload.data.data));
                    this.resetStack('tabbar')
                } else {
                    setTimeout(() => {
                        alert("Something went wrong, Please try again later")
                    }, 200)
                }
            })
    }

    resetStack = (whichStack) => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: whichStack }],
            }),
        );
    };


    onBlur() {
        const { confirmPassword, newPassword } = this.state
        if (confirmPassword && newPassword && confirmPassword != newPassword) {
            this.setState({ errorText: "Password mismatch" })
        } else {
            this.setState({ errorText: "" })
        }
    }

    render() {
        const { secureEntryNewPassword, secureEntryConfirmPassword, isButtonDisabled, errorText, isLoading } = this.state
        return (
            <>
                <HeaderOnbording back title={"Reset"} description={"Your Password"} />
                <Loader isLoading={isLoading} />
                <KeyboardAvoidingScrollView style={styles.mainContainer}>
                    <View style={styles.content}>
                        <AppTextInput
                            refName={(input) => { this.newPasswordTextInput = input; }}
                            onChange={(text) => { this.settextFieldValue(text, 'newPassword') }}
                            iconImageRight={secureEntryNewPassword ? Images.passwordDisabled : Images.eyeIcon}
                            secure={secureEntryNewPassword}
                            iconImageRightStyle={secureEntryNewPassword ? {tintColor: Colors.greyCb} : {tintColor: Colors.yellowF6}}
                            containerStyle={styles.passwordContainer}
                            value={this.state.newPassword}
                            placeholderText={"New Password"}
                            rightAction={() => { this.setState({ secureEntryNewPassword: !secureEntryNewPassword }) }}
                            onBlur={() => this.onBlur()}
                        />
                        <AppTextInput
                            refName={(input) => { this.confirmPasswordTextInput = input; }}
                            onChange={(text) => { this.settextFieldValue(text, 'confirmPassword') }}
                            iconImageRight={secureEntryConfirmPassword ? Images.passwordDisabled : Images.eyeIcon}
                            iconImageRightStyle={secureEntryConfirmPassword ? {tintColor: Colors.greyCb} : {tintColor: Colors.yellowF6}}
                            secure={secureEntryConfirmPassword}
                            containerStyle={{ marginTop: hp(30) }}
                            value={this.state.confirmPassword}
                            placeholderText={"Confirm Password"}
                            rightAction={() => { this.setState({ secureEntryConfirmPassword: !secureEntryConfirmPassword }) }}
                            onBlur={() => this.onBlur()}
                            error={errorText}
                        />
                        <AppButton type={"withoutContainer"} title={"Reset Password"} disable={isButtonDisabled} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer} />
                    </View>
                </KeyboardAvoidingScrollView>
            </>
        )
    }
}

//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    updatePassword: (data) => dispatch(updatePassword(data)),
    profileDetail: (data) => dispatch(profileDetail(data))
});

export default connect(null, mapDispatchToProps)(ResetPassword);