import React, { Component } from 'react';
import {connect} from "react-redux";
// import './folderPreview.css'
import Dropzone from 'react-dropzone'
import * as treeActions from 'store/tree/actions';
import { getCurrentFilePath } from "store/tree/reducer";

class UploaderPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: null
        }
    }

    // closeWindow = () => {
    //     console.log('close clicked');
    //     if (typeof this.props.closeFileManager === 'function') {
    //         console.log('is function');
    //         this.props.closeFileManager();
    //     }
    // };

    onDrop = (files) => {
        console.log('files', files);
        this.setState({
            files
        });
    };

    mount() {
        console.log("mount uploader panel");
    }

    renderDropFiles(){
        console.log('state', this.state);
        if(this.state.files){
            return (
                <ul>
                    { this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                </ul>
            )
        }
    }

    uploadFile = () => {
        console.log("upload file");
        this.props.dispatch(treeActions.uploadFiles(this.props.currentFilePath, this.state.files));
    }

    render() {
        // const { faq_list } = this.props;
        // console.log("currentFilePath", this.props.currentFilePath);
        // console.log("selectedFile", this.props.selectedFile);
        return (
            <section>
                <div className="uploader">
                    <Dropzone onDrop={this.onDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                    <aside>
                        <h2>Dropped files</h2>
                        { this.renderDropFiles() }
                    </aside>
                    <button onClick={this.uploadFile}>Save</button>
                    {/*<MyDropzone />*/}
                </div>
            </section>
            // <div className="grid-list-md text-xs-center" >
            //     <div className={"autosize"}>
            //         <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/folder-icon.png"/>
            //     </div>
            // </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        currentFilePath: getCurrentFilePath(state.tree)
    }
}

export default connect(mapStateToProps)(UploaderPanel);
// export default UploaderPanel;