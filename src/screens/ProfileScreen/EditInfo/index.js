import React, {Component} from "react";
import {View, Text, ScrollView, Platform, KeyboardAvoidingView} from "react-native";
import {connect} from "react-redux";
import {fetchUser, userLogin, userLogout} from "../../../utils/store/actions/user";
import Colors from "../../../styles/colors";
import NavigationService from "../../../services/NavigationService";
import {Navigation} from "react-native-navigation/lib/dist/index";
import User from "../../../services/UserService";
import Dimensions from "../../../styles/dimensions";
import ProgressiveImage from "../../../components/ProgressiveImage";
import {Main} from "../../../styles/index";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import Form from "../../../components/Form";
import Loader from "../../../components/Loader";

class EditInfo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            loading: false,
        }

    }


    componentDidMount() {
        this.navigationEventListener = Navigation.events().registerNavigationButtonPressedListener(({buttonId}) => {
            if (buttonId === "done_edit") {

                const {formData} = this.state;

                if (Object.keys(formData).length < 1) {
                    NavigationService.dismissModal(this.props.componentId);
                    return;
                }
                const data = {
                    about_me: formData.about_me,
                    job_title: formData.job_title,
                    company: formData.company,
                    education: formData.education,
                };

                const customData = JSON.parse(this.props.user.custom_data);

                const updatedUserProfile = {
                    full_name: formData.full_name,
                    'custom_data': JSON.stringify({...customData, ...data})
                };


                this.setState({loading: true})
                User.updateProfile(updatedUserProfile).then(this.props.fetchUser).finally(e => {
                    this.setState({loading: false})
                    NavigationService.dismissModal(this.props.componentId);

                });
            }

        });
    }

    renderGallery() {

        const {user} = this.props;

        const images = [
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: user.avatar},
            {thumbnail: ""},
        ];


        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {images.map(image => (
                    <View style={{
                        backgroundColor: '#ccc',
                        borderRadius: 5,
                        width: Dimensions.SCREEN_WIDTH / 3 - 20,
                        height: Dimensions.SCREEN_WIDTH / 3 + 20,
                        margin: 5,
                    }}>
                        <ProgressiveImage source={{uri: image.thumbnail}}
                                          style={{height: '100%', width: null, borderRadius: 5,}}/>
                        <View style={[Main.smallShadow, {
                            position: 'absolute',
                            bottom: -3,
                            right: -5,
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FFF'
                        }]}>
                            {image.thumbnail ?

                                <IconFontAwesome name='close' style={{
                                    color: Colors.PRIMARY_COLOR,
                                    fontSize: 15
                                }}/>
                                :
                                <LinearGradient
                                    start={{x: 1, y: 0}} end={{x: 0.5, y: 1.1}}
                                    colors={[Colors.PRIMARY_COLOR, Colors.SECONDARY_COLOR]}
                                    style={{
                                        borderRadius: 100,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1,
                                        width: '100%',

                                    }}>
                                    <IconFontAwesome name='plus' style={{
                                        color: Colors.WHITE,
                                        fontSize: 15
                                    }}/>
                                </LinearGradient>
                            }

                        </View>
                    </View>
                ))}

                <Text style={{fontWeight: '300', paddingTop: 20,}}>Hold, drag and drop to order</Text>
            </View>
        )
    }


    render() {
        const {user, translations} = this.props;
        const {custom_data} = user;

        let initialValues = {
            "full_name": user.full_name,
        };
        if (custom_data) {
            const customDataValues = {
                "about_me": JSON.parse(custom_data).about_me,
                "job_title": JSON.parse(custom_data).job_title,
                "company": JSON.parse(custom_data).company,
                "education": JSON.parse(custom_data).education,
            };
            initialValues = {...initialValues, ...customDataValues}
        }


        if (this.state.loading) {
            return (
                <Loader/>
            )
        }


        return (
            <ScrollView style={{flex: 1, backgroundColor: Colors.LIGHT_GRAY, padding: 10,}}>
                {/*{this.renderGallery()}*/}
                <KeyboardAvoidingView
                    style={{flex: 1,}}
                    behavior={Platform.OS === 'ios' ? "padding" : null}
                    keyboardVerticalOffset={0}>
                    <Form
                        initialValues={initialValues}
                        primaryColor={Colors.PRIMARY_COLOR}
                        labelColor="#000"
                        fontColor={Colors.GRAY}
                        onChange={formData => this.setState({formData: formData})}
                        fields={[
                            {
                                name: 'full_name',
                                autoCapitalize: false,
                                label: translations.full_name,
                            },
                            {
                                name: 'about_me',
                                multiline: true,
                                autoCapitalize: false,
                                label: translations.about_me,
                            },
                            {
                                name: 'job_title',
                                autoCapitalize: false,
                                label: translations.job_title,
                            },
                            {
                                name: 'company',
                                autoCapitalize: false,
                                label: translations.company,
                            },
                            {
                                name: 'education',
                                label: translations.education,
                            },
                        ]}
                    />
                </KeyboardAvoidingView>


            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    user: state.user,
    translations: state.languages.selected.translations.fields

});

const mapDispatchToProps = (dispatch) => ({
    userLogin: user => dispatch(userLogin(user)),
    userLogout: user => dispatch(userLogout(user)),
    fetchUser: user => dispatch(fetchUser(user)),


});


export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);

