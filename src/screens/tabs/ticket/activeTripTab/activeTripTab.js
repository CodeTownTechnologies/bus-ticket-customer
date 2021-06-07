import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Colors, AppStyles, Images } from '../../../../theme';
import { Text12, Text14, Text10 } from '../../../../components';
import styles from './activeTripTab.styles';

export default class ActiveTicketTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderPublicTransportTicket(item, index) {
    return (
      <View style={[AppStyles.shadow, styles.listView]}>
        <View style={styles.busNoView}>
          <Text12 type="regularWhite" title={item.busNo} />
        </View>
        <View style={styles.rightView}>
          <View style={styles.originView}>
            <Text12 type="light" title={item.from + " - "} />
            <Text12 type="light" title={item.to} />
          </View>
          <View style={styles.seperatorLine} />
          {
            item.stops.map(item => {
              return (
                <View style={styles.stopsView}>
                  <Text14 type="regular" title={item.title} addStyle={{ color: Colors.brownE1 }} />
                  <Text12 type="regular" title={"Active"} addStyle={{ color: Colors.green27 }} />
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }

  renderAkapTicket(item, index) {
    return (
      <View style={[AppStyles.shadow, styles.akapListView]}>
        <View style={styles.topView}>
          <View style={AppStyles.rowCenterView}>
            <Image source={Images.instagram} style={styles.ticketIcon} resizeMode="contain" />
            <Text12 type="light" title="Rosalia Indah" />
          </View>
          <Text12 type="light" title={`Adult: 1`} />
        </View>

        <View style={styles.terminalContainer}>
          <View style={styles.terminalView}>
            <Text10 type="regular" title="8:50 AM" addStyle={{ color: Colors.brownE1 }} />
            <Text10 type="regular" title="5:40 PM" addStyle={{ color: Colors.brownE1 }} />
          </View>
          <Image source={Images.indicator} style={styles.indicatorIcon} resizeMode="contain" />
          <View style={styles.terminalView}>
            <Text12 type="light" title="Terminal Kalideres Jakarta" />
            <Text12 type="light" title="Terminal Purabaya Bungurasih" />
          </View>
        </View>

        <View style={AppStyles.rowCenterView}>
            <Text10 type="light" title="Date: " />
            <Text10 type="regular" title="Thursday, 02 jul 2020" addStyle={{ color: Colors.brownE1 }} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        data={[{
          from: "Stasiun Cikarang",
          to: "Hollywood Jc",
          busNo: "2A",
          stops: [
            { title: "BSTK2020001" },
            { title: "BSTK2020002" },
            { title: "BSTK2020003" },
            { title: "BSTK2020004" },
            { title: "BSTK2020005" },
            { title: "BSTK2020006" }
          ],
        }
        ]}
        keyExtractor={(item, index) => `${index.toString()}`}
        style={{ marginTop: 10 }}
        // renderItem={({ item }) => this.renderPublicTransportTicket(item)}
        renderItem={({ item }) => this.renderAkapTicket(item)}
      />
    );
  }
}
