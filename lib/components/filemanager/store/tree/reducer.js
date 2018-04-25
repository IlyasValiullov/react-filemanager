'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reduce;
exports.getSelectedNode = getSelectedNode;
exports.getCurrentFilePath = getCurrentFilePath;
exports.getSelectedFile = getSelectedFile;
exports.getNode = getNode;
exports.getDirs = getDirs;
exports.isFolder = isFolder;
exports.getNodeAwsUrl = getNodeAwsUrl;

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

var _reducer = require('../aws/reducer');

var awsSelectors = _interopRequireWildcard(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var intitialState = (0, _seamlessImmutable2.default)({
    dirs: [{
        id: null,
        path: 's3/',
        name: 's3',
        isFolder: true,
        opened: false,
        children: [{
            id: 0,
            path: "/images/",
            name: "Images",
            isFolder: true,
            children: [{
                id: 3,
                path: "/images/1.png",
                name: "1.png",
                isFolder: false
            }, {
                id: 4,
                path: "/images/2.png",
                name: "2.png",
                isFolder: false
            }]
        }, {
            id: 1,
            path: "/hotel.png",
            name: "hotel.png",
            isFolder: false
        }, {
            id: 2,
            path: "/bob.png",
            name: "bob.png",
            isFolder: false
        }]
    }],
    currentFilePath: '/',
    selectedFile: null,
    node: {
        id: null,
        name: '/',
        path: '/',
        isFolder: true,
        opened: false,
        children: []
    }
});

function reduce() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intitialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // console.log(action.type, action);
    switch (action.type) {
        case types.DIRS_FETCHED:
            return state.merge({
                dirs: action.dirs
                // postsById: action.postsById
            });
        case types.FOLDER_SELECTED:
            var selectedFile = action.node.path;
            return state.merge({
                node: action.node,
                selectedFile: selectedFile
            });
        case types.FILE_SELECTED:
            var newState = state.merge({
                node: action.node,
                selectedFile: action.node.path //(action.node.isFolder) ? null : (
            });
            // console.log("selectedFile:", newState.selectedFile);
            return newState;

        case types.FILE_OPENED:
            return state.merge({
                node: action.node,
                currentFilePath: action.node.path
            });

        case types.FOLDER_OPENED:
            return state.merge({
                node: action.node,
                currentFilePath: action.node.path
            });

        // open_file(state, node) {
        // state.node = node;
        // if (node.isFolder) {
        //     state.node.opened = true;
        // }
        // state.currentFilePath = node.path;

        default:
            return state;
    }
};

// selectors

function getSelectedNode(state) {
    return state.selectedNode;
}

function getCurrentFilePath(state) {
    return state.currentFilePath;
}

function getSelectedFile(state) {
    return state.selectedFile;
}

function getNode(state) {
    return state.node;
}

function getDirs(state) {
    return state.dirs;
}

function isFolder(state) {
    return state.node.isFolder;
}

function getNodeAwsUrl(state) {
    return '' + awsSelectors.getAwsHost(state.aws) + getCurrentFilePath(state.tree);
}

//
// export function getSelectedTopicUrls(state) {
//     return state.topics.selectedTopicUrls;
// }
//
// export function getSelectedTopicsByUrl(state) {
//     return _.mapValues(_.keyBy(state.topics.selectedTopicUrls), (topicUrl) => state.topics.topicsByUrl[topicUrl]);
// }
//
// export function isTopicSelectionValid(state) {
//     return state.topics.selectedTopicUrls.length === 3;
// }
//
// export function isTopicSelectionFinalized(state) {
//     return state.topics.selectionFinalized;
// }