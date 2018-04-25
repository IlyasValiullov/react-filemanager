import React, { Component } from 'react';
import {connect} from "react-redux";
import { getCurrentFilePath, getSelectedFile, getNode, isFolder, getNodeAwsUrl } from "../../../store/tree/reducer";
import './filePreview.css'

class FilePreview extends Component {

    // closeWindow = () => {
    //     console.log('close clicked');
    //     if (typeof this.props.closeFileManager === 'function') {
    //         console.log('is function');
    //         this.props.closeFileManager();
    //     }
    // };

    render() {
        // const { faq_list } = this.props;
        // console.log("currentFilePath", this.props.currentFilePath);
        // console.log("selectedFile", this.props.selectedFile);
        return (
            <img className={"autosize"} src={this.props.nodeUrl}/>
        );
    }
}

function mapStateToProps(state) {
    // console.log("MapStateToProps");
    // console.log("selected file", getSelectedFile(state.tree));
    // console.log("state", state);
    return {
        // selectedNode: treeSelectors.getSelectedNode(state),
        currentFilePath: getCurrentFilePath(state.tree),
        selectedFile: getSelectedFile(state.tree),
        node: getNode(state.tree),
        isFolder: isFolder(state.tree),
        nodeUrl: getNodeAwsUrl(state)
    }
}

export default connect(mapStateToProps)(FilePreview);