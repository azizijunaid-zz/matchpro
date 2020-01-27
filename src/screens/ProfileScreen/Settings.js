import React, {Component} from "react";
import {View, ScrollView, Text} from "react-native";
import Form from "../../components/Form";
import Colors from "../../styles/colors";
import NavigationService from "../../services/NavigationService";
import {Navigation} from 'react-native-navigation';
import LinearGradient from "react-native-linear-gradient";
import {fetchUser, userLogin, userLogout} from '../../utils/store/actions/user';
import User from '../../services/UserService';
import TouchableScale from "../../components/TouchableScale";
import {connect} from "react-redux";
import Loader from "../../components/Loader";
import {setLanguage} from "../../utils/store/actions/languages";
import _ from "lodash";

class Settings extends Component {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            loading: false,
            errors: null,
        }
    }


    componentDidMount() {
        this.navigationEventListener = Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {

            if (buttonId === "done_settings") {
                const {formData} = this.state;

                if (Object.keys(formData).length < 1) {

                    NavigationService.dismissModal(this.props.componentId);
                    return;
                }

                const updatedUserProfile = {
                    'phone': formData.phone,
                    'custom_data': JSON.stringify({
                        ...JSON.parse(this.props.user.custom_data),
                        location: formData.location,
                        show_me: formData.show_me,
                        age_range: formData.age_range,
                        max_distance: formData.max_distance
                    })
                };


                this.setState({loading: true})
                User.updateProfile(updatedUserProfile).then(this.props.fetchUser).then(e => {
                    this.setState({loading: false})
                    NavigationService.dismissModal(this.props.componentId);

                }).catch(e => {
                    NavigationService.showInAppNotification({
                        title: "Validation Error",
                        message: "please complete the form"
                    })
                    this.setState({
                        errors: {
                            code: "VALIDATION_ERROR",
                            formErrors: e.message.errors
                        },
                        loading: false
                    })
                });
            }

        });
    }


    render() {
        const {user, translations, dictionary, languages} = this.props;
        const {custom_data} = user;

        const langValues = [];
        languages.map((lan, i) => {
            const data = {value: i, label: lan.name};
            langValues.push(data);

        })

        let initialValues = {
            "phone": user.phone,
            "email": user.email,

        };
        if (custom_data) {
            const customDataValues = {
                "location": JSON.parse(custom_data).location,
                "show_me": JSON.parse(custom_data).show_me,
                "age_range": JSON.parse(custom_data).age_range,
                "max_distance": JSON.parse(custom_data).max_distance,
            };

            initialValues = {...initialValues, ...customDataValues}
        }


        if (this.state.loading) {
            return (
                <Loader/>
            )
        }


        return (
            <ScrollView style={{flex: 1, padding: 20, paddingTop: 10, backgroundColor: Colors.LIGHT_GRAY}}>
                <Form
                    initialValues={initialValues}
                    primaryColor={Colors.PRIMARY_COLOR}
                    onChange={formData => this.setState({formData: formData})}
                    error={this.state.errors}
                    fields={[

                        {
                            name: 'phone',
                            keyboardType: 'phone-pad',
                            label: translations.phoneNumber,
                        },
                        {
                            name: 'email',
                            label: translations.email,
                        },

                        {
                            name: 'location',
                            label: translations.location,
                        },
                        {
                            name: 'max_distance',
                            type: 'slider',
                            label: translations.maxDistance,
                        },

                        {
                            name: 'show_me',
                            type: 'radio',
                            values: [
                                {value: "women", label: dictionary.women},
                                {value: "men", label: dictionary.men}
                            ],
                            label: translations.showMe,
                        },
                        {
                            name: 'age_range',
                            type: 'slider',
                            label: translations.ageRange,
                        },
                    ]}
                />


                <Form
                    primaryColor={Colors.PRIMARY_COLOR}
                    error={this.state.errors}
                    fields={[
                        {
                            name: 'language',
                            type: 'radio',
                            values: langValues,
                            initialValue: this.props.selectedId,
                            onChange: (index) => {
                                this.props.setLanguage(languages[index])
                            },
                            label: translations.language,
                        },
                    ]}
                />


                    <TouchableScale onPress={() => {
                        User.logout(this.state)
                            .then(this.props.userLogout)
                            .then(NavigationService.showLogin())
                            .catch(e => console.error(e))

                    }}>
                        <View style={{
                            shadowColor: "#000",
                            marginRight:20,
                            paddingBottom:50,
                            marginLeft:20,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.27,
                            shadowRadius: 4.65,
                            elevation: 6,
                        }}>
                            <LinearGradient
                                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                                colors={['#E64579', '#E64579', '#EC7064']}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    height: 60,
                                    borderRadius: 40,
                                    width: '100%',

                                }}>
                                <Text
                                    style={{color: '#FFF', fontSize: 18, fontWeight: '600'}}>{dictionary.logout}</Text>
                            </LinearGradient>

                        </View>
                    </TouchableScale>

            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    user: state.user,
    selectedId: _.findIndex(state.languages.languages, {name: state.languages.selected.name}),
    languages: state.languages.languages,
    translations: state.languages.selected ? state.languages.selected.translations.fields : {},
    dictionary: state.languages.selected ? state.languages.selected.translations.dictionary : {}
});

const mapDispatchToProps = (dispatch) => ({
    userLogin: user => dispatch(userLogin(user)),
    userLogout: user => dispatch(userLogout(user)),
    fetchUser: user => dispatch(fetchUser(user)),
    setLanguage: language => dispatch(setLanguage(language)),


});


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
