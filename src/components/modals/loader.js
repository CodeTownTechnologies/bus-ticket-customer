import React, { Component } from 'react';
import { Modal, View, ActivityIndicator } from 'react-native'
import { Colors } from '../../theme';
import { wp } from '../../utils/heightWidthRatio';

export default class Loader extends Component {
    render() {
        const { isLoading } = this.props
        return (
            <Modal
                transparent
                visible={isLoading}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ height: wp(80), width: wp(80), borderRadius: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.whiteFF, borderRadius: 10 }}>
                        <ActivityIndicator size="large" color={Colors.green27} />
                    </View>
                </View>
            </Modal>
        )
    }
}