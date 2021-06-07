import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native'
import { Header, Text12, Loader, Text16 } from '../../../../components';
import { FlatList } from 'react-native-gesture-handler';
import { Images, AppStyles } from '../../../../theme';
import styles from './inbox.styles'
import { connect } from 'react-redux';
import { inbox } from '../../../../store/reducerActions/more/more.action';

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: "",
            isLoading: true,
            inboxData: []
        }
    }

    componentDidMount() {
        const { inbox } = this.props
        inbox().then(res => {
            this.setState({ isLoading: false })
            console.log("res ", res);
            if(res.payload.data.status == "ok") {
                this.setState({ inboxData: res.payload.data.data })
            }
        })
        .catch(e => {
            this.setState({ isLoading: false })
        })
    }


    render() {
        const { showDetail, isLoading, inboxData } = this.state

        let data = []
        if(inboxData.length > 0) {
            data = inboxData
        } else {
            data.push({ type: "No data", id: 0 })
        }

        return (
            <View style={styles.container}>
                <Header back title="BUSTIKET Information"/>
                <Loader isLoading={isLoading}/>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${item.id.toString}`}
                    style={{ marginTop: 10 }}
                    renderItem={({item, index}) => {
                        if(item.type && item.type == "No data") {
                            return <Text16 type="regular" title={item.type} addStyle={{ flex:1, textAlign: 'center' }}/>
                        }
                        return (
                            <TouchableOpacity style={[styles.listView, AppStyles.shadow]} onPress={() => this.setState({ showDetail: (showDetail == index+1) ? "" : index+1 })}>
                                <Image source={Images.message} style={styles.messageIcon}/>
                                <View>
                                    <Text12 type="light" title={item.subject} addStyle={styles.titleMargin}/>
                                    <Text12 type="light" title={item.message}/>
                                    { (showDetail && showDetail == index+1) ? <Text12 type="light" title={"BUSTICKET"}addStyle={styles.cardBottomTxt}/> : null}
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        )
    }
}

//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    inbox: () => dispatch(inbox())
});
  
export default connect(null, mapDispatchToProps)(Inbox);