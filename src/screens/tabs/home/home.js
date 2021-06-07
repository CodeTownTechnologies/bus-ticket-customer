import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Colors, Images} from '../../../theme';
import {CustomSafeArea, Text10, Text14} from '../../../components';
import {currentTripData} from '../../../store/reducerActions/busRoute/busRoute.actions';
import {connect} from 'react-redux';
import styles from './home.styles';
import checkPermission from '../../../utils/checkPermission';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Swiper from 'react-native-swiper';
import getCurrentLocation from '../../../utils/getCurrentLocation';
import {getCities} from '../../../store/reducerActions/login/login.action';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tripData: {},
      currentLocation: {
        latitude: 0.7893,
        longitude: 113.9213,
      },
    };
  }

  componentDidMount() {
    const {currentTripData, getCities} = this.props;
    // currentTripData()
    //     .then(res => {
    //         this.setState({ isLoading: false })
    //         // console.log('res', res);
    //         if (res.payload.data.status == "ok") {
    //             this.setState({ tripData: res.payload.data.data })
    //         } else if (res.payload.data.message) {
    //             setTimeout(() => {
    //                 // alert(res.payload.data.message)
    //             }, 500);
    //         }
    //     })
    //     .catch(e => this.setState({ isLoading: false }))

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getCurrentLoc();
      this.setState({changeVal: !this.state.changeVal});
    });
  }

  getCurrentLoc() {
    const _this = this;

    checkPermission(function (val) {
      if (val) {
        getCurrentLocation(function (position) {
          currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          _this.setState({currentLocation});
        });
      }
    });
  }

  transportationPressed(navScreen, id) {
    const {user, navigation} = this.props;

    if (navScreen && navScreen == 'publicTransport') {
      if (user.locationgroupname) {
        navigation.navigate(navScreen, {id: id});
      } else {
        navigation.navigate('selectCityOnboarding', {from: 'home'});
      }
    } else if (navScreen) {
      navigation.navigate(navScreen, {id: id});
    }
  }
  renderTransportation(img, title, navScreen, id) {
    return (
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => this.transportationPressed(navScreen, id)}>
        {/* <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { }}> */}
        <Image source={img} style={styles.transporationImg} />
        <Text10
          type="regular"
          title={title}
          addStyle={{textAlign: 'center', fontSize: 10}}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const {isLoading, tripData, currentLocation} = this.state;
    const {user, navigation} = this.props;
    console.log(user);
    let data = [1, 2, 3].map((item, index) => {
      return (
        <View key={index} style={styles.swipperContainer}>
          <Text14
            type="regular"
            title={'banner ' + item}
            addStyle={styles.description}
          />
        </View>
      );
    });
    console.log('user~~~~~~~', user);

    return (
      <View style={styles.mainContainer}>
        <CustomSafeArea />
        <View style={styles.headerView}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.cityName}
              onPress={() =>
                navigation.navigate('selectCityOnboarding', {
                  from: 'home',
                  city: user.locationgroupname ? user.locationgroupname : '',
                })
              }>
              <Text10
                title={
                  user.locationgroupname
                    ? user.locationgroupname
                    : 'Select Group'
                }
                type="light"
                addStyle={{color: 'white'}}
              />
            </TouchableOpacity>
            <View style={styles.logoView}>
              <Image
                source={Images.logo}
                style={styles.logo}
                resizeMode={'contain'}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.wrapper}>
            <Swiper
              // onIndexChanged={(index) => onNext(index)}
              autoplay={false}
              showsButtons={false}
              activeDotColor={Colors.green27}
              dotColor={Colors.whiteFF}
              dotStyle={styles.dotStyle}
              style={styles.wrapper}
              activeDotStyle={styles.activeDotSyle}>
              {data}
            </Swiper>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            // region={{
            //     latitude: tripData.departure_location_latitude ? parseFloat(tripData.departure_location_latitude) : 37.78825,
            //     longitude: tripData.departure_location_longitude ? parseFloat(tripData.departure_location_longitude) : -122.4324,
            //     latitudeDelta: 1,
            //     longitudeDelta: 0.0421,
            // }}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 1,
              longitudeDelta: 0.0421,
            }}>
            {currentLocation && currentLocation.longitude && (
              <Marker
                coordinate={currentLocation}
                centerOffset={{x: -18, y: -60}}
                anchor={{x: 0.69, y: 1}}></Marker>
            )}
          </MapView>
          <View style={styles.transView}>
            <TouchableOpacity
              style={styles.locationBtn}
              onPress={() => this.getCurrentLoc()}>
              <Image source={Images.currentLoc} style={styles.locationIcon} />
            </TouchableOpacity>
            <View style={styles.transportationView}>
              {this.renderTransportation(
                Images.pt,
                'Public\nTransport',
                'publicTransport',
                2,
              )}
              {this.renderTransportation(Images.akap, 'AKAP', 'akap', 1)}
              {this.renderTransportation(
                Images.transjakarta,
                'Transjakarta',
                'transjakarta',
                3,
              )}
              {this.renderTransportation(Images.kereta, 'Trains', 'train', 4)}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
});
//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({
  currentTripData: () => dispatch(currentTripData()),
  getCities: () => dispatch(getCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
