import React from 'react';
import TextInput from './TextInput';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import ImageInput from './ImageInput';
import AutoCompleteInput from "./AutoCompleteInput";
import CheckBoxInput from "./CheckBoxInput";
import DateRangeInput from "./DateRangeInput";
import Slider from "./Slider";

import Header from "./Header";

export default function (type) {
    if (type === 'text') {
        return [TextInput, {}];
    }
    if (type === 'radio') {
        return [RadioInput, {hideLine: true}]
    }

    if (type === 'select') {
        return [SelectInput, {}];
    }

    if (type === 'date-range') {
        return [DateRangeInput, {}];
    }

    if (type === 'date') {
        return [DateInput, {}];
    }

    if (type === 'image') {
        return [ImageInput, {ignoreLoading: true}];
    }

    if (type === 'checkbox') {
        return [CheckBoxInput, {hideLine: true}];
    }

    if (type === 'autocomplete') {
        return [AutoCompleteInput, {}];
    }

    if (type === 'slider') {
        return [Slider, {}];
    }

    if (type === 'header') {
        return [Header, {ignoreWrapper: true}];
    }

    console.log('Invalid input type ' + type);
    return null;

}