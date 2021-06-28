import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Modal, FlatList} from 'react-native';
import {Colors, AppStyles, Images} from '../../../../theme';
import {
  Text14,
  CustomSafeArea,
  Text12,
  Loader,
  Text10,
} from '../../../../components';
import styles from './publicTransport.styles';
import {connect} from 'react-redux';
import LeaveNowModal from '../../../../components/modals/leaveNowModal';
import CitySelectionModal from '../citySelectionModal/citySelectionModal';
import API from '../../../../api/api';
import BackButton from '../../../../components/appButton/backBtn';

class PublicTransport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavigate: true,
      isLoading: false,
      leaveNowModalVisible: false,
      selectedFilterValue: '',
      isFilterOpen: false,
      currentLocation: '',
      destination: '',
      cityModalVisible: false,
      selectedCurrentCity: {},
      selectedDestinationCity: {},
      cityType: '',
      listData: [],
    };
  }

  componentDidMount() {
    const {route} = this.props;
    if (route.params.id) {
      console.log('roues id===' + route.params.id);
    }
  }

  getSearchData() {
    const {
      selectedCurrentCity,
      selectedDestinationCity,
      currentLocation,
      destination,
    } = this.state;
    if (currentLocation && destination) {
      let data = {
        to: selectedDestinationCity.city_id,
        from: selectedCurrentCity.city_id,
        route_type: 2,
        // date: new Date()
      };
      this.setState({isLoading: true});
      API.home.searchTrip(data).then((res) => {
        this.setState({isLoading: false});
        if (res && res.data && res.data.status == 'ok') {
          this.setState({listData: res.data.data});
        } else {
          alert(res.data.message ? res.data.message : 'Something went wrong');
        }
      });
    }
  }

  doubleArrowPressed() {
    const {currentLocation, destination} = this.state;
    let newCurrentLocation = destination;
    let newDestination = currentLocation;
    this.setState({
      currentLocation: newCurrentLocation,
      destination: newDestination,
    });
  }

  renderHeader() {
    const {currentLocation, destination, selectedDestinationCity} = this.state;
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
            <TouchableOpacity
              style={styles.routeField}
              onPress={() =>
                this.setState({cityModalVisible: true, cityType: 'currentLoc'})
              }>
              <Text14
                title={currentLocation ? currentLocation : 'Origin'}
                addStyle={{color: 'white'}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.routeField}
              onPress={() =>
                this.setState({cityModalVisible: true, cityType: 'destination'})
              }>
              <Text14
                title={destination ? destination : 'Destination'}
                addStyle={{color: 'white'}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.doubleArrowBtn}
            onPress={() => this.doubleArrowPressed()}>
            <Image source={Images.upDownArrow} style={styles.doubleArrow} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderListItem(title, navScreen) {
    const {selectedFilterValue} = this.state;
    return (
      <TouchableOpacity
        style={styles.cityView}
        onPress={() =>
          this.setState({selectedFilterValue: title, isFilterOpen: false}, () =>
            this.props.navigation.navigate(navScreen),
          )
        }>
        <Text14 title={title} type="light" />
        {selectedFilterValue && selectedFilterValue == title ? (
          <Image source={Images.checkMark} style={styles.checkImage} />
        ) : (
          <View
            style={[
              styles.checkImage,
              {backgroundColor: Colors.green27, borderRadius: 3},
            ]}
          />
        )}
      </TouchableOpacity>
    );
  }

  renderFilter() {
    const {isFilterOpen} = this.state;
    return (
      <Modal visible={isFilterOpen} transparent>
        <View style={styles.filterModalCont}>
          <View style={styles.filterModalContent}>
            <TouchableOpacity
              style={[styles.filterModalBtn, AppStyles.shadow]}
              onPress={() => this.setState({isFilterOpen: false})}>
              <Image
                source={Images.filter}
                style={styles.filterIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.borderLine} />
            {/* {this.renderListItem("Bus", "")} */}
            {this.renderListItem('AKAP', 'akap')}
            {this.renderListItem('Transjakarta', 'transjakarta')}
            {this.renderListItem('Train', 'train')}
          </View>
        </View>
      </Modal>
    );
  }

  renderLeaveNow() {
    return (
      <View style={styles.leaveNowView}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.leaveNowBtn, AppStyles.shadow]}
            onPress={() => this.setState({leaveNowModalVisible: true})}>
            <Text14 title="Leave now" type="light" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.getSearchData()}>
            <Image source={Images.refresh} style={styles.refreshIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.closeBtn, AppStyles.shadow]}
          onPress={() =>
            this.setState({currentLocation: '', destination: '', listData: []})
          }>
          <Image
            source={Images.crossRed}
            style={styles.closeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {isLoading, leaveNowModalVisible, cityType} = this.state;
    const {navigation, route, user} = this.props;

    return (
      <View style={styles.mainContainer}>
        <LeaveNowModal
          visible={leaveNowModalVisible}
          closeModal={(val) => this.setState({leaveNowModalVisible: false})}
        />
        <CitySelectionModal
          type="pt"
          id={user.city_group_id}
          visible={this.state.cityModalVisible}
          closeModal={() => this.setState({cityModalVisible: false})}
          onSelectVal={(val) => {
            if (cityType == 'currentLoc') {
              this.setState(
                {
                  currentLocation: val.name,
                  selectedCurrentCity: val,
                  cityModalVisible: false,
                  cityType: '',
                },
                () => this.getSearchData(),
              );
            } else {
              this.setState(
                {
                  destination: val.name,
                  selectedDestinationCity: val,
                  cityModalVisible: false,
                  cityType: '',
                },
                () => this.getSearchData(),
              );
            }
          }}
        />
        <Loader isLoading={isLoading} />
        {this.renderHeader()}
        <View style={{flex: 1}}>
          {this.renderLeaveNow()}
          {this.renderFilter()}
          <FlatList
            // data={[{ from: "Stasiun Cikarang", to: "Hollywood Jc", arrivalTime: "60 min", charge: "Rp18.000", time: "13:20", busNo: "2A" }]}
            data={this.state.listData}
            keyExtractor={(item, index) => `${item.start}${index.toString()}`}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={[AppStyles.shadow, styles.listView]}
                  onPress={() => {
                    navigation.navigate('routeData', {
                      ...route.params,
                      ...item,
                      searchedData: this.state.listData,
                      selectedTripIndex: index,
                    });
                  }}>
                  {/* <View style={styles.busNoView}>
                    <Text12 type="regularWhite" title={item.route} />
                  </View> */}
                  <View style={styles.rightView}>
                    <View style={styles.rightTopView}>
                      <View style={styles.originView}>
                        <Text12 type="light" title={item.trip_route_name} />
                        {/* <Text12 type="light" title={item.to} /> */}
                      </View>
                      <View style={styles.timeView}>
                        <Text12 type="regularWhite" title={item.start} />
                      </View>
                    </View>
                    <View style={styles.seperatorLine} />
                    <View style={styles.listBottomView}>
                      <View style={styles.listBottomView}>
                        <Text10 type="light" title={'Arrive in '} />
                        <Text10
                          type="light"
                          title={item.approximate_time}
                          addStyle={{color: Colors.yellowF6}}
                        />
                      </View>
                      <Text14
                        type="regularWhite"
                        title={'Rp' + item.price}
                        addStyle={{color: Colors.brownE1}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity
            style={[styles.filterBottomBtn, AppStyles.shadow]}
            onPress={() => this.setState({isFilterOpen: true})}>
            <Image
              source={Images.filter}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
});
//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PublicTransport);
