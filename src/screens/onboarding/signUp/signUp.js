import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Header, AppTextInput, AppButton, Loader, LinkText, Text10 } from '../../../components';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import styles from './signUp.styles'
import { emailValidation } from '../../../utils/regularExpression';
import { connect } from 'react-redux';
import { signUp } from '../../../store/reducerActions/login/login.action';
import { Images, Fonts } from '../../../theme';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';


class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: "",
            fullName: "",
            passowrd: "",
            secureEntry: true,
            lastName: "",
            errorText: "",
            isButtonDisabled: true,
            isLoading: false
        }
        // GoogleSignin.configure({
        //     scopes: ['https://www.googleapis.com/auth/drive.readonly', "https://www.googleapis.com/auth/userinfo.profile"],
        //     androidClientId: "685541761847-j62hr86j19sc1m8kk95dlbp0apffig2p.apps.googleusercontent.com"
        //   });
    }

    componentDidMount() {
        const { route } = this.props
        
        if(route.params) {
            const { firstName, lastName, email, facebook_id, google_id, mode } = route.params
            this.setState({ fullName: firstName, lastName: lastName, emailValue: email, facebook_id, google_id, mode })
        }
    }

    // fbLogin = token => {
    //     const _this = this
    //     LoginManager.logInWithPermissions(["public_profile"]).then(
    //       function(result) {
    //         if (result.isCancelled) {
    //           console.log("Login cancelled");
    //         } else {
    //           console.log(
    //             "Login success with permissions: " +
    //               result.grantedPermissions.toString()
    //           );
    //           const PROFILE_REQUEST_PARAMS = { fields: { string: 'id, name,  first_name, last_name', } };
    //           const profileRequest = new GraphRequest(
    //             '/me',
    //             { token, parameters: PROFILE_REQUEST_PARAMS },
    //             (error, result) => {
    //               if (error) {
    //                 console.log('login info has error: ', error);
    //               } else {
    //                 console.log('result:', result);
    //                 _this.setState({fullName: result.first_name, lastName: result.last_name},
    //                     () => _this.buttonPressed("", result.id, 2)
    //                 )
    //               }
    //             },
    //           );
    //           new GraphRequestManager().addRequest(profileRequest).start();
    //         }
    //       },
    //       function(error) {
    //         console.log("Login fail with error: " + error);
    //       }
    //     )
    //   };

    // gSignIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       console.log('userInfo', userInfo);
    
    //       this.setState({ emailValue: userInfo.user.email },
    //         () => this.buttonPressed(userInfo.user.id, "", 3)
    //       );
    
    //     } catch (error) {
    //       console.log('error', error);
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    // };

    settextFieldValue(value, type) {
        this.setState(
            { [type]: value },
            () => this.validateTextField(value)
        )
    }

    validateTextField(val) {
        const { fullName, emailValue, lastName, passowrd } = this.state
        if (emailValue != "" && fullName != "" && lastName != "" && passowrd != ""  && val.length != 0) {
            if (!emailValidation(emailValue)) {
                this.setState({ isButtonDisabled: true })
            } else {
                this.setState({ isButtonDisabled: false })
            }
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }


    buttonPressed() {
        const { signup, navigation } = this.props
        const { fullName, emailValue, passowrd, lastName, facebook_id, google_id, mode  } = this.state

        this.setState({ isLoading: true })
        let data = {
            first_name: fullName,
            last_name: lastName,
            password: passowrd,
            mode: mode,
            facebook_id: facebook_id,
            email: emailValue,
            google_id: google_id
        }
        signup(data)
            .then(res => {
                console.log(res);
                this.setState({ isLoading: false })

                if (res.payload.data.status == 'ok') {
                    AsyncStorage.setItem('USER', JSON.stringify(res.payload.data.data));

                    this.resetStack('selectCityOnboarding')
                } else if(res.payload.data.message) {
                    setTimeout(() => {
                        alert(res.payload.data.message)
                    }, 300);
                }   
             })
            .catch(e => this.setState({ isLoading: false }) )
    }

    resetStack = (whichStack) => {
        const { navigation } = this.props

        let resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: whichStack }],
        });
        navigation.dispatch(resetAction);
    };

    render() {
        const { fullName, lastName, emailValue, secureEntry, errorText, isButtonDisabled, isLoading } = this.state
        const { navigation } = this.props

        return (
            <View style={styles.mainContainer} >
                <Header back title={"Create a BUSTIKET account"} />
                <Loader isLoading={isLoading} />
                <View style={styles.mainContainer} >
                    <KeyboardAvoidingScrollView bounces={false}>
                        <View style={styles.content}>
                            <AppTextInput
                                onChange={(text) => { this.settextFieldValue(text, 'fullName') }}
                                value={fullName}
                                placeholderText={"First name"}
                                containerStyle={styles.txtFieldStyle}
                            />
                            <AppTextInput
                                onChange={(text) => { this.settextFieldValue(text, 'lastName') }}
                                value={lastName}
                                placeholderText={"Last name"}
                                containerStyle={styles.txtFieldStyle}
                            />
                            <AppTextInput
                                onChange={(text) => { this.settextFieldValue(text, 'emailValue') }}
                                value={emailValue}
                                placeholderText={"Email address"}
                                type={'email-address'}
                                containerStyle={styles.txtFieldStyle}
                                error={errorText}
                                onSubmit={() => {
                                    if (!emailValidation(emailValue)) {
                                        this.setState({ errorText: "Please enter valid email Id." })
                                    }
                                }}
                                onBlur={() => {
                                    if (!emailValidation(emailValue) && emailValue.length > 0) {
                                        this.setState({ errorText: "Please enter valid email Id." })
                                    }
                                }}
                            />
                            <AppTextInput
                                refName={(input) => { this.passwordTextInput = input; }}
                                onChange={(text) => { this.settextFieldValue(text, 'passowrd') }}
                                iconImageRight={secureEntry ? Images.passwordDisabled : Images.eyeIcon}
                                secure={secureEntry}
                                value={this.state.passowrd}
                                placeholderText={"Password"}
                                rightAction={() => { this.setState({ secureEntry: !secureEntry }) }}
                                containerStyle={styles.txtFieldStyle}
                            />
                            <AppButton type={"withoutContainer"} title={"Register"} disable={isButtonDisabled} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer} />
                            {/* <AppButton type={"withoutContainer"} image={Images.fb} title={"Continue with Facebook"} buttonPressed={() => this.fbLogin()} containerStyle={styles.fbButton} />
                            <AppButton type={"withoutContainer"} image={Images.google} title={"Continue with Google"} buttonPressed={() => this.gSignIn()} containerStyle={styles.googleButton} /> */}
                            <View style={styles.registerTextContainer}>
                                <Text10 title="By pressing Register you agree with" type={"light"}/>
                                <LinkText title={" Terms and Conditions "} containerStyle={styles.linkContainer} linkPressed={() => navigation.navigate('signUp')} textStyle={{ fontSize: Fonts.size.font10 }}/>
                                <Text10 title="and" type={"light"}/>
                                <LinkText title={" Privacy Policy"} containerStyle={styles.linkContainer} linkPressed={() => navigation.navigate('signUp')} textStyle={{ fontSize: Fonts.size.font10 }}/>
                            </View>
                        </View>
                    </KeyboardAvoidingScrollView>
                </View>
                <AppButton type={"borderContainer"} title={"Forgot password"} containerStyle={{ marginTop: 0 }} buttonPressed={() => navigation.navigate('forgotPassword')} />

            </View>
        )
    }
}
//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    signup: (data) => dispatch(signUp(data))
});

export default connect(null, mapDispatchToProps)(ContactUs);