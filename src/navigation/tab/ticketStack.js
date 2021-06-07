import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Ticket from '../../screens/tabs/ticket/ticket';

const Stack = createStackNavigator();

function historyStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="ticket" component={Ticket} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default historyStack;