import {Navigation} from 'react-native-navigation';
import Colors from "../styles/colors";
import {iconsMap} from "../utils/AppIcons";

function initialLoad() {

    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait'], // An array of supported orientations
            componentBackgroundColor: Colors.WHITE,
            backgroundColor: Colors.WHITE
        },
        topBar: {
            fontFamily: 'Gotham Rounded',
            visible: false,
            buttonColor: '#000',
            background: {
                color: 'white',
                translucent: true,
                blur: false
            },
            backButton: {
                color: '#000',
                visible: true
            },

        },

        bottomTabs: {
            visible: false,
            animate: false, // Controls whether BottomTabs visibility changes should be animated
            currentTabIndex: 0,
            currentTabId: 'currentTabId',
            testID: 'bottomTabsTestID',
            drawBehind: false,
            backgroundColor: 'white'
        },
        bottomTab: {
            badgeColor: 'red',
            testID: 'bottomTabTestID',
            iconColor: '#C1CDDA',
            selectedIconColor: '#444',
            textColor: 'red',
            selectedTextColor: '#444',
            fontSize: 10
        },


    });

    this.home();


}

function home() {

    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: "rattehin.Main"
                    },
                    options: {
                        layout: {
                            direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                            backgroundColor: 'transparent',
                            orientation: ['portrait'] // An array of supported orientations
                        },
                        topBar: {
                            visible: false,
                            title: {
                                text: ''
                            }
                        }
                    }
                }]
            }
        }
    });

}

function showLogin() {

    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: "rattehin.AuthScreen"
                    }
                }]
            }
        }
    });

}

function showProfileDetail(user) {


    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: 'rattehin.UserDetail',
                    passProps: {
                        data: user
                    },
                    options: {


                        layout: {
                            direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                            backgroundColor: 'transparent',
                            orientation: ['portrait'] // An array of supported orientations
                        },
                        topBar: {
                            visible: false,
                            title: {
                                text: ''
                            }
                        }
                    }
                }
            }]
        }
    })
}


function showSettings() {
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: 'rattehin.Settings',
                    passProps: {
                        data: []
                    },
                    options: {
                        topBar: {
                            elevation: 1.5, // TopBar elevation in dp
                            backButton: {
                                visible: false
                            },
                            title: {
                                text: 'Settings',
                                alignment: 'center', // Center title
                                color: Colors.DARK_GRAY,
                                fontWeight: 'bold',
                            },
                            rightButtons: [
                                {
                                    text: 'Done',
                                    color: Colors.PRIMARY_COLOR,
                                    id: 'done_settings'
                                },
                            ],

                            drawBehind: false,
                            visible: true,
                            animate: false,
                            noBorder: false,
                        }
                    }

                }
            }]
        }
    })
}

function showEditInfo() {
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: 'rattehin.EditInfo',
                    passProps: {
                        data: []
                    },

                    options: {
                        topBar: {
                            elevation: 1.5, // TopBar elevation in dp
                            backButton: {
                                visible: false
                            },
                            title: {
                                text: 'Edit Information',
                                alignment: 'center', // Center title
                                color: Colors.DARK_GRAY,
                                fontWeight: 'bold',
                            },
                            rightButtons: [
                                {
                                    text: 'Done',
                                    color: Colors.PRIMARY_COLOR,
                                    id: 'done_edit'
                                },
                            ],

                            drawBehind: false,
                            visible: true,
                            animate: false,
                            noBorder: false,
                        }
                    }


                }
            }]
        }
    })
}


function showChatScreen(componentId, dialog) {

    Navigation.push(componentId, {
        component: {
            name: 'rattehin.ChatScreen',
            passProps: {
                dialog: dialog
            },
            options: {
                topBar: {
                    elevation: 1.5, // TopBar elevation in dp
                    title: {
                        text: dialog.name || "",
                        alignment: 'center', // Center title
                        color: Colors.DARK_GRAY,
                    },
                    // rightButtons: [
                    //     {
                    //         icon: iconsMap['ios-videocam'],
                    //         color: Colors.PRIMARY_COLOR,
                    //         id: 'video_call'
                    //     },
                    // ],

                    drawBehind: false,
                    visible: true,
                    animate: false,
                    noBorder: false,
                }

            }
        }
    });

}

function showVideoScreen() {
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: 'rattehin.VideoScreen',
                    passProps: {
                        dialog: []
                    },

                }
            }]
        }
    })
}


function dismissOverlay(componentId) {

    Navigation.dismissOverlay(componentId);

}

function dismissModal(componentId) {
    Navigation.dismissModal(componentId)
}

function dismissAllModals() {
    Navigation.dismissAllModals();
}

function showInAppNotification(props) {

    Navigation.showOverlay({
        component: {
            name: 'rattehin.InAppNotification',
            passProps: {
                ...props
            },
            options: {
                overlay: {
                    interceptTouchOutside: false
                },
                screenBackgroundColor: 'transparent',
                modalPresentationStyle: 'overCurrentContext',
                layout: {
                    componentBackgroundColor:'transparent',
                    direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
                    backgroundColor: 'transparent',
                    orientation: ['portrait'] // An array of supported orientations
                },
                topBar: {
                    visible: false,
                    title: {
                        text: ''
                    }
                }

            }
        }
    });
}


const navigationService = {
    initialLoad,
    home,
    showSettings,
    showEditInfo,
    showChatScreen,
    showLogin,
    showInAppNotification,
    showVideoScreen,
    dismissOverlay,
    dismissModal,
    dismissAllModals,
    showProfileDetail,
};

export default navigationService;