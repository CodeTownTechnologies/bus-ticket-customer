import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import { Header, Text12, Text14 } from '../../../components';
import { Colors, AppStyles } from '../../../theme';

import styles from './ticket.styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ArchivedTripTab from './archivedTripTab/archivedTripTab';
import ActiveTripTab from './activeTripTab/activeTripTab';

export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    tabPressed(item, index) {
        item.goToPage(index)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    initialPage={0}
                    style={styles.container}
                    renderTabBar={(item) => {
                        let tabs = []
                        let activeTab = item.tabs[item.activeTab]
                        item.tabs.map((tabItem, index) => {
                            let tabTextColor = (activeTab == tabItem) ? Colors.whiteFF : '#6bc87f'
                            tabs.push(
                                <TouchableOpacity key={tabItem + "tab"} style={[styles.tabContainer]} onPress={() => this.tabPressed(item, index)}>
                                    <Text14 type="regular" title={tabItem} addStyle={{color: tabTextColor}}/>
                                </TouchableOpacity>
                            )
                        })
                        return (
                            <View style={[styles.tabView]} key={"index"}>
                                {tabs}
                            </View>
                        )
                    }
                    }
                >
                    <ActiveTripTab tabLabel="Active Trip" />
                    <ArchivedTripTab tabLabel="Archived Trip" />
                </ScrollableTabView>
            </View>
        )
    }
}