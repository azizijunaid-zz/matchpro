import React from "react";
import {Text} from "react-native";

const MAIN_FONT = "#7444C0";
const HEADING_FONT = "#5636B8";

let oldRender = Text.render;
Text.render = function (...args) {
    let origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
        style: [{color: '#000', fontFamily: 'Gotham Rounded', fontWeight:"400"}, origin.props.style]
    });
};




export {MAIN_FONT, HEADING_FONT}