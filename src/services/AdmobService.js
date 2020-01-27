import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'


function showInterstitial() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-9611352782277273/6924721061');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

}

const admobService = {
    showInterstitial
}

export default admobService;
