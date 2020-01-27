import React from 'react';
import Colors from "../styles/colors";
import ConnectyCube from 'connectycube-reactnative'
import _ from "lodash";

import CacheStore from 'react-native-cache-store';
import { Animated, Image, View } from 'react-native';
import FastImage from 'react-native-fast-image'

export default class ProgressiveImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            progress: 0,
            fileUrl:"",
        };

    }

    async componentDidMount() {
        if(!this.props.source){
            return;
        }

        const id = this.props.source.uri;


        const fileUrl = await this.fetchImage(id);


        if (fileUrl) {
            Image.prefetch(fileUrl);
        }

        this.setState({fileUrl})
    }

    async fetchImage(id) {

        return CacheStore.get(id).then(async (value) => {
            if (!value) {
                const fileUrl = await ConnectyCube.storage.privateUrl(id);
                if(!fileUrl) return
                CacheStore.set(id, fileUrl, 30); // Expires in 10 minutes
                return fileUrl;
            }
            return value;
        });

    }

    async componentDidUpdate(prevProps) {
        if(!this.props.source){
            return;
        }
        if (_.isEqual(prevProps, this.props)) return;

        var fileUrl = await this.fetchImage(this.props.source.uri);

        this.setState({fileUrl})
    }


    imageOpacity = new Animated.Value(0);

    onLoadImage() {
        this.setState({ loading: false });
        if (this.props.onLoad) {
            this.props.onLoad();
        }

        Animated.timing(this.imageOpacity, {
            toValue: 1,
            duration: this.props.duration || 1000,
            useNativeDriver: true
        }).start();
    }

    renderPlaceholder() {
        const width = this.props.style.width / 100 * 50  ||  80;
        const current_width = width * ((100 - this.state.progress) / 100);
        const child_width = Math.round(current_width);
        return (
            <View style={{ flex: 1, zIndex:99999, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{height:2, width:width, backgroundColor:'rgba(255,255,255,0.2)'}}>
                    <Animated.View style={{flex:1, width: child_width, backgroundColor:'rgba(255,255,255,1)'}}>
                    </Animated.View>
                </View>
            </View>
        )
    };

    onLoadStart = () => {
        this.setState({ loading: true });
    };
    onLoadEnd = () => {
        this.setState({ loading: false });
    };

    render() {
        const { loading } = this.state;

        return (
            <FastImage style={[{backgroundColor: Colors.GRAY}, this.props.style ]}
                       source={{uri: this.state.fileUrl}}
                       ref={this.props.ref}
                       resizeMode={this.props.resizeMode || FastImage.resizeMode.cover}
                       onLoadStart={this.onLoadStart}
                       onProgress={e => this.setState({progress: (e.nativeEvent.loaded / e.nativeEvent.total)})}
                       onLoad={() => {
                           this.onLoadImage()
                       }}
                       onError={this.props.onError}
                       onLoadEnd={this.onLoadEnd}
                       defaultSource={this.props.defaultSource}
            >
                {loading && this.renderPlaceholder()}
                {this.props.children}
            </FastImage>
        );
    }
}
