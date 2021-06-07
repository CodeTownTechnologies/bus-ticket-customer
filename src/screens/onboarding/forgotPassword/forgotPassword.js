import React, { Component } from "react";
import { View, Keyboard } from "react-native";
import {
  HeaderOnbording,
  AppTextInput,
  AppButton,
  Loader,
} from "../../../components";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import styles from "./forgotPassword.styles";
import { emailValidation } from "../../../utils/regularExpression";
import { getOtp } from "../../../store/reducerActions/login/login.action";
import { connect } from "react-redux";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      errorText: "",
      isButtonDisabled: true,
      isLoading: false,
    };
  }

  settextFieldValue(value) {
    this.setState({ emailValue: value, errorText: "" }, () =>
      this.validateTextField(value)
    );
  }

  validateTextField(val) {
    const { emailValue } = this.state;
    if (emailValue != "") {
      if (!emailValidation(emailValue)) {
        this.setState({ isButtonDisabled: true });
      } else {
        this.setState({ isButtonDisabled: false });
      }
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  buttonPressed() {
    const { navigation, getOtp } = this.props;
    const { emailValue } = this.state;

    this.setState({ isLoading: true });
    let data = {
      email: emailValue,
    };
    getOtp(data)
      .then((res) => {
        this.setState({ isLoading: false });
        console.log("res", res);
        if (res.payload.data.status == "ok") {
          data.otp = res.payload.data.data;
          navigation.navigate("otpVerification", { data });
        } else {
          alert("Something went wrong, Please try again later");
        }
      })
      .catch((e) => this.setState({ isLoading: false }));
  }

  render() {
    const { emailValue, errorText, isButtonDisabled, isLoading } = this.state;
    return (
      <>
        <HeaderOnbording
          back
          title={"Forgot Password"}
          description={"Enter your email id to get otp"}
        />
        <Loader isLoading={isLoading} />
        <KeyboardAvoidingScrollView style={styles.mainContainer}>
          <View style={styles.content}>
            <AppTextInput
              onChange={(text) => {
                this.settextFieldValue(text, "emailValue");
              }}
              value={emailValue}
              placeholderText={"Email address"}
              type={"email-address"}
              error={errorText}
              onSubmit={() => {
                if (!emailValidation(emailValue)) {
                  this.setState({ errorText: "Please enter valid email Id." });
                }
                Keyboard.dismiss();
              }}
              onBlur={() => {
                if (!emailValidation(emailValue) && emailValue.length > 0) {
                  this.setState({ errorText: "Please enter valid email Id." });
                }
              }}
            />
            <AppButton
              type={"withoutContainer"}
              title={"Get OTP"}
              disable={isButtonDisabled}
              buttonPressed={() => this.buttonPressed()}
              containerStyle={styles.buttonContainer}
            />
          </View>
        </KeyboardAvoidingScrollView>
      </>
    );
  }
}
//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({
  getOtp: (data) => dispatch(getOtp(data)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
