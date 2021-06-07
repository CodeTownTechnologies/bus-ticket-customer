import React, { Component } from 'react';
import { TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { Header, AppButton, Text12 } from '../';
import { Colors, Images } from '../../theme';
import { wp, hp } from '../../utils/heightWidthRatio';

export default class SelectionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: {
                id: this.props.id
            },
            isButtonDisabled: true
        }
    }

    componentDidMount() {
        const { selectedData } = this.props
        if(selectedData && selectedData.id) {
            this.setState({ selectedValue: selectedData })
        }
    }

    buttonPressed() {
        const { buttonPressed } = this.props
        const { selectedValue } = this.state
        buttonPressed(selectedValue)
    }

    selectCheckBox = (item) => {
        if (this.state.selectedValue.id === item.id) {
            this.setState({ selectedValue: {} })
        } else {
            this.setState({ selectedValue: item })
        }
    }
    render() {
        const { selectedValue } = this.state
        const { header, data } = this.props
        return (
            <>
                <Header back title={header} />
                <FlatList 
                    data={data}
                    keyExtractor={(item, index) => `${item.locationgroupname.toString()}${index.toString()}`}
                    style={styles.listPadding}
                    ListFooterComponent={() =>  <AppButton type={"withoutContainer"} title={"Submit"} disable={!(selectedValue && selectedValue.id)} buttonPressed={() => this.buttonPressed()} containerStyle={styles.buttonContainer}/>}
                    renderItem={({item, index}) => {
                        return (
                            <TouchableOpacity style={styles.cityView} onPress={() => this.selectCheckBox(item)}>
                                <Text12 title={item.locationgroupname} type="light"/>
                                {(selectedValue && selectedValue.id == item.id) ?<Image source={Images.checkMark} style={styles.checkImage}/> : null}
                            </TouchableOpacity>
                        )
                    }}
                />
            </>
        )
    }
}


const styles = StyleSheet.create({
    listPadding: {
        paddingHorizontal: wp(25),
    },
    content: {
        flex: 1,
        marginHorizontal: wp(35),
    },
    buttonContainer: {
        marginTop: hp(50),
        marginHorizontal: wp(15),
        marginBottom: 30
    },
    cityView: { 
        height: 50, 
        alignItems: 'center', 
        borderBottomWidth: 2, 
        borderBottomColor: Colors.greyEb, 
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between'
    },
    checkImage: { 
        height: 20, 
        width: 20 
    }
})
