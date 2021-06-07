import React, {Component} from 'react';
import {
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {AppButton, AppTextInput, Header, Text14} from '../../../../components';
import {connect} from 'react-redux';
import {
  get_cities_by_group,
  getCities,
} from '../../../../store/reducerActions/login/login.action';
import {Images, Colors, Fonts} from '../../../../theme';
import {wp, hp} from '../../../../utils/heightWidthRatio';

class CitySelectionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      selectedFilterValue: {},
      listData: [],
    };
  }

  componentDidMount() {
    const {cityByGrp, allCities, type, id} = this.props;

    if (type == 'pt') {
      this.props.get_cities_by_group('2', id).then((res) => {
        console.log('_here_', res);
        if (
          res &&
          res.payload &&
          res.payload.status == 200 &&
          res.payload.data &&
          res.payload.data.status == 'ok'
        ) {
          let listData = [];
          if (res.payload.data.data && res.payload.data.data.length > 0) {
            //Inter-Changing keys for terminal and city
            res.payload.data.data.map((e) =>
              listData.push({name: e.terminalname, city_id: e.terminalid}),
            );
          }
          this.setState({listData});
        }
      });
    } else if (type == 'akap') {
      this.props.getCities().then((res) => {
        console.log('getCities', res);
        if (
          res &&
          res.payload &&
          res.payload.status == 200 &&
          res.payload.data &&
          res.payload.data.status == 'ok'
        ) {
          this.setState({listData: res.payload.data.data});
        }
      });
    }
  }

  renderListItem(item) {
    const {selectedFilterValue} = this.state;
    return (
      <TouchableOpacity
        style={{
          height: hp(50),
          alignItems: 'center',
          borderBottomWidth: 0.4,
          borderBottomColor: Colors.greyEb,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}
        onPress={() => this.setState({selectedFilterValue: item})}>
        <Text14 title={item.name} type="light" />
        {selectedFilterValue && selectedFilterValue.name == item.name ? (
          <Image
            source={Images.checkMark}
            style={{
              height: wp(20),
              width: wp(20),
            }}
          />
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

  render() {
    const {selectedFilterValue, listData} = this.state;

    const {
      closeModal,
      onSelectVal,
      visible,
      cityByGrp,
      allCities,
      type,
    } = this.props;

    return (
      <Modal visible={visible}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: Colors.green27,
              height: 69,
              alignItems: 'center',
              paddingHorizontal: 24,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                closeModal();
              }}>
              <Image
                source={Images.crossRed}
                style={{
                  height: wp(20),
                  width: wp(20),
                  tintColor: Colors.whiteFF,
                  marginRight: 20,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text14
              title={'Select City'}
              type="bold"
              addStyle={{color: Colors.whiteFF}}
            />
          </View>
          <TextInput
            placeholder="Search"
            onChangeText={(val) => {
              let newListData = [];
              let data = type == 'pt' ? cityByGrp : allCities;

              if (val.length == 0) {
                newListData = data;
              } else {
                newListData = data.filter((item) => {
                  return item.name.toLowerCase().includes(val.toLowerCase());
                });
              }
              this.setState({listData: newListData});
            }}
            style={{
              fontSize: Fonts.size.font14,
              fontFamily: Fonts.type.regular,
              paddingHorizontal: 25,
              borderWidth: 2,
              marginVertical: 25,
              borderColor: Colors.greyEb,
              backgroundColor: Colors.whiteF6,
            }}
          />
          <FlatList
            data={listData}
            keyExtractor={(item, index) => item.name}
            renderItem={({item, index}) => this.renderListItem(item)}
            extraData={this.props || this.state}
          />
          <AppButton
            type={'withoutContainer'}
            title={'Done'}
            disable={
              !(
                (selectedFilterValue && selectedFilterValue.id) ||
                selectedFilterValue.city_id
              )
            }
            buttonPressed={() => {
              onSelectVal(selectedFilterValue);
              let data = type == 'pt' ? cityByGrp : allCities;
              this.setState({listData: data, selectedFilterValue: {}});
            }}
            containerStyle={{marginTop: 0, marginBottom: 10}}
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  cityByGrp: state.loginReducer.cityByGrp,
  allCities: state.loginReducer.allCities,
});
//CALLING DYNAMIC FUNCTIONS
const mapDispatchToProps = (dispatch) => ({
  get_cities_by_group: (data, id) => dispatch(get_cities_by_group(data, id)),
  getCities: () => dispatch(getCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CitySelectionModal);
