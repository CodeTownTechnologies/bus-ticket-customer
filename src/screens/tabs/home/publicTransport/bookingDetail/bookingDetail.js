import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header, Text14, Text10, Text12, Text16, AppButton } from '../../../../../components';
import { Colors, AppStyles, Images } from '../../../../../theme';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './bookingDetail.styles'
import moment from 'moment';

export default class BookingDetail extends Component {
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
            <View style={styles.topView}>
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
                        {this.renderTripData("Ticket", (this.props.route.params.fromFlow == "Subscription") ? "Subscription" : "Single Trip")}
                    </View>
                    <View style={styles.seperatorLine} />
                    <View style={styles.priceView}>
                        <Text10 type="light" title="Price :" />
                        <Text16 type="regular" title={"Rp "+price} addStyle={styles.price} />
                    </View>
                </View>
                {/* ---- */}
            </View>
        )
    }

    renderBottomView() {
        if(this.props.route.params.fromFlow == "Subscription") {
            return <AppButton type={"withoutContainer"} title={"Next"} buttonPressed={() => { this.props.navigation.navigate('PaymentMode', {...this.props.route.params}) }} />
        }
        return (
            <View style={styles.bottomView}>
                <Text12 title="Have a promo code ?" type="light" addStyle={styles.promoTxt} />
                <TextInput
                    placeholder="Enter a Promo Code"
                    onChangeText={(promoCode) => this.setState({ promoCode })}
                    style={styles.codeField}
                />
                <TouchableOpacity>
                    <Text12 title="Want to save money ?" type="light" addStyle={{ color: Colors.green27, alignSelf: 'center' }} />
                </TouchableOpacity>
                <AppButton type={"withoutContainer"} title={"Subscription Package"} buttonPressed={() => { this.props.navigation.navigate('subscriptionPackage', {...this.props.route.params}) }} containerStyle={styles.subscriptionBtn} />
                <AppButton type={"withoutContainer"} title={"Next"} buttonPressed={() => { this.props.navigation.navigate('PaymentMode', {...this.props.route.params}) }} />
            </View>
        )
    }

    render() {

        return (
            <View style={styles.mainContainer}>
                <Header back title="Booking detail" />
                <View style={styles.content}>
                    {this.renderTopView()}
                    {this.renderBottomView()}
                </View>
            </View>
        );
    }
}
