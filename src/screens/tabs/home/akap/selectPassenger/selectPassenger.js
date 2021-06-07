import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Header, Text14, Text26 } from '../../../../../components';
import { Images, Colors } from '../../../../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './selectPassenger.styles'

export default class SelectPassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adult: 1,
      child: 0
    };
  }

  subPressed(item) {
    if(item.stateName == "adult" && this.state[item.stateName] == 1 ) return
    if(item.stateName == "child" && this.state[item.stateName] == 0 ) return
    this.setState({ [item.stateName]: --this.state[item.stateName] })
  }

  addBtnPressed(item) {
    this.setState({ [item.stateName]: ++this.state[item.stateName] })
  }

  checkMarkPressed() {
    const { setPassengerVal } = this.props.route.params
    const { adult, child } = this.state
    
    setPassengerVal((parseInt(adult) + parseInt(child)), this.state)
    this.props.navigation.goBack()
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <Header back title={"Select passenger"} onRightPressed={() => this.checkMarkPressed()} rightImg={Images.tickWhite} rightStyle={styles.checkMarkIcon} />
        <FlatList
          data={[{ title: "Adult", stateName: "adult" }, { title: "Child", stateName: "child" }]}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.listItem}>
                <Text14 type="light" title={item.title} />
                <View style={styles.calculationView}>
                  <TouchableOpacity onPress={() => { this.subPressed(item) }}>
                    <Text26 type="semibold" title={"-"} />
                  </TouchableOpacity>
                  <Text14 type="light" title={this.state[item.stateName]} />
                  <TouchableOpacity onPress={() => { this.addBtnPressed(item) }}>
                    <Text26 type="bold" title={"+"} addStyle={{ color: Colors.green27 }}/>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </View>
    );
  }
}
