import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './../screens/onboarding/login/login';
import SignUp from './../screens/onboarding/signUp/signUp';
import ForgotPassword from './../screens/onboarding/forgotPassword/forgotPassword';
import OtpVerification from './../screens/onboarding/otpVerification/otpVerification';
import ResetPassword from './../screens/onboarding/resetPassword/resetPassword';
import Swipper from '../screens/onboarding/swipper/swipper';
import SelectCityOnboarding from '../screens/onboarding/SelectCityOnboarding/SelectCityOnboarding';

const Stack = createStackNavigator();

function onboardingStackStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="otpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="swipper"
        component={Swipper}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="selectCityOnboarding"
        component={SelectCityOnboarding}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default onboardingStackStackNavigator;
