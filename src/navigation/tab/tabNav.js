import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './homeStack';
import TicketStack from './ticketStack';
import InboxStack from './inboxStack';
import MoreStack from './moreStack';

import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Images, Colors, Fonts } from '../../theme';

const tabName = {
  Home: "Home",
  ticket: "Ticket",
  inbox: "Inbox",
  more: "More",
}
const Tab = createBottomTabNavigator();

export default function TabbarNavigation() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="ticket" component={TicketStack} />
      <Tab.Screen name="inbox" component={InboxStack} />
      <Tab.Screen name="more" component={MoreStack} />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) return null;

  return (
    <View style={styles.tabbar}>
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;
          let iconName = isFocused ? Images[`${route.name}Active`] : Images[`${route.name}Inactive`]

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <TouchableOpacity
              key={label}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              <Image source={iconName} style={styles["icon"+tabName[route.name]]} resizeMode={'contain'} />
              <Text style={styles[`tabLabel${isFocused}`]}>{tabName[route.name]}</Text>
            </TouchableOpacity>
          );
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    backgroundColor: Colors.whiteFF,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 37,
    borderTopColor: Colors.greyEb,
    borderTopWidth: 2
  },
  tab: {
    alignItems: 'center'
  },
  tabImage: {
    height: 19,
    width: 19,
  },
  tabLabeltrue: {
    color: Colors.green27,
    fontSize: Fonts.size.font10,
    fontFamily: Fonts.type.light
  },
  tabLabelfalse: {
    color: Colors.black2b,
    fontSize: Fonts.size.font10,
    fontFamily: Fonts.type.light
  },
  iconHome: {
    height: 17,
    width: 11,
    marginBottom: 5
  },
  iconTicket: {
    height: 17,
    width: 20,
    marginBottom: 5
  },
  iconInbox: {
    height: 15,
    width: 23,
    marginBottom: 5
  },
  iconMore: {
    height: 18,
    width: 18,
    marginBottom: 5
  },

})