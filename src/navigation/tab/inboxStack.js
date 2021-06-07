import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inbox from '../../screens/tabs/inbox/inbox';

const Stack = createStackNavigator();

function busBreakdownStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="inbox" component={Inbox} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default busBreakdownStack;