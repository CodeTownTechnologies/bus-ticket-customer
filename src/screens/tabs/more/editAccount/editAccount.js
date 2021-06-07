import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Header, Text14, AppTextInput, Text12, AppButton, Loader } from '../../../../components';
import { Images } from '../../../../theme';
import styles from './editAccount.styles'
import { connect } from 'react-redux';
import { updateProfile } from '../../../../store/reducerActions/login/login.action';

class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "",
            isButtonDisabled: false,
            isDateTimePickerVisible: false,
            selectedDate: "",
            lname: "",
            mobile: "",
            isLoading: false
        }
    }

    componentDidMount() {
        const { route } = this.props
        if (route.params.user) {
            console.log('roues data===' + route.params.user.lastname)
            this.setState({ name: route.params.user.firstname, lname: route.params.user.lastname, mobile: route.params.user.phone })
        }
    }

    renderGenderSelection(title) {
        const { gender } = this.state
        return (
            <TouchableOpacity style={styles.genderComp} onPress={() => this.setState({ gender: title })}>
                {(gender == title) ? <Image source={Images.checkMark} style={styles.checkImage}/> :  <View style={styles.checkBox} /> }
                <Text12 title={title} type="light" />
            </TouchableOpacity>
        )
    }

    buttonPressed() {
        const { navigation, updateProfile, route } = this.props
        const { name, lname } = this.state

        let data = {
            user_id: route.params.user.id,
            first_name: name,
            last_name: lname
        }        
        
        this.setState({ isLoading: true })
        updateProfile(data)
        .then(res => {
            this.setState({ isLoading: false })
console.log('response =========' + JSON.stringify(res.payload.data))

            if(res.payload.data.status == "ok") {
                navigation.goBack()
            }
        })
        .catch(e => this.setState({ isLoading: false }))
    }

    render() {
        const { route } = this.props
        const { name, mobile, isButtonDisabled, lname, isLoading } = this.state
        return (
            <View>
                <Header back title={"My Account Edit"} />
                <Loader isLoading={isLoading}/>
                <View style={styles.container}>
                    <ScrollView scrollEnabled={false}>
                    <View style={styles.emailView}>
                        <Text14 type="regular" title={route.params.user.email} />
                    </View>
                    <View style={styles.accountInfoView}>
                        <Image source={Images.userIcon} style={styles.userIcon} />
                        <View>
                            <AppTextInput
                                onChange={(name) => { this.setState({ name }) }}
                                customContainerStyle={styles.nameTxtField}
                                value={name}
                                placeholderText={"Name"}
                            />
                            <AppTextInput
                                onChange={(lname) => { this.setState({ lname }) }}
                                customContainerStyle={styles.lnameTxtField}
                                value={lname}
                                placeholderText={"Name"}
                            />
                             {/* <AppTextInput
                                editable={"false"}
                                onChange={(mobile) => { this.setState({ lname }) }}
                                customContainerStyle={styles.lnameTxtField}
                                value={mobile}
                                placeholderText={"mobile"}
                            /> */}
                        </View>
                    </View>
                    </ScrollView>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton type={"withoutContainer"} title={"Save"} disable={isButtonDisabled} buttonPressed={() => this.buttonPressed()} />
                </View>
            </View>
        )
    }
}

//CALLING DYNAMIC FUNCTIONS 
const mapDispatchToProps = (dispatch) => ({
    updateProfile: (data) => dispatch(updateProfile(data))
});

export default connect(null, mapDispatchToProps)(EditAccount);