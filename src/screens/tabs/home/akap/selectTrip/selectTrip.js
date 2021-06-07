import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Modal, SectionList} from 'react-native';
import {
  Header,
  Text10,
  Text14,
  Text26,
  Text12,
  AppButton,
  Loader,
} from '../../../../../components';
import {Colors, AppStyles, Images} from '../../../../../theme';
import {FlatList} from 'react-native-gesture-handler';
import styles from './selectTrip.styles';
import moment from 'moment';
import API from '../../../../../api/api';

const DATA = [
  {
    title: 'Sort by',
    data: [{title: 'Departure(earliest)'}, {title: 'Price'}],
  },
  {
    title: 'Bus type',
    data: [{title: 'Seater(60)'}, {title: 'AC(60)'}],
  },
  // {
  //   title: "Depart from",
  //   data: [{ title: "Terminal Bus Asal" }, { title: "Terminal Bus Asal" }, { title: "Terminal Bus Asal" }, { title: "Terminal Bus Asal" }]
  // },
  // {
  //   title: "Arrive at",
  //   data: [{ title: "Terminal Bus Tujuan" }, { title: "Terminal Bus Tujuan" }, { title: "Terminal Bus Tujuan" }]
  // }
];
export default class SelectTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      cartModal: false,
      filterModalVisible: false,
      selectedTrip: {},
      headerDate: '',
      isLoading: false,
      listData: [],
      filterData: [],
      filterBusType: [],
      filterValues: DATA,
    };
  }

  componentDidMount() {
    const {arrival, departure} = this.props.route.params.search_terms;

    let departDataVal = [];
    departure.map((e) => departDataVal.push({title: e.type, ...e}));

    let arriveDataVal = [];
    arrival.map((e) => arriveDataVal.push({title: e.type, ...e}));

    let filterVal = this.state.filterValues;
    filterVal[2] = {title: 'Depart from', data: departDataVal};
    filterVal[3] = {title: 'Arrive at', data: arriveDataVal};
    this.setState({
      headerDate: this.props.route.params.enteredData.date,
      listData: this.props.route.params.searchedData,
      filterValues: filterVal,
    });

    API.home.get_bus_type().then((res) => {
      if (res && res.data && res.data.status == 'ok') {
        let busTypeDataVal = [];
        res.data.data.map((e) => busTypeDataVal.push({title: e.type, ...e}));

        let newVal = this.state.filterValues;
        newVal[1] = {title: 'Bus type', data: busTypeDataVal};

        this.setState({filterBusType: res.data.data, filterValues: newVal});
      }
    });
  }

  searchTrip(newDate) {
    const {
      from,
      to,
      return_date,
      date,
      passenger,
    } = this.props.route.params.enteredData;
    let data = {
      to: to,
      from: from,
      route_type: 2,
      date: newDate ? newDate : date,
      return_date: return_date,
      passenger: passenger,
    };
    this.setState({isLoading: true});

    API.home.searchTrip(data).then((res) => {
      console.log('res', res);
      this.setState({isLoading: false});
      if (res && res.data && res.data.status == 'ok') {
        this.setState({listData: res.data.data});
      }
    });
  }

  headerButtonPressed(type) {
    let newDate = '';
    if (type == 'prev') {
      newDate = moment(this.state.headerDate)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
    } else {
      newDate = moment(this.state.headerDate)
        .add(1, 'days')
        .format('YYYY-MM-DD');
    }
    this.setState({headerDate: newDate}, () =>
      setTimeout(() => {
        this.searchTrip(newDate);
      }, 500),
    );
  }

  searchButtonPressed() {
    const {filterData} = this.state;
    let newList = this.props.route.params.searchedData;

    filterData.map((e) => {
      if (e.type == 'Sort by') {
        if (e.title == 'Departure(earliest)') {
          newList.sort((a, b) => a.duration - b.duration);
        }
        if (e.title == 'Price') {
          newList.sort((a, b) => a.price - b.price);
        }
      } else if (e.type == 'Bus type') {
        newList = newList.filter((list) => list.type == e.id);
      } else if (e.type == 'Depart from') {
        newList = newList.filter(
          (list) => list.departure_terminal_name == e.title,
        );
      } else if (e.type == 'Arrive at') {
        newList = newList.filter(
          (list) => list.arrival_terminal_name == e.title,
        );
      } else {
        newList = this.props.route.params.searchedData;
      }
    });
    this.setState({listData: newList, filterModalVisible: false});
  }

  headerButton() {
    return (
      <View style={styles.headerBtnView}>
        <TouchableOpacity
          style={{...AppStyles.rowCenterView}}
          onPress={() => this.headerButtonPressed('prev')}>
          <Text26 type="bold" title={'<'} addStyle={styles.arrowMargin} />
          <Text10
            type="light"
            title={'Previous'}
            addStyle={{color: Colors.whiteFF}}
          />
        </TouchableOpacity>
        <Text12
          type="regular"
          title={moment(this.state.headerDate).format('dddd, DD MMMM')}
          addStyle={{color: Colors.whiteFF}}
        />
        <TouchableOpacity
          style={{...AppStyles.rowCenterView}}
          onPress={() => this.headerButtonPressed('next')}>
          <Text10 type="light" title={'Next'} addStyle={styles.arrowMargin} />
          <Text26 type="bold" title={'>'} addStyle={{color: Colors.whiteFF}} />
        </TouchableOpacity>
      </View>
    );
  }

  renderCartModal() {
    const {cartModal, selectedTrip, filterData} = this.state;
    const {passenger, date} = this.props.route.params.enteredData;
    console.log('filterData', filterData);
    return (
      <Modal visible={cartModal} transparent animationType={'slide'}>
        <View style={styles.backgroundOpacity}>
          <View style={styles.cartModalContainer}>
            <View style={styles.cartModalTopView}>
              <Text14 type="regular" title={'CART'} />
              <TouchableOpacity
                onPress={() => this.setState({cartModal: false})}>
                <Text26 type="bold" title={'>'} addStyle={styles.downArrow} />
              </TouchableOpacity>
            </View>
            <Text12 type="light" title={'Passenger ' + passenger} />

            <View style={styles.busDetailView}>
              <Image
                source={Images.logobus}
                style={styles.busLogo}
                resizeMode={'contain'}
              />
              <Text12 type="light" title={'Rosalia Indah'} />
            </View>

            <View style={styles.cartModalRouteDetail}>
              <Text12
                type="regular"
                title={moment(date).format('dddd, DD MMMM')}
                addStyle={{color: Colors.brownE1}}
              />
              <Text12
                type="regular"
                title={'Rp ' + selectedTrip.price}
                addStyle={{color: Colors.brownE1}}
              />
            </View>

            <View style={{...AppStyles.rowCenterView}}>
              <View style={styles.timeTerminalView}>
                <Text10
                  type="regular"
                  title={selectedTrip.start}
                  addStyle={{color: Colors.brownE1}}
                />
                <Text10
                  type="regular"
                  title={selectedTrip.end}
                  addStyle={{color: Colors.brownE1}}
                />
              </View>
              <Image
                source={Images.indicatorSmall}
                style={styles.indicatorIcon}
                resizeMode="contain"
              />
              <View style={styles.timeTerminalView}>
                <Text12
                  type="light"
                  title={selectedTrip.arrival_terminal_name}
                />
                <Text12
                  type="light"
                  title={selectedTrip.departure_terminal_name}
                />
              </View>
            </View>

            <View style={styles.seperatorLine} />

            <View
              style={{
                ...AppStyles.rowCenterView,
                justifyContent: 'space-between',
              }}>
              <View style={{...AppStyles.rowCenterView}}>
                <Text10 type="regular" title={'Booking reserved for '} />
                <Text10
                  type="regular"
                  title={selectedTrip.duration}
                  addStyle={{color: Colors.brownE1}}
                />
              </View>

              <TouchableOpacity
                style={styles.cartRightView}
                onPress={() =>
                  this.setState({cartModal: false}, () =>
                    this.props.navigation.navigate('completeOrder', {
                      selectedTrip: selectedTrip,
                      ...this.props.route.params,
                      departureDate: this.state.headerDate,
                    }),
                  )
                }>
                <Text12
                  type="regular"
                  title={'Rp ' + selectedTrip.price}
                  addStyle={{color: Colors.whiteFF}}
                />
                <Text14
                  type="regular"
                  title={'NEXT >'}
                  addStyle={{color: Colors.whiteFF}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderFilterModal() {
    const {filterModalVisible} = this.state;
    return (
      <Modal
        visible={filterModalVisible}
        transparent
        animationIn={'slideInLeft'}
        style={{margin: 0}}>
        <View style={styles.filterModalContainer}>
          <View style={styles.filterContent}>
            <View style={styles.filterHeader}>
              <Text14 type="regular" title={'Sort & Filter'} />
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => this.setState({filterModalVisible: false})}>
                <Image source={Images.crossRed} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>

            <SectionList
              sections={this.state.filterValues}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index, section}) => (
                <TouchableOpacity
                  style={styles.sectionListItem}
                  onPress={() => {
                    let filterValue = [];
                    if (
                      this.state.filterData.some((e) => e.title == item.title)
                    ) {
                      filterValue = this.state.filterData.filter(
                        (e) => e.title != item.title,
                      );
                    } else {
                      if (section.title == 'Sort by') {
                        filterValue = this.state.filterData;
                      } else {
                        filterValue = this.state.filterData.filter(
                          (val) => val.type != section.title,
                        );
                      }
                      filterValue.push({
                        type: section.title,
                        title: item.title,
                        id: item.id ? item.id : 1,
                      });
                    }
                    this.setState({filterData: filterValue});
                  }}>
                  <Image
                    source={
                      this.state.filterData.length > 0 &&
                      this.state.filterData.some((e) => e.title == item.title)
                        ? Images.checkMark
                        : Images.greenCheckBox
                    }
                    style={styles.checkBoxIcon}
                    resizeMode="contain"
                  />
                  <Text12 type="light" title={item.title} />
                </TouchableOpacity>
              )}
              renderSectionHeader={({section: {title}}) => (
                <View style={styles.sectionHeader}>
                  <Text12
                    type="regular"
                    title={title}
                    addStyle={{color: Colors.greyCb}}
                  />
                </View>
              )}
            />
            <View style={styles.sectionButton}>
              <AppButton
                type={'withoutContainer'}
                title={'Show Trips'}
                buttonPressed={() => this.searchButtonPressed()}
                containerStyle={{marginTop: 0}}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const {route} = this.props;
    const {selectedTrip, isLoading, listData} = this.state;

    return (
      <View style={styles.container}>
        <Header
          back
          title="Select Trip"
          styleContainer={{elevation: 0}}
          onRightPressed={() => this.setState({filterModalVisible: true})}
          rightComp={
            <Text10
              type="regular"
              title="Filter"
              addStyle={{color: Colors.whiteFF}}
            />
          }
        />
        <Loader isLoading={isLoading} />

        {this.renderFilterModal()}
        {this.renderCartModal()}
        {this.headerButton()}
        <FlatList
          data={listData}
          style={{paddingTop: 10}}
          renderItem={({item, index}) => {
            return (
              <View style={styles.listContainer}>
                {/* Top View */}
                <View style={{...AppStyles.rowCenterView}}>
                  {/* departure and arrival time */}
                  <View style={styles.timeTerminalView}>
                    <Text10
                      type="regular"
                      title={item.start}
                      addStyle={{color: Colors.brownE1}}
                    />
                    <Text10
                      type="regular"
                      title={item.end}
                      addStyle={{color: Colors.brownE1}}
                    />
                  </View>
                  {/* Indicator */}
                  <Image
                    source={Images.indicatorSmall}
                    style={styles.indicatorIcon}
                    resizeMode="contain"
                  />
                  {/* Terminal View */}
                  <View style={styles.timeTerminalView}>
                    <Text12 type="light" title={item.arrival_terminal_name} />
                    <Text12 type="light" title={item.departure_terminal_name} />
                  </View>
                </View>
                {/* Seperator */}
                <View style={styles.seperatorLine} />
                {/* Duration */}
                <View style={{...AppStyles.rowCenterView}}>
                  <Text10 type="light" title={'Duration'} />
                  <Text10
                    type="regular"
                    title={' ' + item.duration}
                    addStyle={{color: Colors.brownE1}}
                  />
                </View>
                {/* Bus detail */}
                <View
                  style={{
                    ...AppStyles.rowCenterView,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{...AppStyles.rowCenterView}}>
                    <Image
                      source={Images.logobus}
                      style={styles.busLogo}
                      resizeMode={'contain'}
                    />
                    <Text12 type="light" title={'Rosalia Indah'} />
                  </View>
                  {/* Bus selection and fare */}
                  <View style={{...AppStyles.rowCenterView}}>
                    <Text14
                      type="regular"
                      title={item.price}
                      addStyle={{color: Colors.brownE1}}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          selectedIndex:
                            this.state.selectedIndex == index ? null : index,
                          selectedTrip:
                            this.state.selectedIndex == index ? {} : item,
                        })
                      }>
                      <Image
                        source={
                          this.state.selectedIndex == index
                            ? Images.crossYellow
                            : Images.addGreen
                        }
                        style={styles.selectionIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
        {/* Cart View */}
        {selectedTrip && selectedTrip.type ? (
          <View
            style={{
              ...AppStyles.rowCenterView,
              justifyContent: 'space-between',
            }}>
            <View style={styles.cartLeftView}>
              <TouchableOpacity
                onPress={() => this.setState({cartModal: true})}>
                <Text26 type="bold" title={'>'} addStyle={styles.upArrow} />
              </TouchableOpacity>
              <Text12 type="light" title={'In cart: 1'} />
            </View>

            <TouchableOpacity
              style={styles.cartRightView}
              onPress={() =>
                this.props.navigation.navigate('completeOrder', {
                  selectedTrip: selectedTrip,
                  ...this.props.route.params,
                  departureDate: this.state.headerDate,
                })
              }>
              <Text12
                type="regular"
                title={'Rp ' + selectedTrip.price}
                addStyle={{color: Colors.whiteFF}}
              />
              <Text14
                type="regular"
                title={'NEXT >'}
                addStyle={{color: Colors.whiteFF}}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}
