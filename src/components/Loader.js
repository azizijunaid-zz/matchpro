import React, {Component} from 'react';
import {
    Animated, LayoutAnimation,
    View,Image
} from 'react-native';
import TouchableScale from "./TouchableScale";
import ProgressiveImage from "./ProgressiveImage";
import {connect} from "react-redux";
import {fetchUser} from "../utils/store/actions/user";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../styles/colors";
import {LAYOUT_ANIMATION} from "../config";

const DEFAULT_SIZE = 300;
const INTERVAL = 1000;
const ANIMATION_DURATION = 3000;

class Loader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            circles: [],
        }
    }

    componentDidMount(){
        LayoutAnimation.configureNext(LAYOUT_ANIMATION);

    }
    componentWillMount() {
        this.addMoreCircles();
        setInterval(() => {
            this.addMoreCircles();
        }, INTERVAL);

    }

    addMoreCircles() {
        const SIZE = this.props.size || DEFAULT_SIZE;
        this.animatedA = new Animated.Value(0.20);
        this.opacityA = new Animated.Value(1);
        const {color} = this.props;

        const circle = (
            <Animated.View style={{
                height: SIZE,
                zIndex: 999,
                width: SIZE,
                position: 'absolute',
                borderRadius: SIZE / 2,
                borderColor: color || 'red',
                borderWidth: 2,
                backgroundColor: color || 'rgba(230,69,121,0.5)',
                opacity: this.opacityA,
                transform: [{
                    scale: this.animatedA
                }]
            }}>
            </Animated.View>
        );

        const {circles} = this.state;

        circles.push(circle);

        this.setState({circles});

        Animated.parallel([
            Animated.timing(this.animatedA, {
                toValue: 1,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,

            }),
            Animated.timing(this.opacityA, {
                toValue: 0,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,

            }),
        ]).start(() => {
            circles.shift();
            this.setState({circles});
        });
    }

    onPress(){
        this.addMoreCircles();
        if(this.props.onPress){
            this.props.onPress()
        }
    }


    render() {
        const SIZE = this.props.size || DEFAULT_SIZE;
        const IMAGE_SIZE = SIZE / 100 * 30;
        const {user} = this.props;
        return (
            <View style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{height: 300, alignItems: 'center', justifyContent: 'center'}}>
                    {this.state.circles.map(item => {
                        return item;
                    })}

                    <View style={{zIndex: 1000, position: 'absolute',}}>
                        <TouchableScale onPress={() => this.onPress()}>
                            <View style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }}>
                                <View style={{
                                    height: IMAGE_SIZE,
                                    width: IMAGE_SIZE,
                                    borderRadius: IMAGE_SIZE / 2,
                                    borderColor: '#FFF',
                                    borderWidth: IMAGE_SIZE / 13,
                                    backgroundColor: '#FFF',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {user && user.avatar ?
                                        <ProgressiveImage style={{
                                            height: IMAGE_SIZE - IMAGE_SIZE / 13,
                                            width: IMAGE_SIZE - IMAGE_SIZE / 13,
                                            borderRadius: IMAGE_SIZE -IMAGE_SIZE / 13 / 2,
                                            borderColor: '#FFF',
                                        }}
                                                          source={{uri: user.avatar}}
                                                          resizeMode={"cover"}/>
                                        :
                                        <Image source={require('./../../assets/main.png')}  
                                                 style={{height: IMAGE_SIZE - IMAGE_SIZE / 13, width: IMAGE_SIZE - IMAGE_SIZE / 13,}}/>
                                         // <Ionicons   name={"md-flame"} color={Colors.PRIMARY_COLOR} */}
                                                 // size={IMAGE_SIZE / 100 * 80}/> */}
                                                  
                                    }
                                </View>

                            </View>
                        </TouchableScale>
                    </View>


                </View>


            </View>
        );
    }
}


function mapStateToProps(state) {
    return {
        isLogin: state.auth.isLogin,
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchUser: user => dispatch(fetchUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Loader);
