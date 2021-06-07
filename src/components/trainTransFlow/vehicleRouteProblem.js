import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import { AppStyles, Images, Colors, Fonts } from '../../theme';
import { Loader, Text12, Text14, Text26 } from '..';
import { wp, hp } from '../../utils/heightWidthRatio';
import AppButton from '../appButton/appButton';
import API from '../../api/api'

export default class VehicleRouteProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      loading: false
    };
  }

  sendPressed() {
    const { selectedIndex } = this.state

    let data = {
      route_id: this.props.route.params.route,
      type: this.state[`email${selectedIndex}`],
      email: this.state[`email${selectedIndex}`],
      correct_route_name: this.state[`name${selectedIndex}`]
    }
    this.setState({ loading: true })

    API.home.routeProblem(data)
    .then((res) => {
      this.setState({ loading: false })
      console.log('res', res);
      if(res != "error") {
        this.props.navigation.navigate(this.props.type == "trans" ? "transjakarta" : "train")
      }
    })
  }

  renderInput(placeholder, stateVar) {
    return (
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={(val) => this.setState({ [stateVar]: val})}
      />
    )
  }

  render() {
    const { type, navigation, route } = this.props
    const { selectedIndex, loading } = this.state

    return (
      <View style={AppStyles.container}>
        <Loader isLoading={loading}/>
        <View style={[styles.listItem, AppStyles.shadow2, { paddingTop: wp(30) }]} >
          <TouchableOpacity style={styles.modalBack} onPress={() => navigation.goBack()}>
            <Image source={Images.backBlack} style={styles.backIcon} />
          </TouchableOpacity>
          <Text14 type="regular" title={"Problem on the route"} addStyle={styles.listItemTitle} />
        </View>
        <View style={styles.routeData}>
          <View style={styles.listItem}>
            <View style={[styles.leftView, { backgroundColor: type == "trans" ? "#0069f8" : "#ee1818" }]}>
              {
                type == "trans" ?
                  <Text12 type="regular" title={route.params.route} addStyle={{ color: Colors.whiteFF }} />
                  :
                  <Image source={Images.train} style={styles.trainIcon} resizeMode={"contain"} />
              }
            </View>
            <Text14 numberOflines={1} type="regular" title={route.params.title} addStyle={styles.listItemTitle} />
          </View>
        </View>

        <FlatList 
            data={[{t1: "Route name", t2: "is incorrect"}, {t1: "Route track", t2: "is incorrect"}, {t1: "Route", t2: "is closed"}, {t1: "Departure", t2: "are incorrect"}]}
            keyExtractor={(item, index) => item.t1+index.toString()}
            ListFooterComponent={() => (
              <AppButton type={"withoutContainer"} disable={selectedIndex == null} title={"Send"} buttonPressed={() => this.sendPressed()} containerStyle={styles.btnContainer}/>
            )}
            renderItem={({item, index}) => {
              return (
                <>
                <TouchableOpacity style={styles.listContainer} onPress={() => { this.setState({ selectedIndex: (selectedIndex || selectedIndex == 0 && index == selectedIndex) ? null : index })}}>
                  <Text12 type="light" title={item.t1 + " " + item.t2} addStyle={styles.listTitle}/>
                  <Text26 type="semiBold" title=">" addStyle={{ color: Colors.greyCb, transform: [{ rotate: (selectedIndex && index == selectedIndex) ? '270deg' :'90deg' }] }} />
                </TouchableOpacity>
                {
                  index == selectedIndex 
                  ?
                  <View style={styles.listContent}>
                    {this.renderInput("Correct route number", `number${index}`)}
                    {this.renderInput("Correct route name", `name${index}`)}
                    {this.renderInput("Additional info (your email)", `email${index}`)}
                  </View>
                  :
                  null
                }
                </>
              )
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftView: {
    height: wp(30),
    width: wp(30),
    borderRadius: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(10)
  },
  listItem: {
    ...AppStyles.rowCenterView,
    backgroundColor: Colors.whiteFF,
    paddingVertical: hp(10),
    paddingHorizontal: wp(15),
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    marginBottom: 10
  },
  modalBack: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: wp(25)
  },
  backIcon: {
    height: hp(14),
    width: wp(18)
  },
  input: {
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: Colors.greyE8,
    fontSize: Fonts.size.font12,
    fontFamily: Fonts.type.light
  },
  listContainer: { 
    borderBottomWidth: 1.5, 
    borderBottomColor: Colors.greyE8, 
    paddingHorizontal: wp(40), 
    ...AppStyles.rowCenterView, 
    justifyContent: 'space-between' 
  },
  listTitle: { 
    paddingVertical: hp(20) 
  },
  listContent: { 
    paddingHorizontal: wp(40) 
  },
  routeData: { 
    paddingHorizontal: wp(25), 
    backgroundColor: Colors.whiteFF 
  },
  btnContainer: { 
    marginHorizontal: wp(40), 
    marginTop: hp(120) 
  },
  trainIcon: {
    height: hp(19),
    width: wp(15)
},
})