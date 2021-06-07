import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Images, Colors, } from '../../../theme';
import { CommonActions } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';
import { Text16, Text26 } from '../../../components';

let swipperData = [
    { title: "Smart\nTransport\nfor Smart City", image: Images.swipper1, description: "BUSTIKET is your travel solution, with safe and comfortable transportation", imgStyle: styles.swipper1Img },
    { title: "Enjoy your trip with the best route", image: Images.swipper2, description: "Get a convenient and easy to reach.book your trip ticket and enjoy the ride comfortably", imgStyle: styles.swipper2Img },
    { title: "See transportation in real-time", image: Images.swipper3, description: "Find the nearest stop, departure time or real time location of your transportation on the map", imgStyle: styles.swipper3Img }
]
export default function Swipper({ navigation }) {
    const [ autoplay,setAutoplay] = useState(true);

    const onDone = () => {
        // AsyncStorage.setItem('OnboardSwiper', "true");

        // try {
        //     AsyncStorage.getItem('USER')
        //         .then((res) => {
        //             if (res) {
                        resetStack('tabbar');
        //             } else {
        //                 resetStack('onboardingStack');
        //             }
        //         });
        // } catch (error) {
        //     console.log('error', error);
        // }
    };

    resetStack = (whichStack) => {
        let resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: whichStack }],
        });
        navigation.dispatch(resetAction);
    };

    const onNext = (index) => {
        if (index == 2) {
            setAutoplay(false)
            setTimeout(() => {
                onDone()
            }, 1500);
        }
    }

    var data = swipperData.map((item, index) => {
        return (
            <View key={item.title.toString()} style={styles.swipperContainer}>
                <View style={{}}>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Image style={item.imgStyle} source={item.image} resizeMode={'contain'} />
                    <Text16 type="regular" title={item.description} addStyle={styles.description} />
                </View>
            </View>
        )
    })

    return (
        <Swiper
            onIndexChanged={(index) => onNext(index)}
            autoplay={autoplay}
            style={styles.wrapper}
            showsButtons={false}
            activeDotColor={Colors.whiteFF}
            dotColor={Colors.whiteFF}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotSyle}
        >
            {data}
        </Swiper>
    );
}
