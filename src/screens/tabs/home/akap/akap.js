import React, {Component} from 'react';
import {View, TouchableOpacity, Image, TextInput, Modal} from 'react-native';
import {Colors, Images} from '../../../../theme';
import {CustomSafeArea, Loader, AppButton} from '../../../../components';
import styles from './akap.styles';
import {
  changeDriveringStatus,
  saveDriverLocation,
} from '../../../../store/reducerActions/busRoute/busRoute.actions';
import {connect} from 'react-redux';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import CitySelectionModal from '../citySelectionModal/citySelectionModal';
import API from '../../../../api/api';
import BackButton from '../../../../components/appButton/backBtn';

class Akap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavigate: true,
      isLoading: false,
      modalVisible: false,
      selectedFilterValue: '',
      isFilterOpen: false,
      fromDestination: '',
      enterDestination: '',
      departure: '',
      returnTime: '',
      passenger: '',
      calenderType: '',

      cityModalVisible: false,
      cityType: '',
      selectedFromCity: {},
      selectedDestinationCity: {},
    };
  }

  componentDidMount() {}

  searchButtonPressed() {
    const {
      selectedFromCity,
      selectedDestinationCity,
      fromDestination,
      enterDestination,
      departure,
      returnTime,
      passenger,
    } = this.state;
    if (fromDestination && enterDestination && departure && passenger) {
      let data = {
        to: selectedDestinationCity.id,
        from: selectedFromCity.id,
        route_type: 1,
        date: departure,
        return_date: returnTime,
        passenger: passenger,
      };
      this.setState({isLoading: true});

      console.log('data', data);
      API.home.searchTrip(data).then((res) => {
        console.log('res', res);
        this.setState({isLoading: false});
        if (res && res.data && res.data.status == 'ok') {
          this.setState({listData: res.data.data});
          this.props.navigation.navigate('selectTrip', {
            searchedData: res.data.data,
            enteredData: data,
            search_terms: res.data.search_terms,
          });
        } else {
          alert(res.data.message ? res.data.message : 'Something went wrong');
        }
      });
    }
  }

  doubleArrowPressed() {
    const {
      fromDestination,
      enterDestination,
      selectedFromCity,
      selectedDestinationCity,
    } = this.state;

    this.setState({
      fromDestination: enterDestination,
      enterDestination: fromDestination,
      selectedFromCity: selectedDestinationCity,
      selectedDestinationCity: selectedFromCity,
    });
  }

  setPassengerVal(val, passengerData) {
    this.setState({passenger: val, ...passengerData});
  }

  headerButtonPressed(stateName) {
    if (stateName == 'departure' || stateName == 'returnTime') {
      this.setState({modalVisible: true, calenderType: stateName});
    } else if (
      stateName == 'fromDestination' ||
      stateName == 'enterDestination'
    ) {
      this.setState({cityModalVisible: true, cityType: stateName});
    } else {
      this.props.navigation.navigate('selectPassenger', {
        setPassengerVal: (val, pasengerData) =>
          this.setPassengerVal(val, pasengerData),
      });
    }
  }

  renderInputBox(placeholder, stateName, buttonType, rightIcon) {
    if (buttonType) {
      return (
        <TouchableOpacity onPress={() => this.headerButtonPressed(stateName)}>
          <TextInput
            editable={false}
            value={this.state[stateName].toString()}
            onChangeText={(val) => this.setState({[stateName]: val})}
            placeholder={placeholder}
            placeholderTextColor={Colors.whiteFF}
            style={styles.routeField}
          />

          {rightIcon && (
            <Image
              source={Images.crossYellow}
              style={{
                height: 30,
                width: 30,
                transform: [{rotate: '45deg'}],
                position: 'absolute',
                right: 10,
                top: 12,
              }}
            />
          )}
        </TouchableOpacity>
      );
    }
    return (
      <TextInput
        value={this.state[stateName]}
        onChangeText={(val) => this.setState({[stateName]: val})}
        placeholder={placeholder}
        placeholderTextColor={Colors.whiteFF}
        style={styles.routeField}
      />
    );
  }

  renderHeader() {
    const {currentLocation, destination} = this.state;
    return (
      <View style={styles.headerContainer}>
        <BackButton onPressIcon={() => this.props.navigation.goBack()} />
        <CustomSafeArea backgroundColor="transparent" />
        <View style={styles.headerContent}>
          <Image
            source={Images.indicator}
            style={styles.routeIndicator}
            resizeMode="contain"
          />
          <View style={styles.headerFieldView}>
            {this.renderInputBox('From destination', 'fromDestination', true)}

            {/* <TouchableOpacity onPress={() => this.setState({ cityModalVisible: true, cityType: "fromDestination"})}>
              <Text14 title={currentLocation ? currentLocation : "Origin"} addStyle={{ color: 'white' }} />
            </TouchableOpacity>
          
            <TouchableOpacity onPress={() => this.setState({ cityModalVisible: true, cityType: "fromDestination"})}>              <Text14 title={currentLocation ? currentLocation : "Origin"} addStyle={{ color: 'white' }} />
            </TouchableOpacity> */}

            {this.renderInputBox('Enter destination', 'enterDestination', true)}
          </View>
          <TouchableOpacity
            style={styles.doubleArrowBtn}
            onPress={() => this.doubleArrowPressed()}>
            <Image source={Images.upDownArrow} style={styles.doubleArrow} />
          </TouchableOpacity>
        </View>
        <View style={{paddingLeft: 25, paddingRight: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.48}}>
              {this.renderInputBox('Departure', 'departure', true)}
            </View>
            <View style={{flex: 0.48}}>
              {this.renderInputBox('Return', 'returnTime', true, true)}
            </View>
          </View>
          {this.renderInputBox('Passenger', 'passenger', true)}
        </View>
      </View>
    );
  }

  renderSearchBtn() {
    return (
      <View style={styles.leaveNowView}>
        <AppButton
          type={'withoutContainer'}
          title={'Search'}
          buttonPressed={() => this.searchButtonPressed()}
          containerStyle={{marginTop: 0, flex: 1}}
        />
      </View>
    );
  }

  renderCalendarModal() {
    const {calenderType, modalVisible} = this.state;

    return (
      <Modal visible={modalVisible} transparent>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', top: 50, right: 25}}
            onPress={() => this.setState({modalVisible: false})}>
            <Image source={Images.crossRed} />
          </TouchableOpacity>
          <View
            style={{
              width: '90%',
              borderRadius: 9,
              backgroundColor: Colors.whiteFF,
              padding: 10,
            }}>
            <Calendar
              style={{borderRadius: 10}}
              minDate={moment().format('YYYY-MM-DD')}
              maxDate={moment().add(1, 'month').format('YYYY-MM-DD')}
              onDayPress={(day) => {
                this.setState({
                  [calenderType]: day.dateString,
                  modalVisible: false,
                });
              }}
              monthFormat={'MMMM yyyy'}
              hideExtraDays={true}
              hideDayNames={false}
              firstDay={1}
              onPressArrowLeft={(subtractMonth) => subtractMonth()}
              onPressArrowRight={(addMonth) => addMonth()}
              disableAllTouchEventsForDisabledDays={true}
            />
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {isLoading, cityType} = this.state;

    return (
      <View style={styles.mainContainer}>
        <CitySelectionModal
          type={'akap'}
          visible={this.state.cityModalVisible}
          closeModal={() => this.setState({cityModalVisible: false})}
          onSelectVal={(val) => {
            if (cityType == 'fromDestination') {
              this.setState({
                fromDestination: val.name,
                selectedFromCity: val,
                cityModalVisible: false,
                cityType: '',
              });
            } else {
              this.setState({
                enterDestination: val.name,
                selectedDestinationCity: val,
                cityModalVisible: false,
                cityType: '',
              });
            }
          }}
        />
        {this.renderCalendarModal()}
        <Loader isLoading={isLoading} />
        {this.renderHeader()}
        <View style={{flex: 1}}>{this.renderSearchBtn()}</View>
      </View>
    );
  }
}

//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({
  changeDriveringStatus: (data) => dispatch(changeDriveringStatus(data)),
  saveDriverLocation: (data) => dispatch(saveDriverLocation(data)),
});

export default connect(null, mapDispatchToProps)(Akap);
