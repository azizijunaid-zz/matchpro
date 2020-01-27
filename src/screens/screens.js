import {Navigation} from 'react-native-navigation';
import Main from '../rootView';
import profileDetail from './userDetail';
import Settings from './ProfileScreen/Settings';
import EditInfo from './ProfileScreen/EditInfo';
import AuthScreen from './AuthScreen';
import ChatScreen from './ChatScreen';
import DialogsScreen from './MessagesScreen/DialogsScreen';
import MatchesScreen from './MessagesScreen/MatchesScreen';
import LikeScreen from './LikeScreen';
import Loader from '../components/Loader';
import InAppNotification from '../components/InAppNotification';
// import VideoScreen from './VideoScreen';
import DiscoverMap from '../screens/DiscoverScreen/Map';


// register all pages of the app (including internal ones)
export function registerScreens(Provider, store) {
    // Navigation.registerComponentWithRedux('rattehin.VideoScreen', () => VideoScreen, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.Main', () => Main, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.UserDetail', () => profileDetail, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.Settings', () => Settings, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.EditInfo', () => EditInfo, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.AuthScreen', () => AuthScreen, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.ChatScreen', () => ChatScreen, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.DialogsScreen', () => DialogsScreen, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.MatchesScreen', () => MatchesScreen, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.LikeScreen', () => LikeScreen, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.Loader', () => Loader, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.InAppNotification', () => InAppNotification, Provider, store);
    Navigation.registerComponentWithRedux('rattehin.DiscoverMap', () => DiscoverMap, Provider, store);

}

