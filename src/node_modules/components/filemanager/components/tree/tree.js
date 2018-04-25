import React, { Component } from 'react';
import { Item } from '.';
import './tree.css'
import { connect } from 'react-redux';
import * as treeActions from 'store/tree/actions';
import { getDirs } from "store/tree/reducer";

class Tree extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.updateTree();
    }
        // this.state = {
            // dirs: [
            //     {
            //         id: null,
            //         path: 's3/',
            //         name: 's3',
            //         isFolder: true,
            //         opened: false,
            //         children: [
            //             {
            //                 id: 0,
            //                 path: "/images/",
            //                 name: "Images",
            //                 isFolder: true,
            //                 children: [
            //                     {
            //                         id: 3,
            //                         path: "/images/1.png",
            //                         name: "1.png",
            //                         isFolder: false
            //                     },
            //                     {
            //                         id: 4,
            //                         path: "/images/2.png",
            //                         name: "2.png",
            //                         isFolder: false
            //                     }
            //                 ]
            //             },
            //             {
            //                 id: 1,
            //                 path: "/hotel.png",
            //                 name: "hotel.png",
            //                 isFolder: false
            //             },
            //             {
            //                 id: 2,
            //                 path: "/bob.png",
            //                 name: "bob.png",
            //                 isFolder: false
            //             }
            //
            //         ]
            //     }
            // ]
        // };
    // }

    // closeWindow = () => {
    //     console.log('close clicked');
    //     if (typeof this.props.closeFileManager === 'function') {
    //         console.log('is function');
    //         this.props.closeFileManager();
    //     }
    // };

    updateTree = () => {
        // this.props.dispatch();
        // console.log("TreeComponent: updateTree");
        //this.props.dispatch()
        this.props.dispatch(treeActions.fetchDirs());
    };

    selectFile = (model) => {
        this.props.dispatch(treeActions.selectNode(model));
    };

    openNode = (model) => {
        this.props.dispatch(treeActions.openNode(model));
    };

    renderItems = () => {
        return this.props.dirs.map((item, index) => (
            <Item className="item" key={ item.id } openFile={this.openNode} selectFile={this.selectFile} model={ item }/>
        ));
    };

    render() {
        return (
            <ul className="scroll_list first_child_margin col-3">
                { this.renderItems() }
            </ul>
        );
    };
}

// FileManager.propTypes = {
//     closeFileManager: PropTypes.func
// };

function mapStateToProps(state) {
    return {
        // selectedNode: treeSelectors.getSelectedNode(state),
        dirs: getDirs(state.tree)
    }
}

export default connect(mapStateToProps)(Tree);
