import React, {Component} from 'react';
import {
    Text,
    View,
    Animated,
    Dimensions,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import _ from "lodash";

export default class InputWrapper extends Component {
    static propTypes = {
        label: 'string|null',
        error: 'string|array|null',
    };

    static defaultProps = {
        label: '',
        error: null,
    };

    width = new Animated.Value(0);
    labelSize = new Animated.Value(this.props.value ? 10 : 13);

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            values: this.props.values,

        };
    }

    animateSelected = (selected) => {
        Animated.spring(
            // Animate value over time
            this.width, // The value to drive
            {
                toValue: selected ? this.state.layoutWidth : 0, // Animate to final value of 1
                bounciness: 10
            },
        ).start(); // Start the animation


    }


    componentDidMount() {

        this.resolveValues();
    }

    componentDidUpdate(prevProps) {
        if (this.shouldResolveValues(prevProps)) {

            this.resolveValues();
        }
    }

    resolveValues = () => {
        const values = this.props.values;

        if (!values) {
            this.setState({values: null})
            return;
        }

        if (!_.isFunction(values)) {
            this.setState({values, loading: false})
            return;
        }

        const result = values();

        if (!(result instanceof Promise)) {
            this.setState({values: result, loading: false})
            return;
        }

        this.setState({values: null, loading: true});
        result
            .then(data => this.setState({values: data}))
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({loading: false});
            })

    }

    shouldResolveValues = (prevProps) => {
        if (!this.props.values) {
            return false;
        }

        if (_.isFunction(this.props.values) && !this.props.valuesDependencies) {
            return false;
        }

        if (this.props.valuesDependencies) {
            return !_.isEqual(prevProps.valuesDependencies, this.props.valuesDependencies);

        }

        return !_.isEqual(prevProps.values, this.props.values);
    }

    onChange = (value) => {

        if (!this.props.transformer) {
            this.props.onChange(value);
            Animated.spring(
                // Animate value over time
                this.labelSize, // The value to drive
                {
                    toValue: value ? 10 : 13, // Animate to final value of 1
                    bounciness: 10
                },
            ).start(); // Start the animation

            return
        }

        value = this.props.transformer(value);
        if (!(value instanceof Promise)) {
            this.props.onChange(value);
            return
        }
        this.setState({loading: true});

        value.then(data => {
            this.props.onChange(data);
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            this.setState({loading: false})
        });

    }

    renderLoading() {
        return (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
                <ActivityIndicator color={this.props.primaryColor || '#999'}/>
                <Text style={{paddingLeft: 10, color: '#999'}}>Loading</Text>
            </View>
        )
    }

    onFocus(focus) {
        this.animateSelected(focus);
        this.setState({focus})
    }

    renderChildren() {
        const {error, onChange, label, required, name, children, ...rest} = this.props;
        const childrenProps = {
            ...rest,
            onChange: this.onChange,
            values: this.state.values,
            loading: this.state.loading,
            onFocus: (focus) => this.onFocus(focus)
        };

        return (
            <View>
                {children(childrenProps)}
            </View>
        )
    }

    onLayout = (event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        this.setState({layoutWidth: width})
    }

    renderLabel(label, required) {

        if (this.props.label) {
            return (
                <Animated.View style={{marginBottom:10,}}>
                    <Animated.Text style={{
                        fontSize: 12,
                        fontWeight: '800',
                        color: this.props.labelColor || '#000',
                    }}>{required && (<Text
                        style={{color: 'red', fontSize: 13, fontWeight: 'bold'}}>* </Text>)}{label.toUpperCase()}</Animated.Text>

                </Animated.View>
            )
        }
    }

    render() {


        let {label, required, error} = this.props;
        let color = '#eee';
        let focus = this.state.focus;

        if (error) {
            color = 'red';
        }

        if (this.props.ignoreWrapper) {
            return this.renderChildren();
        }

        return (
            <View onLayout={this.onLayout} ref="welcome" style={{
                backgroundColor: focus ? 'transparent' : 'transparent',
                width: null,
                borderRadius: 0,
                marginTop: 10,
                marginBottom: 10,
                zIndex:9999,

            }}>
                {this.renderLabel(label, this.props.required)}
                <View style={{backgroundColor:'#FFF', padding:10, borderRadius:5,}}>
                    {this.state.loading && !this.props.ignoreLoading ? this.renderLoading() : this.renderChildren(this.props)}

                </View>
                {
                    error ? <Text
                        style={{paddingTop: 5, color: 'red', textAlign: 'left', fontSize: 12}}>{error}</Text> : null
                }



            </View>
        )
    }
}
