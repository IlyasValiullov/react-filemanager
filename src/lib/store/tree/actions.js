import * as types from './actionTypes';

import * as awsActions from 'store/aws/actions';

import awsService from 'services/aws';
import Immutable from "seamless-immutable";



export function fetchDirs(path = "") {
    // console.log("Actions: fetchDirs");
    return async(dispatch, getState) => {
        try {
            // const service_promise = new Promise();
            dispatch(awsActions.checkCredentials()).then(() => {
                // console.log("Credentials checked");
                return awsService.awsListing(getState(), path)
            }).then((result) => {
                // console.log("result", result);
                return dispatch(updateDirs(path, result));
            // }).then((dirs) => {
            //     return dispatch()
            }).catch((error) => {
                console.log("error",error)
            });

            // const dirs = await
            // const dirs = [];
            // dispatch({ type: types.DIRS_FETCHED, dirs })
        } catch (error) {
            console.error(error);
        }
    };
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


export function readFile(file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result);
        };
        fr.readAsArrayBuffer(file);
    });
}

export function uploadFiles(path, files){
    // console.log("Actions->uploadFiles", files);

    return async (dispatch, getState) => {

        try {
            const file = files[0];

            // const promises = files.map((file) => {
            // console.log("dispatch", dispatch);
            // return dispatch(readFile(file)).then((result) => {
            dispatch(awsActions.checkCredentials()).then(() => {
                // return awsActions.checkCredentials().then(() => {
                return awsService.awsUploadFile(getState(), {buffer: file, name: file.name, type: file.type})
                // }).catch(()=> {
                //     console.log("All error");
            }).catch((err) => {
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
    }
}

export function updateDirs(path, freshDirs) {



    const fillNodeByPath = function (currentNode, path, result) {
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



        let createNewNode = true;
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
        if(currentNode.path === path && currentNode.isFolder) {
            return currentNode.merge({ children: result });
        }


        // go deeper
        const deeper_level = currentNode.children.filter(
            (node) => {
                return path.startsWith(node.path)  && node.isFolder
            });

        console.log("go deeper")
        // Go deeper
        // res.reduce((resultState, value) => {
        //     resultState.setIn(
        //         ["dirs", state.dirs.indexOf(value).toString()],
        //         fillNodeByPath(value, childPath, freshDirs))
        // }, currentNode);

        const refreshedChildren = deeper_level.map((node) => {
            return fillNodeByPath(node, path, freshDirs);
        });

        // console.log("level ", path);
        // console.log("refreshedChildren ", refreshedChildren);

        return currentNode.merge({children: [
                ...currentNode.children.filter(x => !deeper_level.includes(x)),
                ...refreshedChildren
            ]});


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
        return (dispatch, getState) => {
            const state = Immutable(getState().tree);
            // console.log("first level");
            dispatch({
                type: types.DIRS_FETCHED,
                dirs: freshDirs
            })
        }
    } else {

        // const paths = path.split('/');
        // const rootElementPath = paths.shift().concat("/");
        // const childPath = paths.join('/');
        // console.log("path", path);

        // console.log("HERE");
        // res.reduce((resultState, value) => {
        return (dispatch, getState) => {
            const state = Immutable(getState().tree);
            // console.log("HERE");
            // console.log("State tree", getState().tree);
            const res = state.dirs.filter((node)=> {
                // console.log("node.path", node.path)
                // console.log("rootElementPath", rootElementPath)
                return path.startsWith(node.path)
            });

            // console.log("res empty", res.length);

            // if(childPath) {
                const refreshedChildren = res.map((node) => {
                    return fillNodeByPath(node, path, freshDirs);
                });

                dispatch({
                    type: types.DIRS_FETCHED,
                    dirs: [
                        ...state.dirs.filter(x => !res.includes(x)),
                        ...refreshedChildren
                    ]
                    // resultState.setIn(
                    // ["dirs", state.dirs.indexOf(value).toString()],
                    // fillNodeByPath(value, childPath, freshDirs))
                })
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

        }
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


export function selectNode(file) {
    // console.log("action: selectFile", file);
    if(file.isFolder){
        return({ type: types.FOLDER_SELECTED, node: file });
    } else {
        // console.log("types.FILE_SELECTED")
        return({ type: types.FILE_SELECTED, node: file });
    }
}

export function openNode(file) {
    if(file.isFolder){
        return ((dispatch) => {
            dispatch(fetchDirs(file.path));
            dispatch({ type: types.FOLDER_OPENED, node: file });
        })
    } else {
        return ((dispatch) => {
            // dispatch(fetchFile(file.path));
            dispatch({ type: types.FILE_OPENED, node: file });
        })
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