import axios from 'axios'
import {API_URL} from '../config'

import {Navigation} from 'react-native-navigation';
import {store} from "./store";

const client = axios.create({
    baseURL: API_URL
});

const codeMessage = {
    200: 'Request successful',
    201: 'Resource created',
    202: 'Request has been queued for processing',
    204: 'Data deleted successfully',
    400: 'There was an error in the request. No modifications were done to the data',
    401: 'User is not authorized',
    403: 'User is authorized but does not have permission for the action',
    404: 'Record does not exist',
    406: 'Requested format not available',
    410: 'The requested resource is permanently deleted and will no longer be available',
    422: 'A validation error occurred while creating an object',
    500: 'here was an error in the server. Please retry or inform the administrator',
    502: 'The gateway is wrong',
    503: 'Service is unavailable, the server is temporarily overloaded or maintained',
    504: 'The gateway timed out',
};


/**
 * Given a request error object build a form error
 *
 * @param json
 */
function buildFormError(json) {

    if (!json || json.errorCode !== 'VALIDATION_ERROR') {
        return null;
    }

    const out = {};
    Object.keys(json.data).forEach(key => {
        if (Array.isArray(json.data[key])) {
            out[key] = json.data[key].join(', ');
        } else {
            out[key] = json.data[key];
        }
    });

    return out;
}

/**
 * Given a form errors object return a string of the errors
 *
 * @param formErrors
 */
function buildFormErrorMessage(formErrors) {
    if (!formErrors) {
        return null;
    }

    return Object.keys(formErrors)
        .map(key => {
            return `${key}: ${formErrors[key]}`;
        })
        .join(', ');
}


function checkStatus(response, json) {


    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const errorMessage = json.message || codeMessage[response.status];
    const errorCode = json.errorCode || `${response.status}`;
    const errorName = json.errorCodeText || errorCode;

    // validation errors are handled separately
    if (errorCode !== 'VALIDATION_ERROR') {

    } else {

    }

    const error = new Error(errorMessage);

    error.code = errorCode;
    error.ref = json && json.errorRef;
    error.name = errorName;
    error.response = response;
    error.json = json;
    error.formErrors = buildFormError(json);
    error.formErrorMessage = buildFormErrorMessage(error.formErrors);
    error.ts = json.ts;

    throw error;
}


/**
 * Request Wrapper with default success/error actions
 */
const request = async function (options) {
    const session =  store.getState().user.userSession;

    let token = "";
    if(session){
        token = session.token;
    }

    try {
        if (!options.headers) {
            options.headers = {};
        }
        if (token && token.length > 0) {
            options.headers['CB-Token'] = token;
        }

        console.log(options);

        const response = await client(options);
        return response.data;
    } catch (e) {
        console.error(e.response.data)
        checkStatus(e.response, e.response.data);
        if (e.response) {
            throw e.response.data;
        }

        // something else happened (not standard API error)
        //console.error('Error Message: ', e.message);

        throw (e.response || e.message);
    }


};

export default request;