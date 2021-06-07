import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header, Text12, Text10, Text14, PaymentTypes, AppButton, Loader } from '../../../../../components';
import { Colors, AppStyles, Images } from '../../../../../theme';
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './completeOrder.styles'
import moment from 'moment'
import api from '../../../../../api/api';

export default class CompleteOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: "",
            passengerName: "",
            passengerEmail: "",
            isLoading: false
        };
    }

    buyPressed() {
        const { selectedTrip, enteredData, departureDate } = this.props.route.params

        this.setState({ isLoading: true })
        let data = {
            trip_id: selectedTrip.trip_id,      
            route_type: "2",
            price: selectedTrip.price,
            adult: selectedTrip.passenger,
            booking_date: moment(departureDate).format('YYYY-MM-DD')
        }
        api.home.createBooking(data)
            .then(res => {
                this.setState({ isLoading: false })
                console.log('createBooking', res);
                if (res != 'error') {
                    // this.props.navigation.navigate('creditCard')
                    this.props.navigation.navigate('akap')

                }
            })
    }

    renderTextInput(title, state) {
        console.log('this.props.route.params', this.props.route.params);

        return (
            <View style={styles.inputView}>
                <Text12 type="light" title={title} />
                <TextInput
                    value={this.state[state]}
                    style={{ borderBottomColor: Colors.greyE8, borderBottomWidth: 2 }}
                    onChangeText={(val) => this.setState({ [state]: val })}
                />
            </View>
        )
    }



    render() {
        const { selectedTrip, enteredData, departureDate } = this.props.route.params
        const { passengerName, passengerEmail, paymentType, isLoading } = this.state
        return (
            <View style={AppStyles.container}>
                <Loader isLoading={isLoading}/>
                <Header back title={"Complete order"} />
                <ScrollView>
                    {this.renderTextInput("Passenger name", "passengerName")}
                    {this.renderTextInput("Email address", "passengerEmail")}
                    <PaymentTypes selectPaymentType={(item) => this.setState({ paymentType: item })} paymentType={this.state.paymentType} />

                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryView}>
                            <Text14 type="light" title="Summary" />
                            <Text12 type="regular" title={"Rp " + selectedTrip.price} addStyle={{ color: Colors.brownE1 }} />
                        </View>
                        <Text10 type="light" title={"Passenger: " + enteredData.passenger} />
                        <View style={styles.busLogoView}>
                            <Image source={Images.logobus} style={styles.busLogo} resizeMode={"contain"} />
                            <Text12 type="light" title={"Rosalia Indah"} />
                        </View>
                        <Text12 type="regular" title={moment(departureDate).format('dddd, DD MMMM')} addStyle={styles.ticketDate} />
                        <View style={{ ...AppStyles.rowCenterView }}>
                            <View style={styles.timeTerminalView}>
                                <Text10 type="regular" title={selectedTrip.start} addStyle={{ color: Colors.brownE1 }} />
                                <Text10 type="regular" title={selectedTrip.end} addStyle={{ color: Colors.brownE1 }} />
                            </View>
                            <Image source={Images.indicatorSmall} style={styles.indicatorIcon} resizeMode="contain" />
                            <View style={styles.timeTerminalView}>
                                <Text10 type="light" title={selectedTrip.arrival_terminal_name} />
                                <Text10 type="light" title={selectedTrip.departure_terminal_name} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.bookingView}>
                        <Text10 type="light" title={"Booking is reserved for "} />
                        <Text12 type="regular" title={selectedTrip.duration} addStyle={{ color: Colors.brownE1 }} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.totalView}>
                            <Text14 type="regular" title="Total :" />
                            <Text14 type="regular" title={"Rp " + selectedTrip.price} addStyle={{ color: Colors.brownE1 }} />
                        </View>
                        <AppButton type={"withoutContainer"} disable={!passengerName && !passengerEmail && !paymentType} title={"Buy"} buttonPressed={() => this.buyPressed()} containerStyle={{ marginTop: 0 }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}
