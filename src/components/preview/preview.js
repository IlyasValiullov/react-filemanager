import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { getCurrentFilePath, getSelectedFile, getNode, isFolder } from "../../store/tree/reducer";
import { FilePreview, FolderPreview } from '.';
import UploaderPanel from 'components/uploader/uploader';
import './preview.css';

class Preview extends Component {

    constructor(props) {
        super(props);
        // this.setState({
        //     showUploadPanel: false
        // })
    }

    // uploadFiles = () => {
    //     // this.isUpload = !this.isUpload;
    //     this.setState({
    //         showUploadPanel: !this.state.showUploadPanel
    //     })
    // }
    //
    // hideUploadPanel = () => {
    //     this.setState({
    //         showUploadPanel: false
    //     })
    //     // this.isUpload = false;
    // }

    closeWindow = () => {
        // console.log('close clicked');
        if (typeof this.props.closeFileManager === 'function') {
            // console.log('is function');
            this.props.closeFileManager();
        }
    };



    render() {
        // const { faq_list } = this.props;
        // console.log("currentFilePath", this.props.currentFilePath);
        // console.log("selectedFile", this.props.selectedFile);
        console.log('Preview: showUploadPanel', this.props.showUploadPanel);
        return (
            <div className="preview col-9">
                <h1>{this.props.selectedFile}</h1>
                <h1>{this.props.currentFilePath}</h1>
                {/*<img src="https://imagejournal.org/wp-content/uploads/2018/04/6476778709_fbb520cc80_o-300x225.jpg"/>*/}

                <div className="preview_content">


                    <div className="content_grow">
                        { this.props.isFolder ? <FolderPreview /> : <FilePreview /> }
                    </div>

                    <div className="content_footer">
                        { this.props.showUploadPanel ? <UploaderPanel /> : null }
                    </div>


                </div>

            </div>
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
        isFolder: isFolder(state.tree)
    }
}

export default connect(mapStateToProps)(Preview);

    // file-preview-menu(v-if="selectedIsFile")
    // folder-preview-menu(v-if="selectedIsFolder" @uploadFiles="uploadFiles")
    // v-layout(class="preview_content")
    //   div(class='content_grow')
    //     folder-preview(v-if="openedIsFolder" )
    //     <!--textfile-preview(v-if="!isUpload && openedIsFile" )-->
    //     file-preview(v-if="!isUpload && openedIsFile" )
    //   div(class='content_footer')
    //     dropzone-uploader(v-if="isUpload" @hideUploadPanel="hideUploadPanel")