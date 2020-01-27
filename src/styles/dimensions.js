import {Dimensions} from "react-native";

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

export default {
    SCREEN_WIDTH,
    SCREEN_HEIGHT
}