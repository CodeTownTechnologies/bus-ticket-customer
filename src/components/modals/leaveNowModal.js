import React, { Component } from 'react'
import { View, Modal, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { Header, AppButton, Text12 } from '../';
import { Colors, Images } from '../../theme';
import { wp, hp } from '../../utils/heightWidthRatio';
import Text14 from '../textComponent/text14';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default class LeaveNowModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: {},
            isButtonDisabled: true,
            date: "Select Date",
            time: "Select Time",
            isDatePickerVisible: false,
            isTimeVisible: false
        }
    }

    componentDidMount() {
        const { selectedData } = this.props
        if (selectedData && selectedData.id) {
            this.setState({ selectedValue: selectedData })
        }
    }

    buttonPressed() {
        const { closeModal } = this.props
        closeModal()
    }

    hideTimePicker = () => {
        this.setState({ isTimeVisible: false })
    };

    handleTimeConfirm = (time) => {
        this.setState({ time: moment(time).format('MM:HH a')})
        this.hideTimePicker();
    };


    renderListItem(title) {
        const { selectedValue } = this.state

        return (
            <TouchableOpacity style={styles.cityView} onPress={() => this.setState({ selectedValue: title })}>
                <Text14 title={title} type="light" />
                {(selectedValue && selectedValue == title) ? <Image source={Images.checkMark} style={styles.checkImage} /> : <View style={[styles.checkImage, { backgroundColor: Colors.green27, borderRadius: 3 }]} />}
            </TouchableOpacity>
        )
    }

    renderContent() {
        const { date, time } = this.state

        return (
            <>
                <Text14 type="regular" title="Time options" addStyle={styles.titleTxt} />
                {this.renderListItem("Leave now")}
                {this.renderListItem("Leave at")}
                {this.renderListItem("Arrive by")}
                <View style={styles.dateView}>
                    <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true })}>
                        <Text14 type="regular" title={date} addStyle={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ isTimeVisible: true })}>
                        <Text14 type="regular" title={time} addStyle={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.doneButton} onPress={() => this.buttonPressed()}>
                    <Text14 type="regular" title="Done" addStyle={{ alignSelf: 'center', color: Colors.green27 }} />
                </TouchableOpacity>
            </>
        )
    }

    renderCalender() {
        return (
            <Calendar
                minDate={moment().format('YYYY-MM-DD')}
                maxDate={moment().add(1, 'month').format('YYYY-MM-DD')}
                onDayPress={(day) => { this.setState({ date: day.dateString, isDatePickerVisible: false }) }}
                monthFormat={'MMMM yyyy'}
                hideExtraDays={true}
                hideDayNames={false}
                firstDay={1}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableAllTouchEventsForDisabledDays={true}
            />
        )
    }

    renderTime() {
        const { isTimeVisible } = this.state

        return (
            <DateTimePickerModal
                isVisible={isTimeVisible}
                mode="time"
                onConfirm={this.handleTimeConfirm}
                onCancel={this.hideTimePicker}
            />
        )
    }

    render() {
        const { visible } = this.props
        const { isDatePickerVisible, isTimeVisible } = this.state

        return (
            <Modal
                visible={visible}
                transparent
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        {isDatePickerVisible ? this.renderCalender() : this.renderContent()}
                        {this.renderTime()}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: Colors.whiteFF,
        paddingHorizontal: wp(25),
        width: '90%',
        borderRadius: 7,
        paddingTop: hp(22)
    },
    titleTxt: {
        alignSelf: 'center',
        marginBottom: hp(10)
    },
    buttonContainer: {
        marginTop: hp(50),
        marginHorizontal: wp(15)
    },
    cityView: {
        height: hp(50),
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.greyEb,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkImage: {
        height: wp(20),
        width: wp(20)
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(23),
        paddingHorizontal: wp(17)
    },
    doneButton: {
        paddingBottom: hp(20),
        paddingTop: hp(24)
    }
})
