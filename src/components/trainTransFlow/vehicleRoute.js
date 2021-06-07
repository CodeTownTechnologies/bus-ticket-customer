import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { AppStyles, Images, Colors } from '../../theme';
import CustomSafeArea from '../customSafeArea/customSafeArea';
import { wp, hp } from '../../utils/heightWidthRatio';
import { Text12, Text14, Text10, Text26, Loader } from '..';
import StepIndicator from 'react-native-step-indicator';
import api from '../../api/api';

function stepIndicatorStyles(type) {
    return {
        stepIndicatorSize: 18,
        currentStepIndicatorSize: 25,
        separatorStrokeWidth: 5,
        currentStepStrokeWidth: 5,
        stepStrokeCurrentColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        separatorFinishedColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        separatorUnFinishedColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        stepIndicatorFinishedColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        stepIndicatorUnFinishedColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        stepIndicatorCurrentColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        stepIndicatorLabelFontSize: 12,
        currentStepIndicatorLabelFontSize: 12,
        stepIndicatorLabelCurrentColor: '#ffffff',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: type == "trans" ? Colors.blue00 : Colors.redEE,
        labelColor: Colors.black2b,
        labelSize: 13,
        currentStepLabelColor: Colors.black2b,
    }
}

export default class VehicleRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailModal: false,
            loading: false,
            label: []
        };
    }

    componentDidMount() {
        const { route } = this.props
        // this.setState({ loading: true })

        let data = {
            trip_id: route.params.trip_id
        }
        api.home.tripDetails(data).then(res => {
            this.setState({ loading: false })
            console.log('res', res);
            if(res && res.data && res.data.status == "ok") {
                let label = []
                if(res.data.data && res.data.data.stoppage_points_list && res.data.data.stoppage_points_list.length > 0) {
                    res.data.data.stoppage_points_list.map(item => label.push(item.title))
                }
                this.setState({ tripData: res.data.data, label, loading: false})
            }
        })
    }

    renderRouteDetail() {
        const { type, route } = this.props
        const { detailModal } = this.state
        return (
            <Modal
                visible={detailModal}
            >
                <View style={AppStyles.container}>
                    <View style={styles.listItem} >
                        <TouchableOpacity style={styles.modalBack} onPress={() => this.setState({ detailModal: false })}>
                            <Image source={Images.backBlack} style={styles.backIcon} />
                        </TouchableOpacity>
                        <View style={[styles.leftView, { backgroundColor: type == "trans" ? "#0069f8" : "#ee1818" }]}>
                            {
                                type == "trans" ?
                                    <Text12 type="regular" title={route.params.route} addStyle={{ color: Colors.whiteFF }} />
                                    :
                                    <Image source={Images.train} style={styles.trainIcon} resizeMode={"contain"} />
                            }
                        </View>
                        <View>
                            <Text14 numberOflines={1} type="regular" title={route.params.title} addStyle={styles.listItemTitle} />
                            <Text10 type="light" title={"1 Transjakarta"} />
                        </View>
                    </View>
                    <View style={styles.modalStepIndicator}>
                    {this.renderStepIndicator()}
                </View>
                    <View style={styles.modalFeedbackView}>
                        <Text12 type="regular" title="Feedback" />
                        <TouchableOpacity style={styles.modalReportBtnView} onPress={() => this.setState({ detailModal: false}, () => this.props.navigation.navigate(`${type}Problem`, {...route.params, ...this.state.tripData})) }>
                            <View style={AppStyles.rowCenterView}>
                                <Image source={Images.messageWithQues} style={styles.feedbackIcon} />
                                <Text12 title="Incorrect data? Report it!" type="light" />
                            </View>
                            <Text26 title=">" type="semibold" addStyle={{ color: Colors.greyCb }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        )
    }
    renderHeader() {
        const { navigation } = this.props

        return (
            <View style={styles.headerContainer}>
                <CustomSafeArea backgroundColor="transparent" />
                <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
                    <Image source={Images.backBlack} style={styles.backImage} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
        )
    }

    renderStepIndicator() {
        const { type } = this.props
        const { detailModal, label } = this.state
        if(label.length == 0) return
        let labels = label
        if(!detailModal) {
            labels = labels.slice(0, 8)
        }

        return (
            <StepIndicator
                customStyles={stepIndicatorStyles(type)}
                stepCount={labels.length}
                labels={labels}
                direction="vertical"
                renderStepIndicator={(item, index) => {
                    if (item.position == labels.length - 1) {
                        return (
                            <View style={styles.stepIndicator0}>
                                <View style={styles.innerIndicatorView}></View>
                            </View>
                        )
                    }
                    return (
                        <View style={styles.stepIndicator}>
                            <View style={{ height: 12, width: 12, borderRadius: 12 / 2, backgroundColor: Colors.whiteFF }}></View>
                        </View>
                    )
                }}
            />
        )
    }

    render() {
        const { type, route } = this.props

        return (
            <View style={AppStyles.container}>
                {this.renderRouteDetail()}
                <Loader isLoading={this.state.loading}/>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ flex: 1 }}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 1,
                        longitudeDelta: 0.0421,
                    }}
                >
                </MapView>
                {this.renderHeader()}
                <View style={styles.bottomView}>
                    <View style={styles.cardView}>
                        <TouchableOpacity style={styles.seperatorLine}>
                            <View style={styles.lineView} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={styles.listItem} onPress={() => { this.setState({ detailModal: true }) }}>
                            <View style={[styles.leftView, { backgroundColor: type == "trans" ? "#0069f8" : "#ee1818" }]}>
                                {
                                    type == "trans" ?
                                        <Text12 type="regular" title={route.params.route} addStyle={{ color: Colors.whiteFF }} />
                                        :
                                        <Image source={Images.train} style={styles.trainIcon} resizeMode={"contain"} />
                                }
                            </View>
                            <Text12 numberOflines={1} type="light" title={route.params.trip_route_name} addStyle={styles.listItemTitle} />
                        </TouchableOpacity>
                    </View>
                    {this.renderStepIndicator()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: wp(25),
        flexDirection: 'column',
        position: 'absolute',
        top: 20,
        width: '100%',
    },
    backButton: {
        height: wp(40),
        width: wp(40),
        borderRadius: 7,
        backgroundColor: Colors.whiteFF,
        alignItems: 'center',
        justifyContent: 'center',
        ...AppStyles.shadow2,
    },
    backImage: {
        height: 14,
        width: 18
    },
    listItem: {
        ...AppStyles.rowCenterView,
        ...AppStyles.shadow2,
        backgroundColor: Colors.whiteFF,
        paddingVertical: hp(10),
        paddingHorizontal: wp(15),
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        marginBottom: 10
    },
    leftView: {
        height: wp(30),
        width: wp(30),
        borderRadius: wp(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(10)
    },
    trainIcon: {
        height: hp(19),
        width: wp(15)
    },
    listHeader: {
        color: Colors.greyCb,
        marginLeft: wp(25),
        marginVertical: hp(22)
    },
    listItemTitle: {
        width: wp(250)
    },
    stepContainer: {
        ...AppStyles.shadow,
        flex: 1,
        backgroundColor: Colors.whiteFF,
        width: '100%',
        paddingHorizontal: wp(15),
        marginTop: hp(10),
        borderRadius: 8
    },
    bottomView: {
        position: 'absolute',
        width: AppStyles.screenWidth - 20,
        bottom: 0,
        backgroundColor: Colors.whiteFF,
        alignSelf: 'center',
        height: hp(288),
        paddingHorizontal: wp(25)
    },
    cardView: {
        marginTop: -25
    },
    seperatorLine: {
        backgroundColor: Colors.whiteFF,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3
    },
    lineView: {
        height: 2,
        marginVertical: 4,
        width: wp(100),
        backgroundColor: Colors.greyCb
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
    modalStepIndicator: { 
        paddingHorizontal: wp(25), 
        flex:1 
    },
    modalFeedbackView: { 
        ...AppStyles.shadow2, 
        backgroundColor: Colors.whiteFF, 
        paddingHorizontal: wp(25), 
        borderTopColor: Colors.greyEb, 
        borderTopWidth: 2, 
        paddingVertical: 10 
    },
    modalReportBtnView: { 
        ...AppStyles.rowCenterView, 
        justifyContent: 'space-between', 
        paddingVertical: hp(10) 
    },
    feedbackIcon:  { 
        height: wp(20), 
        width: wp(20), 
        marginRight: wp(20) 
    }

})