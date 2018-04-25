import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { FileManager } from './components';
import * as reducers from './store/reducers'

import 'bootstrap/dist/css/bootstrap.css';

const store = createStore(
    combineReducers(reducers),
    compose(applyMiddleware(thunk)), //, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

class ReactFileManager extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Provider store={store}>
                <FileManager closeFileManager={this.closeFileManager} auth_url={this.props.auth_url}/>
            </Provider>
        )
    }
}

export default ReactFileManager;