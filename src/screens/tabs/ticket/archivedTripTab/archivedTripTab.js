import React, {Component} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Text12, Text14, AppButton} from '../../../../components';
import {Colors, AppStyles} from '../../../../theme';
import styles from './archivedTripTab.styles';
import API from '../../../../api/api';

export default class ArchivedTicketTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      data: [],
    };
  }

  buttonPressed() {}

  componentDidMount() {
    API.ticket.getArchivedTickets().then((res) => {
      if (res && res.data && res.data.status == 'ok') {
        this.setState({data: res.data.data});
      } else {
        alert(res.data.message ? res.data.message : 'Something went wrong');
      }
    });
  }

  render() {
    const {isDisabled, data} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index.toString()}`}
          style={{marginTop: 10}}
          // ListFooterComponent={() => <AppButton type={"withoutContainer"} title={"Remove"} disable={isDisabled} buttonPressed={() => this.buttonPressed()} />}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[AppStyles.shadow, styles.listView]}>
                <View style={styles.busNoView}>
                  <Text12 type="regularWhite" title={'2A'} />
                </View>
                <View style={styles.rightView}>
                  <View style={styles.rightTopView}>
                    <View style={styles.originView}>
                      <Text12 type="light" title={item.pick_location + ' - '} />
                      <Text12 type="light" title={item.drop_location} />
                    </View>
                  </View>
                  <View style={styles.seperatorLine} />
                  <View style={styles.bottomView}>
                    <Text14
                      type="regular"
                      title={item.tickets}
                      addStyle={{color: Colors.brownE1}}
                    />
                    <Text12
                      type="regular"
                      title={'Completed'}
                      addStyle={{color: Colors.redD0}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <AppButton
          type={'withoutContainer'}
          title={'Remove'}
          disable={isDisabled}
          buttonPressed={() => this.buttonPressed()}
          containerStyle={styles.removeBtn}
        />
      </View>
    );
  }
}
