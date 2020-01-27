import NavigationService from "./src/services/NavigationService";
import {store} from "./src/utils/store";
import {registerScreens} from './src/screens/screens';
import {CC_CREDENTIALS} from "./src/config";
import ConnectyCube from 'connectycube-reactnative'
import { Navigation } from 'react-native-navigation';
import {Provider} from "react-redux";

const CONFIG = {
    on: {
        sessionExpired: function (handleResponse, retry) {
            // call handleResponse() if you do not want to process a session expiration,
            // so an error will be returned to origin request
            // handleResponse();

            ConnectyCube.createSession(function (error, session) {
                retry(session);
            });
        }
    }
};






Navigation.events().registerAppLaunchedListener(() => {

    registerScreens(Provider, store);
    ConnectyCube.init(CC_CREDENTIALS, CONFIG);
    NavigationService.initialLoad()

});







