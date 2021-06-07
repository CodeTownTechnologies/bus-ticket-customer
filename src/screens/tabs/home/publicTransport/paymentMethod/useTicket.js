import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Header, Text14, Text10, Text12, Text16, AppButton } from '../../../../../components';
import { AppStyles, Colors, Images } from '../../../../../theme';
import styles from '../bookingDetail/bookingDetail.styles'
import moment from 'moment'

export default class UseTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderTripData(title, description) {
        return (
            <View>
                <Text10 type="light" title={title} addStyle={{ marginBottom: 15 }} />
                <Text12 type="regular" title={description} addStyle={{ color: Colors.brownE1 }} />
            </View>
        )
    }

    renderTopView() {
        const { price, arrival_terminal_name, start, departure_terminal_name } = this.props.route.params

        return (
            <View style={[styles.topView, { marginVertical: 10, marginHorizontal: 25, borderBottomLeftRadius: -200, borderBottomRightRadius: 10 }]}>
                {/* Brown View */}
                <View style={styles.brownView}>
                    <View style={AppStyles.rowCenterView}>
                        <Image source={Images.indicator} style={styles.indicatorImg} resizeMode="contain" />
                        <View>
                            <Text14 type="regular" title={arrival_terminal_name} addStyle={styles.departure} />
                            <Text14 type="regular" title={departure_terminal_name} addStyle={{ color: Colors.whiteFF }} />
                        </View>
                    </View>
                    {/* <View style={styles.busNumberView}>
                    <Text14 type="regular" title={trip_id} addStyle={{ color: Colors.brownE1 }} />
                </View> */}
                </View>
                {/* ---- */}
                {/* white View */}
                <View style={styles.topWhiteView}>
                    <View style={styles.tripDataCont}>
                        {this.renderTripData("Date", moment().format('ddd, DD MMMM'))}
                        {this.renderTripData("Time", start)}
                        {this.renderTripData("Ticket", "Single Trip")}
                    </View>
                    <View style={styles.seperatorLine} />
                </View>
                {/* ---- */}
            </View>
        )
    }

    render() {
        console.log(this.props.route);
        return (
            <View style={{ flex: 1, backgroundColor: Colors.whiteFF}}>
                <Header back title="Use Ticket" />
                <ScrollView >
                    {this.renderTopView()}
                    <AppButton type={"withoutContainer"} title={"Done"} buttonPressed={() => this.props.navigation.navigate('home')} containerStyle={{}} />

                </ScrollView>
            </View>
        );
    }
}
