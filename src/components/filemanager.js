import React, { Component } from 'react';
// const { PropTypes }  = React;
import PropTypes from 'prop-types';
import './filemanager.css';
import { Tree } from './tree';
import { Preview } from './preview';
import { connect } from 'react-redux';
// import * as types from "../store/tree/actionTypes";
import * as types from "../store/aws/actionTypes";

class FileManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUploadPanel: false
        };
    }

    componentDidMount(){
        this.props.dispatch({ type: types.FILEMANAGER_MOUNTED, node: this.props.auth_url });
    };

    closeWindow = () => {
        // console.log('close clicked');
        if (typeof this.props.closeFileManager === 'function') {
            // console.log('is function');
            this.props.closeFileManager();
        }
    };

    setShowUploadPanel = () => {
        this.setState({
            showUploadPanel: !this.state.showUploadPanel
        })
    };

    hideUploadPanel = () => {
        this.setState({
            showUploadPanel: false
        })
    };

    render() {
        // const { faq_list } = this.props;
        console.log("state", this.state);
        return (
            <div id="myModal" className="my_modal">
                <div className="my-modal-content">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button">
                                Select
                            </button>

                            <button type="button">
                                Refresh
                            </button>

                            <button type="button" onClick={this.setShowUploadPanel}>
                                Upload
                            </button>

                            <button type="button" className="close">
                                <span className="close" onClick={this.closeWindow}>&times;</span>
                            </button>
                            {/*<div className="container-fluid">*/}
                            {/*<div className="navbar-header">*/}
                            {/*<a className="navbar-brand" href="#">*/}
                            {/*<h3>Bob</h3>*/}
                            {/*</a>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="modal-body">
                            <div className="layout row">
                                <Tree className="flex"/>
                                <Preview className="flex"
                                         setShowUploadPanel={this.setShowUploadPanel}
                                         hideUploadPanel={this.hideUploadPanel}
                                         showUploadPanel={this.state.showUploadPanel}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    //         <div className = "modal-content" >
    //         <div className = "modal-header" >
    //         < button
    //     type = "button"
    //     className = "close"
    //     data - dismiss = "modal"
    //     aria - label = "Close" >
    //         < span
    //     aria - hidden = "true" > & times;
    // </span>
    // </button>
    //     <h3 className="modal-title">New Product Alert!</h3>
    // </div>
    //     <div className="modal-body">
    //         <h4>Codebrainery Wizard</h4>
    //         <p>Sign up today for tons of new, in-depth web development training, and live support from our team of
    //             Codebrainery CodeGuides.</p>
    //     </div>
    //     <div className="modal-footer">
    //         <button type="button" className="btn btn-primary">Try it now</button>
    //         <button type="button" className="btn btn-secondary" data-dismiss="modal">Maybe later</button>
    //     </div>
    // </div>

            // <div>
            //     <h1>File manager</h1>
            //     <img src="https://imagejournal.org/wp-content/uploads/2018/04/6476778709_fbb520cc80_o-300x225.jpg"/>
            // </div>
        );
    }
}

// FileManager.propTypes = {
//     closeFileManager: PropTypes.func
// };

export default connect()(FileManager);