import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/tabs/home/home';
import PublicTransport from '../../screens/tabs/home/publicTransport/publicTransport';
import RouteData from '../../screens/tabs/home/publicTransport/routeData/routeData';
import BookingDetail from '../../screens/tabs/home/publicTransport/bookingDetail/bookingDetail';
import SelectPassenger from '../../screens/tabs/home/akap/selectPassenger/selectPassenger';
import Akap from '../../screens/tabs/home/akap/akap';
import SelectTrip from '../../screens/tabs/home/akap/selectTrip/selectTrip';
import Transjakarta from '../../screens/tabs/home/transjakarta/transjakarta';
import Train from '../../screens/tabs/home/train/train';
import CompleteOrder from '../../screens/tabs/home/akap/completeOrder/completeOrder';
import CreditCard from '../../components/paymentFlow/creditCard';
import TransProblem from '../../screens/tabs/home/transjakarta/transProblem/transProblem';
import TransRoute from '../../screens/tabs/home/transjakarta/transRoute/transRoute';
import TrainRoute from '../../screens/tabs/home/train/trainRoute/trainRoute';
import TrainProblem from '../../screens/tabs/home/train/trainProblem/trainProblem';
import PaymentMode from '../../screens/tabs/home/publicTransport/paymentMethod/paymentMode';
import PaymentDetails from '../../screens/tabs/home/publicTransport/paymentMethod/paymentDetails';
import UseTicket from '../../screens/tabs/home/publicTransport/paymentMethod/useTicket';
import SelectCityOnboarding from '../../screens/onboarding/SelectCityOnboarding/SelectCityOnboarding'
import SubscriptionPackage from '../../screens/tabs/home/publicTransport/subscriptionPackage/subscriptionPackage';
import PackageDetails from '../../screens/tabs/home/publicTransport/subscriptionPackage/packageDetails';

const Stack = createStackNavigator();

function busRouteStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        {/*  PT  */}
        <Stack.Screen name="publicTransport" component={PublicTransport} options={{ headerShown: false }} />
        <Stack.Screen name="routeData" component={RouteData} options={{ headerShown: false }} />
        <Stack.Screen name="bookingDetail" component={BookingDetail} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentMode" component={PaymentMode} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} options={{ headerShown: false }} />
        <Stack.Screen name="UseTicket" component={UseTicket} options={{ headerShown: false }} />
        <Stack.Screen name="selectCityOnboarding" component={SelectCityOnboarding} options={{ headerShown: false }} />

        <Stack.Screen name="subscriptionPackage" component={SubscriptionPackage} options={{ headerShown: false }} />
        <Stack.Screen name="packageDetails" component={PackageDetails} options={{ headerShown: false }} />

        {/*  AKAP  */}
        <Stack.Screen name="akap" component={Akap} options={{ headerShown: false }} />
        <Stack.Screen name="selectPassenger" component={SelectPassenger} options={{ headerShown: false }} />
        <Stack.Screen name="selectTrip" component={SelectTrip} options={{ headerShown: false }} />
        <Stack.Screen name="completeOrder" component={CompleteOrder} options={{ headerShown: false }} />
        <Stack.Screen name="creditCard" component={CreditCard} options={{ headerShown: false }} />

        {/*  Transjakarta  */}
        <Stack.Screen name="transjakarta" component={Transjakarta} options={{ headerShown: false }} />
        <Stack.Screen name="transRoute" component={TransRoute} options={{ headerShown: false }} />
        <Stack.Screen name="transProblem" component={TransProblem} options={{ headerShown: false }} />

        {/*  Train  */}
        <Stack.Screen name="train" component={Train} options={{ headerShown: false }} />
        <Stack.Screen name="trainRoute" component={TrainRoute} options={{ headerShown: false }} />
        <Stack.Screen name="trainProblem" component={TrainProblem} options={{ headerShown: false }} />

      </Stack.Navigator>
  );
}

export default busRouteStack;