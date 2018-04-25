import * as types from './actionTypes';
import http from 'lib/http-config';


export function getCredentials() {
    // console.log("get creds");
    return async(dispatch, getState) => {
        try {
            const url = getState().aws.auth_url;
            const response = await http.post(url);
            // http.post("/aws_auth").then((response) => {
            //     dispatch({ type: types.CREDENTIALS_UPDATED, credentials: response.data });
            // });
            // console.log(response);
            dispatch({ type: types.CREDENTIALS_UPDATED, credentials: response.data });
        } catch (error) {
            console.error(error);
        }
    };
}

export function checkCredentials() {
    // console.log("check creds");
    return async(dispatch, getState) => {
        try {
            const state = getState();
            if (!state.aws.credentials.expiration || state.aws.credentials.expiration < Date.now()) {
                await dispatch(getCredentials());
            }
        } catch (error) {
            console.error(error);
        }
    };
}

// getCredentials(context) {
//     return http.post('/aws_auth').then((response) => {
//         if (response.status === 200) {
//             context.commit('save_credentials', response.data);
//         }
//     });
// },
// checkCredentials(context) {
//     if (!context.state.credentials.expiration || context.state.credentials.expiration < Date.now()) {
//         return context.dispatch('getCredentials');
//     }
// },