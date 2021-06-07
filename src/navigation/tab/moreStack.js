import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import More from '../../screens/tabs/more/more';
import EditAccount from '../../screens/tabs/more/editAccount/editAccount';
import Inbox from '../../screens/tabs/more/inbox/inbox';
import Setting from '../../screens/tabs/more/setting/setting';
import SelectCity from '../../screens/tabs/more/setting/selectCity/selectCity';
//import ChangeLanguage from '../../screens/tabs/more/setting/changeLanguage/changeLlanguage';
import Share from '../../screens/tabs/more/share/share';
import Help from '../../screens/tabs/more/help/help';


const Stack = createStackNavigator();

function moreStack({ navigation, route }) {
  navigation.setOptions({ tabBarVisible: route.state ? route.state.index > 0 ? false : true : null });

  return (
      <Stack.Navigator>
        <Stack.Screen name="more" component={More} options={{ headerShown: false }} />
        <Stack.Screen name="editAccount" component={EditAccount} options={{ headerShown: false }} />
        <Stack.Screen name="inbox" component={Inbox} options={{ headerShown: false }} />
        <Stack.Screen name="setting" component={Setting} options={{ headerShown: false }} />
        <Stack.Screen name="selectCity" component={SelectCity} options={{ headerShown: false }} />
        {/* <Stack.Screen name="changeLanguage" component={ChangeLanguage} options={{ headerShown: false }} /> */}
        <Stack.Screen name="help" component={Help} options={{ headerShown: false }} />
        <Stack.Screen name="share" component={Share} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}

export default moreStack;