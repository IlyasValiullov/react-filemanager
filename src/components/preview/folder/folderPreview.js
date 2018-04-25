import React, { Component } from 'react';
import {connect} from "react-redux";
import { getCurrentFilePath, getSelectedFile, getNode, isFolder } from "../../../store/tree/reducer";
import './folderPreview.css'

class FolderPreview extends Component {

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
            <div className="grid-list-md text-xs-center" >
                {/*<div className={"autosize"}>*/}
                    {/*<img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/folder-icon.png"/>*/}
                {/*</div>*/}
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

export default connect(mapStateToProps)(FolderPreview);

  // v-container(fluid class="grid-list-md text-xs-center" @click="unselect")
  //   v-layout(row wrap)
  //     v-flex(xs2
  //         v-for="file in this.files"
  //         :key="file.value.name"
  //         @click="select(file)"
  //         @dblclick="open(file)"
  //         v-bind:class="{'icon-selected': file.selected}"
  //       )
  //       v-layout(column)
  //         v-icon(class="material-icons icon icon-custom-size") {{getIcon(file.value)}}
  //         div(class="icon-container")
  //           span(class="icon-title") {{file.value.name}}







