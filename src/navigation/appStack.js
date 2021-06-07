import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import onboardingStack from './onboardingStack';
import TabbarNavigation from './tab/tabNav';
import {navigationRef} from './rootNavigation';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {resumeUser} from '../store/reducerActions/login/login.action';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createStackNavigator();

class AppStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLogin: false,
    };
  }

  componentDidMount() {
    const {resumeUser} = this.props;
    try {
      AsyncStorage.getItem('USER').then((res) => {
        console.log('res', res);
        RNBootSplash.hide({duration: 250}); // fade
        if (res) {
          let userData = {};
          userData = JSON.parse(res);
          resumeUser(userData);
          this.setState({isReady: true, isLogin: true});
        } else {
          this.setState({isReady: true});
        }
      });
    } catch (error) {
      this.setState({isReady: true});
    }

    // try {
    //   AsyncStorage.multiGet(["OnboardSwiper", 'USER'])
    //     .then((res) => {
    //       console.log('res', res);
    //       RNBootSplash.hide({ duration: 250 }); // fade
    //       if (res && res.length && res.length > 0) {
    //         if (res[0] && res[0].length > 0 && res[0][1]) {
    //           this.setState({ firstTimeLogin: res[0][1] });
    //         }
    //         if (res[1] && res[1].length > 0 && res[1][1]) {
    //           resumeUser(JSON.parse(res[1][1]))
    //           this.setState({ user: res[1][1] })
    //         }
    //         this.setState({ isReady: true })
    //       } else {
    //         this.setState({ isReady: true })
    //       }
    //     });
    // } catch (error) {
    //   this.setState({ isReady: true })
    // }
  }

  render() {
    const {isReady, isLogin} = this.state;
    if (!isReady) return null;

    let initialRoute = '';
    if (isLogin) {
      initialRoute = 'tabbar';
    } else {
      initialRoute = 'onboardingStack';
    }

    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="onboardingStack"
            component={onboardingStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="tabbar"
            component={TabbarNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({});
//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({
  resumeUser: (data) => dispatch(resumeUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppStack);
