import React from 'react';
import {Provider} from 'react-redux';
import AppStackNavigator from './navigation/appStack';
import store from './store/createStore';
import {StatusBar} from 'react-native';
import {Colors} from './theme';

console.disableYellowBox = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={Colors.green27} />
        <AppStackNavigator />
      </Provider>
    );
  }
}
export default App;
