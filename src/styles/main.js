import {StyleSheet, Text} from "react-native";
import Colors from "./colors";
import Dimensions from "./dimensions";
import Font from "./font";




const Main = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    // COMPONENT - CARD ITEM
    containerCardItem: {
        backgroundColor: Colors.PRIMARY_COLOR,
        borderRadius: 8,
        alignItems: "center",
        margin: 10,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: Colors.BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    matchesCardItem: {
        marginTop: -35,
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    matchesTextCardItem: {
        color: Colors.WHITE
    },
    descriptionCardItem: {
        color: Colors.GRAY,
        textAlign: "center"
    },
    status: {
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    statusText: {
        color: Colors.GRAY,
        fontSize: 12
    },
    online: {
        width: 6,
        height: 6,
        backgroundColor: Colors.ONLINE_STATUS,
        borderRadius: 3,
        marginRight: 4
    },
    offline: {
        width: 6,
        height: 6,
        backgroundColor: Colors.OFFLINE_STATUS,
        borderRadius: 3,
        marginRight: 4
    },
    actionsCardItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 30
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.WHITE,
        marginHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: Colors.DARK_GRAY,
        shadowOffset: { height: 10, width: 0 }
    },
    miniButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: Colors.WHITE,
        marginHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: Colors.DARK_GRAY,
        shadowOffset: { height: 10, width: 0 }
    },
    star: {
        color: Colors.STAR_ACTIONS
    },
    like: {
        fontSize: 25,
        color: Colors.LIKE_ACTIONS
    },
    dislike: {
        fontSize: 25,
        color: Colors.DISLIKE_ACTIONS
    },
    flash: {
        color: Colors.FLASH_ACTIONS
    },

    // COMPONENT - CITY
    city: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 20,
        width: 90,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: Colors.BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    cityText: {
        color: Colors.DARK_GRAY,
        fontSize: 13
    },

    // COMPONENT - FILTERS
    filters: {
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 20,
        width: 70,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: Colors.BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    filtersText: {
        color: Colors.DARK_GRAY,
        fontSize: 13
    },

    // COMPONENT - MESSAGE
    containerMessage: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10,
        width: Dimensions.SCREEN_WIDTH - 100
    },
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60,
        marginRight: 20,
        marginVertical: 15
    },
    message: {
        color: Colors.GRAY,
        fontSize: 12,
        paddingTop: 5
    },

    // COMPONENT - PROFILE ITEM
    containerProfileItem: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
        paddingBottom: 25,
        margin: 20,
        borderRadius: 8,
        marginTop: -65,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: Colors.BLACK,
        shadowOffset: { height: 0, width: 0 }
    },
    matchesProfileItem: {
        width: 131,
        marginTop: -15,
        backgroundColor: Colors.PRIMARY_COLOR,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20,
        textAlign: "center",
        alignSelf: "center"
    },
    matchesTextProfileItem: {
        color: Colors.WHITE
    },
    name: {
        paddingTop: 25,
        paddingBottom: 5,
        color: Colors.DARK_GRAY,
        fontSize: 15,
        textAlign: "center"
    },
    descriptionProfileItem: {
        color: Colors.GRAY,
        textAlign: "center",
        paddingBottom: 20,
        fontSize: 13
    },
    info: {
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    iconProfile: {
        fontSize: 12,
        color: Colors.DARK_GRAY,
        paddingHorizontal: 10
    },
    infoContent: {
        color: Colors.GRAY,
        fontSize: 13
    },

    // CONTAINER - GENERAL
    bg: {
        flex: 1,
        resizeMode: "cover",
        width: Dimensions.SCREEN_WIDTH,
        height: Dimensions.SCREEN_HEIGHT
    },
    top: {
        paddingTop: 50,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: { paddingBottom: 10, fontSize: 22, color: Colors.DARK_GRAY },
    icon: {
        fontSize: 20,
        color: Colors.DARK_GRAY,
        paddingRight: 10
    },

    // CONTAINER - HOME
    containerHome: { marginHorizontal: 10 },

    // CONTAINER - MATCHES
    containerMatches: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10
    },

    // CONTAINER - MESSAGES
    containerMessages: {
        justifyContent: "space-between",
        flex: 1,
        paddingHorizontal: 10
    },

    // CONTAINER - PROFILE
    containerProfile: { marginHorizontal: 0 },
    photo: {
        width: Dimensions.SCREEN_WIDTH,
        height: 450
    },
    profileTopButtonLeft: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowColor: "#777",
        shadowOffset: {height: 10, width: 0}
    },
    profileTopButtonMiddle: {
        marginTop: 50,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.PRIMARY_COLOR,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    profileTopButtonRight: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    actionsProfile: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    iconButton: { fontSize: 20, color: Colors.WHITE },
    textButton: {
        fontSize: 15,
        color: Colors.WHITE,
        paddingLeft: 5
    },
    circledButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    roundedButton: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.SECONDARY_COLOR,
        paddingHorizontal: 20
    },

    // MENU
    tabButton: {
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    tabButtonText: {
        textTransform: "uppercase"
    },
    iconMenu: {
        height: 20,
        paddingBottom: 7
    },
    mediumShadow: {
        shadowColor: Colors.DARK_GRAY,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.65,
        elevation: 6,
    },
    smallShadow: {
        shadowColor: Colors.DARK_GRAY,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 6,
    },


    //CHAT SCREEN
    roundCard: {

    },

    cardRow: {

    }


});

export default Main;


