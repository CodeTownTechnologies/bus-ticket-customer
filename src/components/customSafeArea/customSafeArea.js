import React from 'react';
import { View, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Colors } from '../../theme';

const customSafeArea = ({ backgroundColor }) => {
    return (
        <View style={{ height: (Platform.OS == 'ios') ? getStatusBarHeight(true) : 0, width: "100%", backgroundColor: backgroundColor ? backgroundColor : Colors.green27 }}/>
    );
}

export default customSafeArea;
