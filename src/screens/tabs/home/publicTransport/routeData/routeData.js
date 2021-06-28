import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {
  Loader,
  Text12,
  Text14,
  CustomSafeArea,
  AppButton,
  Text10,
} from '../../../../../components';
import {Images, AppStyles, Colors} from '../../../../../theme';
import styles from './routeData.styles';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import api from '../../../../../api/api';

const stepIndicatorStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 5,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: Colors.brownE1,
  separatorFinishedColor: Colors.brownE1,
  separatorUnFinishedColor: Colors.brownE1,
  stepIndicatorFinishedColor: Colors.brownE1,
  stepIndicatorUnFinishedColor: Colors.brownE1,
  stepIndicatorCurrentColor: Colors.brownE1,
  stepIndicatorLabelFontSize: 12,
  currentStepIndicatorLabelFontSize: 12,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: Colors.brownE1,
  labelColor: '#666666',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

export default class RouteData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      routeDetailVisible: true,
      selectedTrip: {},
      stoppagePoints: [],
      labels: [],
    };
  }

  componentDidMount() {
    const {route} = this.props;
    this.getTripDetails(route.params.trip_id);
    this.setState({
      selectedTrip: route.params,
      selectedTripIndex: route.params.selectedTripIndex,
    });
  }

  getTripDetails(tripId) {
    this.setState({isLoading: true});

    let data = {
      trip_id: tripId,
    };
    api.home.tripDetails(data).then((res) => {
      this.setState({isLoading: false});
      console.log('res =>>>>>>', res);
      if (res && res.data && res.data.status == 'ok') {
        let labels = [];
        if (
          res.data.data &&
          res.data.data.stoppage_points_list &&
          res.data.data.stoppage_points_list.length > 0
        ) {
          res.data.data.stoppage_points_list.map((item) =>
            labels.push(item.title.substr(0, 40)),
          );
        }
        this.setState({
          tripData: res.data.data,
          labels,
          loading: false,
          stoppagePoints: res.data.data.stoppage_points_list,
        });
      }
    });
  }

  listNavBtnPressed(type) {
    const {searchedData} = this.props.route.params;
    const {selectedTripIndex} = this.state;

    console.log('searchedData', searchedData);
    console.log('selectedIndex', selectedTripIndex);
    let selectedTrip = {};
    let newIndex;
    if (type == 'prev') {
      if (selectedTripIndex - 1 < 0) {
        selectedTrip = searchedData[searchedData.length - 1];
        newIndex = searchedData.length - 1;
      } else {
        selectedTrip = searchedData[selectedTripIndex - 1];
        newIndex = selectedTripIndex - 1;
      }
    } else {
      if (selectedTripIndex + 1 > searchedData.length - 1) {
        selectedTrip = searchedData[0];
        newIndex = 0;
      } else {
        selectedTrip = searchedData[selectedTripIndex + 1];
        newIndex = selectedTripIndex + 1;
      }
    }
    this.getTripDetails(selectedTrip.trip_id);
    this.setState({selectedTrip, selectedTripIndex: newIndex});
  }

  renderHeader() {
    const {navigation} = this.props;

    return (
      <View style={styles.headerContainer}>
        <CustomSafeArea backgroundColor="transparent" />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={Images.backBlack}
            style={styles.backImage}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {navigation, route} = this.props;
    const {
      trip_route_name,
      start,
      end,
      departure_location_latitude,
      departure_location_longitude,
    } = this.state.selectedTrip;
    const {isLoading, routeDetailVisible, labels, stoppagePoints} = this.state;

    return (
      <View style={styles.mainContainer}>
        <Loader isLoading={isLoading} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={{
            latitude:
              stoppagePoints && stoppagePoints.length > 0
                ? parseFloat(stoppagePoints[0]['latitude'])
                : 37.78825,
            longitude:
              stoppagePoints && stoppagePoints.length > 0
                ? parseFloat(stoppagePoints[0]['longitude'])
                : -122.4324,
            latitudeDelta: 1,
            longitudeDelta: 0.002,
          }}>
          {/* <MapViewDirections
                        origin={{ latitude: departure_location_latitude, longitude: departure_location_longitude }}
                        destination={{ latitude: arrival_location_latitude, longitude: arrival_location_longitude }}
                        apikey={"AIzaSyBjTS2h5edAaSr0PEpkctETaw-yhMx2lq8"}
                        strokeWidth={3}
                        strokeColor="red"
                    /> */}
          {stoppagePoints &&
            stoppagePoints.length > 0 &&
            stoppagePoints.map((place) => {
              if (place.latitude && place.longitude) {
                return (
                  <Marker
                    key={place.title}
                    coordinate={{
                      latitude: parseFloat(place.latitude),
                      longitude: parseFloat(place.longitude),
                    }}
                  />
                );
              }
            })}
        </MapView>

        {this.renderHeader()}
        <View
          style={[styles.bottomContainer, routeDetailVisible ? {flex: 1} : {}]}>
          <View style={[AppStyles.shadow, styles.routeDetail]}>
            {/* <View style={styles.busNumberView}>
                            <Text12 title={trip_id} type="regular" addStyle={{ color: Colors.whiteFF }} />
                        </View> */}
            <View style={{flex: 1}}>
              <Text14
                title={trip_route_name}
                type="regular"
                addStyle={{alignSelf: 'center'}}
              />
              {!routeDetailVisible ? (
                <Text12
                  title={start + ' - ' + end}
                  type="regular"
                  addStyle={styles.startTime}
                />
              ) : (
                <View style={styles.navView}>
                  <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => this.listNavBtnPressed('prev')}>
                    <Image
                      source={Images.arrowLeft}
                      style={styles.navArrowImg}
                    />
                    <Text10
                      title="  Previous"
                      type="light"
                      addStyle={{color: Colors.greyCb}}
                    />
                  </TouchableOpacity>
                  <Text12
                    title={start + ' - ' + end}
                    type="regular"
                    addStyle={styles.startTime}
                  />
                  <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => this.listNavBtnPressed('next')}>
                    <Text10
                      title="Next  "
                      type="light"
                      addStyle={{color: Colors.greyCb}}
                    />
                    <Image
                      source={Images.arrowRight}
                      style={styles.navArrowImg}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {routeDetailVisible && labels.length > 0 && (
            <View style={styles.stepContainer}>
              <StepIndicator
                customStyles={stepIndicatorStyles}
                currentPosition={2}
                stepCount={labels.length}
                labels={labels}
                direction="vertical"
                renderStepIndicator={(item, index) => {
                  if (item.position == labels.length - 1) {
                    return (
                      <View style={styles.stepIndicator0}>
                        <View style={styles.innerIndicatorView}></View>
                      </View>
                    );
                  }
                  return (
                    <View style={styles.stepIndicator}>
                      <View
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 12 / 2,
                          backgroundColor:
                            item.position == 0
                              ? Colors.brownE1
                              : Colors.whiteFF,
                        }}></View>
                    </View>
                  );
                }}
              />
              <TouchableOpacity
                style={[styles.closeBtn, AppStyles.shadow]}
                onPress={() => this.setState({routeDetailVisible: false})}>
                <Image
                  source={Images.crossRed}
                  style={styles.closeIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
          <AppButton
            type={'withoutContainer'}
            title={'Next'}
            buttonPressed={() =>
              navigation.navigate('bookingDetail', this.state.selectedTrip)
            }
            containerStyle={styles.submitButton}
          />
        </View>
      </View>
    );
  }
}
