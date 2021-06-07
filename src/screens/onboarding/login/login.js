import React, { Component } from 'react';
import { View, Image, Keyboard, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Images, Colors } from '../../../theme';
import styles from './styles';
import { AppTextInput, LinkText, AppButton, Text12, Header, Loader, Text14 } from '.././../../components/index';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { emailValidation } from '../../../utils/regularExpression';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../../../store/reducerActions/login/login.action'
import Swiper from 'react-native-swiper';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      passowrdValue: '',
      emailValue: '',
      toolTipVisible: false,
      modalVisible: false,
      isLoginDisabled: true,
      roleModalVisible: false,
      errorText: "",
      passwordTextInput: null,
      secureEntry: true,
      isLoading: false
    };
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly', "https://www.googleapis.com/auth/userinfo.profile"],
      androidClientId: "685541761847-j62hr86j19sc1m8kk95dlbp0apffig2p.apps.googleusercontent.com"
    });
  }

  getInfoFromToken = token => {
    const _this = this
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );


          const PROFILE_REQUEST_PARAMS = { fields: { string: 'id, name,  first_name, last_name, email' } };
          const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, result) => {
              if (error) {
                console.log('login info has error: ', error);
              } else {
                console.log('result:', result);
                let data = {
                  firstName: result.first_name,
                  lastName: result.last_name,
                  email: result.email,
                  facebook_id: result.id,
                  google_id: "",
                  mode: 2
                }
                if (data.email) {
                   _this.loginButtonPressed("", result.id, 2, data)
                } else {
                  _this.props.navigation.navigate('signUp', data)
                }

              }
            },
          );
          new GraphRequestManager().addRequest(profileRequest).start();
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    )
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      let data = {
        firstName: userInfo.user.name,
        lastName: userInfo.user.familyName,
        email: userInfo.user.email,
        facebook_id: "",
        google_id: userInfo.user.id,
        mode: 3
      }
      this.loginButtonPressed(userInfo.user.id, "", 3, data)
    } catch (error) {
      console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  loginButtonPressed(google_id = "", facebook_id = "", mode = 1, navData) {
    const { login } = this.props
    const { emailValue, passowrdValue } = this.state

    this.setState({ isLoading: true })
    var data = {
      type: "Customer",
      email: (navData && navData.firstName) ? navData.email : emailValue,
      password: passowrdValue,
      google_id: google_id,
      facebook_id: facebook_id,
      mode: mode,
      name: (navData && navData.firstName) ? navData.firstName : ""
    }

    console.log('data', data);


    login(data)
      .then((res) => {
        console.log('res', res);

        this.setState({ isLoading: false })
        if (res.payload.data.status.toLowerCase() == "ok") {
          if (res.payload.data.new_user == "1") {
            this.props.navigation.navigate('signUp', navData)
          } else {
            AsyncStorage.setItem('USER', JSON.stringify(res.payload.data.data));
            this.resetStack('tabbar');
          }
        }
      })
      .catch(error => {
        console.log('error', error);

        this.setState({ isLoading: false })
        setTimeout(() => {
          alert("Something went wrong, please check your email and password and try again later")
        }, 300);
      })

  }

  settextFieldValue(val, type) {
    const { emailValue, passowrdValue } = this.state
    let str = val.trim()
    if (type == "Email") {
      this.setState({ emailValue: str, errorText: "" })
    } else {
      this.setState({ passowrdValue: str })
    }
    setTimeout(() => {
      this.validateTextField(val)
    }, 100);
    if (emailValue.length != 0 && passowrdValue.length != 0 && str.length != 0) {
      this.setState({ errorMessage: "" })
    }
  }

  validateTextField(val) {
    const { emailValue, passowrdValue } = this.state
    if (emailValue != "" && passowrdValue != "" && val.length != 0) {
      if (!emailValidation(emailValue)) {
        this.setState({ isLoginDisabled: true })
      } else {
        this.setState({ isLoginDisabled: false })
      }
    } else {
      this.setState({ isLoginDisabled: true })
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



  render() {
    const { isLoginDisabled, secureEntry, isLoading } = this.state
    const { navigation } = this.props

    let data = ["1", "2", "3"].map((item, index) => {
      return (
        <View key={item.toString()} style={styles.swipperContainer}>
          <Text14 type="regular" title={"banner " + item} addStyle={styles.description} />
        </View>
      )
    })

    return (
      <>
        <Header title={"Welcome to BUSTIKET"} />
        <Loader isLoading={isLoading} />
        <View style={styles.mainContainer}>
          <KeyboardAvoidingScrollView bounces={false} >
            <Swiper
              // onIndexChanged={(index) => onNext(index)}
              autoplay={false}
              style={styles.wrapper}
              showsButtons={false}
              activeDotColor={Colors.green27}
              dotColor={Colors.whiteFF}
              dotStyle={styles.dotStyle}
              style={styles.wrapper}
              activeDotStyle={styles.activeDotSyle}
            >
              {data}
            </Swiper>
            <View style={styles.content}>
              <AppTextInput
                onChange={(text) => { this.settextFieldValue(text, 'Email') }}
                value={this.state.emailValue}
                placeholderText={"Email address"}
                type={'email-address'}
                error={this.state.errorText}
                onSubmit={() => {
                  if (!emailValidation(this.state.emailValue)) {
                    this.setState({ errorText: "Please enter valid email Id." })
                    this.passwordTextInput.focus();
                  } else {
                    this.passwordTextInput.focus();
                  }
                }}
                onBlur={() => {
                  if (!emailValidation(this.state.emailValue) && this.state.emailValue.length > 0) {
                    this.setState({ errorText: "Please enter valid email Id." })
                  }
                }}
                containerStyle={{ marginTop: 10 }}
              />
              <AppTextInput
                refName={(input) => { this.passwordTextInput = input; }}
                onChange={(text) => { this.settextFieldValue(text, 'Password') }}
                iconImageRight={secureEntry ? Images.passwordDisabled : Images.eyeIcon}
                iconImageRightStyle={secureEntry ? {tintColor: Colors.greyCb} : {tintColor: Colors.yellowF6}}
                secure={secureEntry}
                onSubmit={() => { Keyboard.dismiss() }}
                containerStyle={styles.passwordField}
                value={this.state.passowrdValue}
                placeholderText={"Password"}
                rightAction={() => { this.setState({ secureEntry: !secureEntry }) }}
              />
              <AppButton type={"withoutContainer"} title={"Login"} disable={isLoginDisabled} buttonPressed={() => this.loginButtonPressed()} />
              <AppButton type={"withoutContainer"} image={Images.fb} title={"Continue with Facebook"} buttonPressed={() => { this.getInfoFromToken() }} containerStyle={styles.fbBtn} />
              <AppButton type={"withoutContainer"} image={Images.google} title={"Continue with Google"} buttonPressed={() => { this.signIn() }} containerStyle={styles.gBtn} />

              <View style={styles.registerTextContainer}>
                <LinkText title={"Need a BUSTIKET account?"} containerStyle={styles.linkContainer} linkPressed={() => navigation.navigate('signUp')} />
              </View>
            </View>
          </KeyboardAvoidingScrollView>
          <AppButton type={"borderContainer"} title={"Forgot password"} containerStyle={{ marginTop: 0 }} buttonPressed={() => navigation.navigate('forgotPassword')} />
        </View>
      </>
    );
  }
}

//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data))
});

export default connect(null, mapDispatchToProps)(Login);