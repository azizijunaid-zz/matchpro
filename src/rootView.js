import React, {Component} from 'react'
import {
    StyleSheet,
    Platform,
    View,
    Animated,Image
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import DiscoverScreen from "./screens/DiscoverScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ProfileScreen from "./screens/ProfileScreen";
const IconFontAwesomeAnimated = Animated.createAnimatedComponent(IconFontAwesome)
const IconIoniconsAnimated = Animated.createAnimatedComponent(IconIonicons)
import {Main, Colors, Dimensions} from "./styles";
import ToggleSwitch from "./components/ToggleSwitch";
import LikeScreen from "./screens/LikeScreen";
import ConnectyCubeWrapper from "./ConnectyCubeWrapper";

export default class AppRoot extends Component {

    static options(passProps) {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            isOn: false,
        }
    }



    goToPage = (index) => {
        this.tabbar.goToPage(index)
    };

    onToggleHome = (isOn) => {
        this.setState({isOn})
    };


    renderTabs() {
        const {isOn} = this.state;

        return (
            <ScrollableTabView
                onScroll={(value) => this.setState({currentTab: value})}
                ref={ref => {
                    this.tabbar = ref
                }}
                locked={this.state.currentTab === 1}
                initialPage={1}
                renderTabBar={() => <CustomTab onToggleHome={this.onToggleHome}/>}
                prerenderingSiblingsNumber={1}
            >
                <ProfileScreen componentId={this.props.componentId}/>
                {isOn ?  <LikeScreen componentId={this.props.componentId}/> : <DiscoverScreen componentId={this.props.componentId}/>}
                <MessagesScreen componentId={this.props.componentId}/>
            </ScrollableTabView>
        )
    }

    render() {

        return(
            <ConnectyCubeWrapper>
                {this.renderTabs()}
            </ConnectyCubeWrapper>
        );

    }
}

class CustomTab extends React.PureComponent {
    constructor(props) {
        super(props);
        this.offset = new Animated.Value(0)
        this.props.scrollValue.addListener(this.updateView)
        this.state = {
            isOn: false,

        }
    }

    updateView = (offset) => {
        // offset.value | 0-1
        this.offset.setValue(-(offset.value - 1) * (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE))
    }

    onToggle(isOn) {
        this.setState({isOn}, this.props.onToggleHome(isOn));

    }

    render() {
        const {isOn} = this.state;

        const {goToPage, activeTab} = this.props;

        // Animated btn scale
        const scaleBtnLeft = this.offset.interpolate({
            inputRange: [-1 * (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE), 0, (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE)],
            outputRange: [1, 1, 1.5]
        });
        const scaleBtnCenter = this.offset.interpolate({
            inputRange: [-1 * (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE), 0, (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE)],
            outputRange: [1, 1.5, 1]
        });
        const scaleBtnRight = this.offset.interpolate({
            inputRange: [-1 * (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE), 0, (Dimensions.SCREEN_WIDTH / 2 - NAVI_BTN_SIZE)],
            outputRange: [1.5, 1, 1]
        });

        // Animated btn colors
        const colorBtnLeft = scaleBtnLeft.interpolate({
            inputRange: [1, 1.5],
            outputRange: ['#e3e5e8', Colors.PRIMARY_COLOR]
        });
        const colorBtnCenter = scaleBtnCenter.interpolate({
            inputRange: [1, 1.5],
            outputRange: ['#e3e5e8', Colors.PRIMARY_COLOR]
        });
        const colorBtnRight = scaleBtnRight.interpolate({
            inputRange: [1, 1.5],
            outputRange: ['#e3e5e8', Colors.PRIMARY_COLOR]
        });


        let toggleColor = isOn ? Colors.SECONDARY_COLOR : Colors.PRIMARY_COLOR;
        if (activeTab !== 1) {
            toggleColor = "#e3e5e8"
        }

        return (
            <View style={[styles.header]}>
                <Animated.View style={[styles.headerAnimated, {marginLeft: this.offset}]}>
                    <Animated.Text
                        onPress={() => goToPage(0)}
                        style={[styles.Btn, {transform: [{scale: scaleBtnLeft}]}]}
                    >
                        <IconFontAwesomeAnimated name='user' style={{color: colorBtnLeft, fontSize: 25}}/>
                    </Animated.Text>

                    <Animated.View
                        style={[styles.Btn, {transform: [{scale: scaleBtnCenter}]}]}
                    >
                        <ToggleSwitch
                            disabledOnPress={() => goToPage(1)}
                            isOn={this.state.isOn}
                            disabled={activeTab !== 1}
                            onColor={toggleColor}
                            icon={isOn ?
                                <IconFontAwesomeAnimated name='thumbs-up' style={{
                                    color: activeTab !== 1 ? toggleColor : Colors.SECONDARY_COLOR,
                                    fontSize: 18
                                }}/>
                                :
                                <IconIoniconsAnimated name='md-flame' style={{
                                    color: activeTab !== 1 ? toggleColor : Colors.PRIMARY_COLOR,
                                    fontSize: 18
                                }}/>
                                // <Image source={require('./../assets/main.png')}
                                // style={{
                                //     color: activeTab !== 1 ? toggleColor : Colors.PRIMARY_COLOR,
                                //     fontSize: 18
                                // }}/>

                            }
                            offColor={toggleColor}
                            labelStyle={{color: "black", fontWeight: "900"}}
                            onToggle={isOn => this.onToggle(isOn)}
                        />

                    </Animated.View>
                    <Animated.Text
                        onPress={() => goToPage(2)}
                        style={[styles.Btn, {transform: [{scale: scaleBtnRight}]}]}
                    >
                        <IconFontAwesomeAnimated name='comments' style={{color: colorBtnRight, fontSize: 25}}/>
                    </Animated.Text>
                </Animated.View>
            </View>
        )
    }
}


const NAVI_BTN_SIZE = 36

const styles = StyleSheet.create({
    Btn: {
        width: NAVI_BTN_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    header: {
        backgroundColor: Colors.WHITE,
        marginTop: Platform.OS === "ios" ? 20 : 0,
        width: Dimensions.SCREEN_WIDTH,
        height: 70,
        zIndex:0,
    },
    headerAnimated: {
        width: Dimensions.SCREEN_WIDTH,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


