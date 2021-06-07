import React, {Component} from 'react';
import {SelectionList, Loader} from '../../../components';
import {CommonActions} from '@react-navigation/native';
import {resumeUser} from '../../../store/reducerActions/login/login.action';
import {connect} from 'react-redux';
import api from '../../../api/api';
import AsyncStorage from '@react-native-community/async-storage';

class SelectCityOnboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      locationGrp: [],
    };
  }

  componentDidMount() {
    api.user.get_location_group().then((res) => {
      this.setState({isLoading: false});
      console.log('res', res);
      if (res && res.data && res.data.status == 'ok') {
        this.setState({locationGrp: res.data.data});
      }
    });
  }
  submitPressed(selectedVal) {
    const {route, navigation, resumeUser, user} = this.props;
    api.user.update_location_group(selectedVal.id).then((res) => {
      this.setState({isLoading: false});
      console.log('res', res);
      if (res && res.data && res.data.status == 'ok') {
        let userData = {};
        userData = user;
        userData.locationgroupname = selectedVal.locationgroupname;
        userData.city_group_id = selectedVal.id;
        resumeUser(userData);
        AsyncStorage.setItem('USER', JSON.stringify(userData));
        if (route.params && route.params.from && route.params.from == 'home') {
          navigation.goBack();
        }
        this.resetStack('swipper');
      }
    });
  }

  resetStack = (whichStack) => {
    const {navigation} = this.props;

    let resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: whichStack}],
    });
    navigation.dispatch(resetAction);
  };

  render() {
    const {isLoading, locationGrp} = this.state;
    console.log('>>>>>>>', this.props.user.city_group_id);
    let allCities = [];
    if (locationGrp && locationGrp.length > 0) {
      locationGrp.map((item) => allCities.push({...item, cityName: item.name}));
    }
    return (
      <>
        <Loader isLoading={isLoading} />
        <SelectionList
          id={this.props.user.city_group_id}
          header="Change City Area"
          data={allCities}
          buttonPressed={(selectedVal) => {
            this.submitPressed(selectedVal);
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
});

//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({
  resumeUser: (data) => dispatch(resumeUser(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectCityOnboarding);
