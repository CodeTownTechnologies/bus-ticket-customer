import React, { Component } from 'react';
import { View, Modal, ScrollView } from 'react-native';
import { Colors, AppStyles } from '../../../../theme';
import { wp } from '../../../../utils/heightWidthRatio';
import { Text14, Text10 } from '../../../../components';
import privacyPolicyData from './privacyPolicy.Data';
import styles from './privacyPolicy.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.visible}
        onRequestClose={ this.props.onBackPress }
      >
        <View style={styles.container}>
          <View style={styles.content}>
          <Icon name='close' style={styles.Icon} onPress={ this.props.onBackPress } />
            <Text14 title="Privacy Policy" type="regular" addStyle={styles.title} />
            <ScrollView showsVerticalScrollIndicator={false} >
              <Text10 title={privacyPolicyData} type="regular" />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
