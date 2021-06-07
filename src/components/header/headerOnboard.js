import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native'
import { Images, Colors, AppStyles } from '../../theme'
import { useNavigation } from '@react-navigation/native';
import { Text16, Text14 } from '../';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info'
import { hp, wp } from '../../utils/heightWidthRatio';


export default function headerOnbording({ title, back, isRefreshEnabled, onRefresh, description }) {
    const backButton = () => {
        const navigation = useNavigation();
        return (
            <View style={styles.backViewContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={Images.back} style={styles.backImage} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                        <Image source={Images[title]} style={styles.contentImage} resizeMode={'contain'} />
                        <Text16 title={title} type={"regularWhite"} addStyle={{ marginTop: 30 }}/>
                        <Text14 title={description} type={"lightWhite"} addStyle={{ textAlign: 'center', marginTop: 10 }}/>
                    </View>
            </View>
        )
    }

    let containerStyle = back ? {} : { paddingLeft: AppStyles.marginHorizontal }
    return (
        <View style={[styles.container, containerStyle]}>
            {backButton()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: (Platform.OS == 'ios') ? DeviceInfo.hasNotch() ? hp(230) + 30 : hp(230) + 15 : hp(250),
        backgroundColor: Colors.green27,
        paddingTop: (Platform.OS == 'ios') ? DeviceInfo.hasNotch() ? 35 : 15 : 10
    },
    nacoLogo: {
        height: heightPercentageToDP(4.3),
        width: widthPercentageToDP(11.7)
    },
    backImage: {
        height: heightPercentageToDP(1.8),
        width: widthPercentageToDP(5.3)
    },
    backButton: {
        paddingRight: AppStyles.horizontal10,
        paddingLeft: AppStyles.marginHorizontal,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        height: heightPercentageToDP(5)
    },
    backViewContainer: {
        flex: 1,
    },
    content: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1
    },
    contentImage: {
        width: wp(47),
        height: hp(79)
    }
})