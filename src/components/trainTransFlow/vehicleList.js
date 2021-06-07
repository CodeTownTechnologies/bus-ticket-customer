import React, { Component } from 'react';
import { View, TouchableOpacity, SectionList, Image, StyleSheet } from 'react-native';
import Header from '../header/header';
import { AppStyles, Colors, Images } from '../../theme';
import Text12 from '../textComponent/text12';
import { Loader, Text14 } from '..';
import { hp, wp } from '../../utils/heightWidthRatio';
import API from '../../api/api';

let transDummy = [
    { title: "Blok M -  Kota", route: "1" },
    { title: "PIK - Balai Kota", route: "1A" },
    { title: "Stasiun Palmera - Tosari", route: "1B" },
    { title: "Stasiun Tanah Abang - Stasiun Gondangdia", route: "1H" },
    { title: "Meruya - Blok M", route: "1" },
    { title: "Blok M - Rempoa", route: "1Q" },
    { title: "Senen - Stasiun Tanah Abang", route: "2" },
    { title: "Pulo Gadung - Harmoni", route: "3" }
]

let trainDummy = [
    {
        title: "KRL",
        data: [
            { title: "Jakarta Kota - Cikarang", route: "1" },
            { title: "Jakarta Kota - Bogor", route: "1H" },
            { title: "Jakarta Kota - Kampung Bandan", route: "1" },
            { title: "Jatinegara - Duri - Bogor", route: "1Q" },
            { title: "Tanah Abang - Rangkasbitung", route: "2" },
        ]
    },
    {
        title: "TRAINS",
        data: [
            { title: "Soekarno-Hatta Airport - Manggarai", route: "1" },
        ]
    },
    {
        title: "MRT",
        data: [
            { title: "Bundaran HI - Lebak Bulus", route: "1" },
        ]
    },
    {
        title: "LRT",
        data: [
            { title: "Velodrome - Kelapa Gading", route: "1" },
        ]
    }
]

export default class VehicleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            isLoading: true
        };
    }

    componentDidMount() {
        const { type } = this.props
        let data = []
        if(type == "train") {
            // data = [{ title: "trans", data: transDummy }]

            this.getTripData("3")
        } else {
            data = trainDummy
            this.getTripData("4")
        }
    }

    getTripData(type) {
        let data = {
            route_type: type
        }
        API.home.searchTrip(data).then(res => {
            console.log('res', res);
            this.setState({ isLoading: false })
            if(res && res.data && res.data.status == "ok") {
                this.setState({ listData: [{ title: type == 3 ? "trans" : "Train", data: res.data.data }] })
            }else {
                alert(res.data.message ? res.data.message : "Something went wrong")
              }
        })
    }

    render() {
        const { listData, isLoading } = this.state
        const { type, navigation } = this.props

        return (
            <View style={AppStyles.container}>
                <Header back title={type == "trans" ? "TransJakarta" : "Trains"} />
                <Loader isLoading={isLoading}/>
                <SectionList
                    sections={listData}
                    style={styles.list}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate(`${type}Route`, item)}>
                                <View style={[styles.leftView, { backgroundColor: type == "trans" ? "#0069f8" : "#ee1818" }]}>
                                    {
                                        type == "trans" ?
                                            <Text12 type="regular" title={item.route} addStyle={{ color: Colors.whiteFF }}/>
                                            :
                                            <Image source={Images.train} style={styles.trainIcon} resizeMode={"contain"}/>
                                    }
                                </View>
                                <Text12 numberOflines={1} type="light" title={item.trip_route_name} addStyle={styles.listItemTitle}/>
                            </TouchableOpacity>
                        )
                    }}
                    renderSectionHeader={({section: {title}}) => {
                        if(title == "trans") return null
                        return <Text14 type="regular" title={title} addStyle={styles.listHeader} />
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    list: { 
        marginTop: 10 
    },
    listItem: { 
        ...AppStyles.rowCenterView, 
        ...AppStyles.shadow2, 
        backgroundColor: Colors.whiteFF, 
        paddingVertical: hp(10), 
        paddingHorizontal: wp(15), 
        marginHorizontal: wp(25), 
        marginVertical: hp(5), 
        borderRadius: 5 
    },
    leftView: { 
        height: wp(30), 
        width: wp(30), 
        borderRadius: wp(15) , 
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
    }
})