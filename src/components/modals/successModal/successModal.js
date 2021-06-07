import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Platform, Modal } from 'react-native';
import { Colors, Images, Fonts, } from '../../../theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text26, Text16 } from './../../index';
export default class SuccessModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { title, visible, subTitle} = this.props
        return (
            <Modal
            style={{ margin: 0,}}
            isVisible={visible}
            >
                <View style={styles.container}>
                    <Image style={styles.imageStyle} source={Images.successTick}/>
                    <Text26 title={title} type={'light'} addedStyle={styles.headerText} />
                    <Text16 title={subTitle} type={'light'} addStyle={styles.desc}/>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.whiteFF,
        justifyContent: 'center',
        marginHorizontal: wp(40/375*100),
        borderRadius: 8,
    },
    imageStyle: {
        height: hp(40/667*100),
        width: wp(40/375*100),
        marginTop: hp(28/667*100)
        
    },
    headerText: {
        paddingHorizontal: wp(10/375*100),
        marginTop: hp(4/667*100),
        color: Colors.blueTheme
    },
    desc: {
        paddingHorizontal: wp(15/375*100),
        textAlign: 'center',
        paddingTop: hp(4/667*100),
        paddingBottom: hp(28/667*100),
    },
    title: {
        // fontFamily: Fonts.type.light,
        fontSize: Fonts.size.font24,
        color: Colors.grey84,
        marginBottom: hp(2.998)
    },
})