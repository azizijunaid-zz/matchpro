import React, { Component } from 'react';
import { TextInput } from 'react-native';
import DateRangePicker from './DateRange';

import InputWrapper from './InputWrapper';


export default class extends Component {
  state = {
    focus: false,
  }


  componentDidMount() {
    this.props.onChange(this.props.value)
  }

  render() {
    return (
      <DateRangePicker
        initialRange={this.props.value}
        onSuccess={(s, e) => {
          let dateObject = [s, e];
          this.props.onChange(dateObject)
        }}
        theme={{ markColor: this.props.primaryColor || '#ccc', markTextColor: 'white' }} />


    )
  }

}