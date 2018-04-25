import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const intitialState = Immutable({

    credentials: {
        access_key_id: "",
        secret_access_key: "",
        session_token: ""
    },
    auth_url: ""

});

export default function reduce(state = intitialState, action = {}) {
    // console.log("action", action);
    switch (action.type) {
        case types.CREDENTIALS_UPDATED:
            return state.merge({
                credentials: action.credentials
                // postsById: action.postsById
            });
        case types.FILEMANAGER_MOUNTED:
            return state.merge({
                auth_url: action.auth_url //"http://localhost:3000/api/v1/admin/aws_auth"
            });
        default:
            return state;
    }
};

// selectors

export function getCredentials(state) {
    return state.credentials;
}

export function getBucket(state) {
    return state.credentials.bucket;
}

export function getAwsHost(state) {
    return `http://${getBucket(state)}.s3.amazonaws.com/`;
}