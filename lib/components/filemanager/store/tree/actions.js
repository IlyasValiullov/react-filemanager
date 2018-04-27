'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetchDirs = fetchDirs;
exports.deleteFile = deleteFile;
exports.moveFile = moveFile;
exports.readFile = readFile;
exports.uploadFiles = uploadFiles;
exports.updateDirs = updateDirs;
exports.selectNode = selectNode;
exports.openNode = openNode;

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _actions = require('../aws/actions');

var awsActions = _interopRequireWildcard(_actions);

var _aws = require('../../services/aws');

var _aws2 = _interopRequireDefault(_aws);

var _seamlessImmutable = require('seamless-immutable');

var _seamlessImmutable2 = _interopRequireDefault(_seamlessImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function fetchDirs() {
    var _this = this;

    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    // console.log("Actions: fetchDirs");
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            try {
                                // const service_promise = new Promise();
                                dispatch(awsActions.checkCredentials()).then(function () {
                                    // console.log("Credentials checked");
                                    return _aws2.default.awsListing(getState(), path);
                                }).then(function (result) {
                                    // console.log("result", result);
                                    return dispatch(updateDirs(path, result));
                                    // }).then((dirs) => {
                                    //     return dispatch()
                                }).catch(function (error) {
                                    console.log("error", error);
                                });

                                // const dirs = await
                                // const dirs = [];
                                // dispatch({ type: types.DIRS_FETCHED, dirs })
                            } catch (error) {
                                console.error(error);
                            }

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
}

// export function fetchFile(path = "") {
//     // console.log("Actions: fetchDirs");
//     return async(dispatch, getState) => {
//         try {
//             // const service_promise = new Promise();
//             dispatch(awsActions.checkCredentials()).then(() => {
//                 // console.log("Credentials checked");
//                 return awsService.awsGetFile(getState(), path);
//             }).then((result) => {
//                 console.log("fetchFile", result);
//                 return null;
//                 // return dispatch(updateDirs(path, result));
//                 // }).then((dirs) => {
//                 //     return dispatch()
//             }).catch((error) => {
//                 console.log("error",error)
//             });
//
//             // const dirs = await
//             // const dirs = [];
//             // dispatch({ type: types.DIRS_FETCHED, dirs })
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }

// uploadFiles(context, files) {
//     const promises = [];
//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         promises.push(
//             context.dispatch('readFile', file)
//                 .then(
//                     (result) => context.dispatch('checkCredentials')
//                     .then(
//                         () => context.dispatch('awsUploadFile',
//                             { buffer: result, name: file.name, type: file.type })
//                     )
//                 )
//         );
//     }
//     return Promise.all(promises).then(() => context.dispatch('updateNode', context.state.currentFilePath));
// }

function deleteFile(selectedNode) {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            try {
                                dispatch(awsActions.checkCredentials()).then(function () {
                                    // return awsActions.checkCredentials().then(() => {
                                    return _aws2.default.awsDeleteFile(getState(), selectedNode.path);
                                    // }).catch(()=> {
                                    //     console.log("All error");
                                }).then(function () {
                                    return dispatch(fetchDirs());
                                }).catch(function (err) {
                                    console.log("err", err);
                                });
                            } catch (error) {
                                console.log(error);
                            }

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x4, _x5) {
            return _ref2.apply(this, arguments);
        };
    }();
}

function moveFile(newPath, openedNode) {
    var _this3 = this;

    return function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            try {
                                // check creds

                                // copy file on aws
                                // delete file on aws

                                console.log(newPath, openedNode);
                                // refresh tree
                                dispatch(awsActions.checkCredentials()).then(function () {
                                    // return awsActions.checkCredentials().then(() => {
                                    return _aws2.default.awsMoveFile(getState(), openedNode.path, newPath);
                                    // }).catch(()=> {
                                    //     console.log("All error");
                                }).then(function () {
                                    return dispatch(fetchDirs());
                                }).catch(function (err) {
                                    console.log("err", err);
                                });
                            } catch (error) {
                                console.log(error);
                            }

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }));

        return function (_x6, _x7) {
            return _ref3.apply(this, arguments);
        };
    }();
}

function readFile(file) {
    return new Promise(function (resolve, reject) {
        var fr = new FileReader();
        fr.onload = function () {
            resolve(fr.result);
        };
        fr.readAsArrayBuffer(file);
    });
}

function uploadFiles(path, files) {
    var _this4 = this;

    // console.log("Actions->uploadFiles", files);

    return function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            var file;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:

                            try {
                                file = files[0];

                                // const promises = files.map((file) => {
                                // console.log("dispatch", dispatch);
                                // return dispatch(readFile(file)).then((result) => {

                                dispatch(awsActions.checkCredentials()).then(function () {
                                    // return awsActions.checkCredentials().then(() => {
                                    return _aws2.default.awsUploadFile(getState(), { buffer: file, name: file.name, type: file.type });
                                    // }).catch(()=> {
                                    //     console.log("All error");
                                }).catch(function (err) {
                                    console.log("err", err);
                                });
                            } catch (error) {
                                console.error(error);
                            }
                            // });

                            // for (let i = 0; i < files.length; i++) {
                            //     const file = files[i];
                            //     promises.push(
                            //         // dispatch('readFile', file)
                            //
                            //     );
                            // }

                            // console.log("promises complected");
                            // return Promise.all(promises).then(() => {
                            //     console.log("All handled");
                            //     dispatch('openNode', path)
                            // }).catch((err) => {
                            //     console.log("final error", err);
                            // });

                        case 1:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }));

        return function (_x8, _x9) {
            return _ref4.apply(this, arguments);
        };
    }();
}

function updateDirs(path, freshDirs) {

    var fillNodeByPath = function fillNodeByPath(currentNode, path, result) {
        // console.log("current_path", path);
        // const currentPath = path;
        // const paths = currentPath.split('/');
        // if (currentPath.charAt(0) === '/') {
        //     paths.shift();
        // }
        //
        // let currentFolder = paths.shift();
        // currentFolder += '/';
        // const childPath = paths.join('/');


        var createNewNode = true;
        // if (open) {
        //     currentNode.opened = true;
        // }
        // if currentNode =
        // console.log(currentFolder, currentNode);


        // console.log('name', node.name)
        // console.log('currentFolder', currentFolder)
        // console.log('node.isFolder', node.isFolder)
        // console.log("node.name === currentFolder && node.isFolder", node.name === currentFolder && node.isFolder)


        // Current level
        if (currentNode.path === path && currentNode.isFolder) {
            return currentNode.merge({ children: result });
        }

        // go deeper
        var deeper_level = currentNode.children.filter(function (node) {
            return path.startsWith(node.path) && node.isFolder;
        });

        console.log("go deeper");
        // Go deeper
        // res.reduce((resultState, value) => {
        //     resultState.setIn(
        //         ["dirs", state.dirs.indexOf(value).toString()],
        //         fillNodeByPath(value, childPath, freshDirs))
        // }, currentNode);

        var refreshedChildren = deeper_level.map(function (node) {
            return fillNodeByPath(node, path, freshDirs);
        });

        // console.log("level ", path);
        // console.log("refreshedChildren ", refreshedChildren);

        return currentNode.merge({ children: [].concat(_toConsumableArray(currentNode.children.filter(function (x) {
                return !deeper_level.includes(x);
            })), _toConsumableArray(refreshedChildren)) });

        // const current_level = currentNode.children.filter(
        //     (node) => {
        //         return path.startsWith(node.path) && path === node.path && node.isFolder
        //     });

        // console.log("res", res);
        // go to deep level
        // console.log("childPath", childPath);
        // console.log("go deeper?", res.length);
        // console.log("filter", res);
        // if(deeper_level.length > 0) {
        //     console.log("go deeper")
        //         // Go deeper
        //         // res.reduce((resultState, value) => {
        //         //     resultState.setIn(
        //         //         ["dirs", state.dirs.indexOf(value).toString()],
        //         //         fillNodeByPath(value, childPath, freshDirs))
        //         // }, currentNode);
        //
        //     const refreshedChildren = deeper_level.map((node) => {
        //         return fillNodeByPath(node, path, freshDirs);
        //     });
        //
        //     console.log("level ", path);
        //     console.log("refreshedChildren ", refreshedChildren);
        //
        //     return currentNode.merge({children: [
        //         ...currentNode.children.filter(x => !res.includes(x)),
        //         ...refreshedChildren
        //     ]});

        // return currentNode.merge({
        //     children: [fillNodeByPath()
        // });


        // } else if (current_level.length > 0) {
        //     // replace file/folder on this level
        //     console.log("replace file/folder on this level", currentNode);
        //     // console.log(result);
        //     // console.log(currentNode.merge({ children: result }));
        //     console.log('currentNode', currentNode);
        //
        //     // return currentNode.merge({ children: [
        //     //     ...currentNode.children.filter(x => !res.includes(x)),
        //     //     ...res.map((node) => {
        //     //         return node.merge({ children: result });
        //     //     })
        //     // ]});
        //
        //     return currentNode.merge({ children: result });
        // }

        // if(createNewNode){
        //     // append file/folder on this level
        //     console.log("append file/folder on this level");
        //     return currentNode.merge({ children: [...currentNode.children, result] });
        // }

        // append file/folder on this level
        // currentNode.children.forEach((element) => {
        //     if (element.name === currentFolder &&
        //         element.isFolder) {
        //         // Go deeper
        //         if (childPath) {
        //             fillNodeByPath(element, childPath, result);
        //             createNewNode = false;
        //         } else {
        //             element.children = [];
        //             element.children = element.children.concat(result.children);
        //             createNewNode = false;
        //         }
        //     }
        // });
        // if (createNewNode) {
        //     currentNode.children.push(result);
        // }
        // return currentNode;
    };

    // refresh button
    if (path === '') {
        return function (dispatch, getState) {
            var state = (0, _seamlessImmutable2.default)(getState().tree);
            // console.log("first level");
            dispatch({
                type: types.DIRS_FETCHED,
                dirs: freshDirs
            });
        };
    } else {

        // const paths = path.split('/');
        // const rootElementPath = paths.shift().concat("/");
        // const childPath = paths.join('/');
        // console.log("path", path);

        // console.log("HERE");
        // res.reduce((resultState, value) => {
        return function (dispatch, getState) {
            var state = (0, _seamlessImmutable2.default)(getState().tree);
            // console.log("HERE");
            // console.log("State tree", getState().tree);
            var res = state.dirs.filter(function (node) {
                // console.log("node.path", node.path)
                // console.log("rootElementPath", rootElementPath)
                return path.startsWith(node.path);
            });

            // console.log("res empty", res.length);

            // if(childPath) {
            var refreshedChildren = res.map(function (node) {
                return fillNodeByPath(node, path, freshDirs);
            });

            dispatch({
                type: types.DIRS_FETCHED,
                dirs: [].concat(_toConsumableArray(state.dirs.filter(function (x) {
                    return !res.includes(x);
                })), _toConsumableArray(refreshedChildren))
                // resultState.setIn(
                // ["dirs", state.dirs.indexOf(value).toString()],
                // fillNodeByPath(value, childPath, freshDirs))
            });
            // }
            // else {
            //     dispatch({
            //         type: types.DIRS_FETCHED,
            //         dirs: [
            //             ...freshDirs
            //         ]
            //         // resultState.setIn(
            //         // ["dirs", state.dirs.indexOf(value).toString()],
            //         // fillNodeByPath(value, childPath, freshDirs))
            //     })
            // }
        };
        // }, state);
        // } else {
        //     // TODO: create new
        // }
        // state.dirs.forEach((rootElement) => {
        //     if(rootElement.path == rootElementPath){
        //         fillNodeByPath(rootElement, childPath, result);
        //     }
    }

    // state.setIn(["dirs", ])
    // }

    // console.log("path", path)
    // console.log("result", result)
    // return async(dispatch, getState) => {
    //     try {
    //         dispatch({type: types.DIRS_FETCHED, dirs: result});
    //         console.log("result", result);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const fillNode = function (result) {
    //     if (result.path === 'test/') {
    //         state.dirs[0].childrens = [];
    //         state.dirs[0].childrens = state.dirs[0].childrens.concat(result.childrens);
    //         if (open) {
    //             state.dirs[0].opened = true;
    //         }
    //     } else {
    //         const paths = result.path.split('/');
    //         paths.shift();
    //         const childPath = paths.join('/');
    //         fillNodeByPath(state.dirs[0], childPath, result);
    //     }
    // };
    // fillNodeByPath(result);
}

function selectNode(file) {
    // console.log("action: selectFile", file);
    if (file.isFolder) {
        return { type: types.FOLDER_SELECTED, node: file };
    } else {
        // console.log("types.FILE_SELECTED")
        return { type: types.FILE_SELECTED, node: file };
    }
}

function openNode(file) {
    if (file.isFolder) {
        return function (dispatch) {
            dispatch(fetchDirs(file.path));
            dispatch({ type: types.FOLDER_OPENED, node: file });
        };
    } else {
        return function (dispatch) {
            // dispatch(fetchFile(file.path));
            dispatch({ type: types.FILE_OPENED, node: file });
        };
    }
}

// export function openFile(node) {
//     if (node.isFolder && !node.opened) {
//         return
//     }
//     return ({ type: types.FOLDER_SELECTED, node: node });
// }


// openFile(context, model) {
//     if (model.isFolder && !model.opened) {
//         return context.dispatch('updateNode', model.path).then((result) => {
//             context.commit('update_dirs', { model, result });
//         }).then(() => {
//             context.commit('open_file', model);
//         });
//     }
//     context.commit('select_file', null);
//     return context.commit('open_file', model);
// },