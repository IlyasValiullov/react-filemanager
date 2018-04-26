'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reduce;
exports.getCredentials = getCredentials;
exports.getBucket = getBucket;
exports.getAwsHost = getAwsHost;

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var intitialState = (0, _seamlessImmutable2.default)({

    credentials: {
        access_key_id: "",
        secret_access_key: "",
        session_token: ""
    },
    auth_url: ""

});

function reduce() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intitialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    console.log("action", action);
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

function getCredentials(state) {
    return state.credentials;
}

function getBucket(state) {
    console.log("getBucket", state);
    return state.credentials.bucket;
}

function getAwsHost(state) {
    console.log("getAwsHost", state);
    return 'http://' + getBucket(state) + '.s3.amazonaws.com/';
}