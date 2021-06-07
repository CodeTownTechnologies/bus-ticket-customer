import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text12, Text14, AppButton } from '../../../../components';
import { Colors, AppStyles } from '../../../../theme';
import styles from './archivedTripTab.styles'

export default class ArchivedTicketTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true
    };
  }

  buttonPressed() {

  }

  render() {
    const { isDisabled } = this.state
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ from: "Stasiun Cikarang", to: "Hollywood Jc", ticketNo: "BSTK2020001", busNo: "2A" }]}
          keyExtractor={(item, index) => `${index.toString()}`}
          style={{ marginTop: 10 }}
          // ListFooterComponent={() => <AppButton type={"withoutContainer"} title={"Remove"} disable={isDisabled} buttonPressed={() => this.buttonPressed()} />}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={[AppStyles.shadow, styles.listView]}>
                <View style={styles.busNoView}>
                  <Text12 type="regularWhite" title={item.busNo} />
                </View>
                <View style={styles.rightView}>
                  <View style={styles.rightTopView}>
                    <View style={styles.originView}>
                      <Text12 type="light" title={item.from + " - "} />
                      <Text12 type="light" title={item.to} />
                    </View>
                  </View>
                  <View style={styles.seperatorLine} />
                  <View style={styles.bottomView}>
                    <Text14 type="regular" title={item.ticketNo} addStyle={{ color: Colors.brownE1 }} />
                    <Text12 type="regular" title={"Completed"} addStyle={{ color: Colors.redD0 }} />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
        <AppButton type={"withoutContainer"} title={"Remove"} disable={isDisabled} buttonPressed={() => this.buttonPressed()} containerStyle={styles.removeBtn} />
      </View>
    );
  }
}
