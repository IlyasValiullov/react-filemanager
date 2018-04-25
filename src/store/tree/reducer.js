import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

import * as awsSelectors from '../aws/reducer';

const intitialState = Immutable({
    dirs: [
        {
            id: null,
            path: 's3/',
            name: 's3',
            isFolder: true,
            opened: false,
            children: [
                {
                    id: 0,
                    path: "/images/",
                    name: "Images",
                    isFolder: true,
                    children: [
                        {
                            id: 3,
                            path: "/images/1.png",
                            name: "1.png",
                            isFolder: false
                        },
                        {
                            id: 4,
                            path: "/images/2.png",
                            name: "2.png",
                            isFolder: false
                        }
                    ]
                },
                {
                    id: 1,
                    path: "/hotel.png",
                    name: "hotel.png",
                    isFolder: false
                },
                {
                    id: 2,
                    path: "/bob.png",
                    name: "bob.png",
                    isFolder: false
                }

            ]
        }
    ],
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

export default function reduce(state = intitialState, action = {}) {
    // console.log(action.type, action);
    switch (action.type) {
        case types.DIRS_FETCHED:
            return state.merge({
                dirs: action.dirs
                // postsById: action.postsById
            });
        case types.FOLDER_SELECTED:
            let selectedFile = action.node.path;
            return state.merge({
                node: action.node,
                selectedFile: selectedFile,
            });
        case types.FILE_SELECTED:
            let newState = state.merge({
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

export function getSelectedNode(state) {
    return state.selectedNode;
}

export function getCurrentFilePath(state) {
    return state.currentFilePath;
}

export function getSelectedFile(state) {
    return state.selectedFile;
}

export function getNode(state) {
    return state.node;
}

export function getDirs(state) {
    return state.dirs;
}

export function isFolder(state) {
    return state.node.isFolder;
}

export function getNodeAwsUrl(state) {
     return `${awsSelectors.getAwsHost(state.aws)}${getCurrentFilePath(state.tree)}`;
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


