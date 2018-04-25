import React, { Component } from 'react';
// import 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as treeActions from '../../store/tree/actions';
// import autoBind from 'react-autobind';

import './item.css';

class Item extends Component {

    constructor(props) {
        super(props);
        // autoBind(this);
    }

    model = () => {
        return this.props.model;
    };

    is_open = () => {
        return this.model().opened;
    };

    item_icon = () => {
        if (this.model().isFolder) {
            if (this.is_open()) {
                return 'folder_open';
            }
            return 'folder';
        }
        return 'insert_drive_file';
    };

    toggle = () => {
        this.props.selectFile(this.model());
    };

    doubleClick = () => {
        this.props.openFile(this.model())
    }

    toggle_icon = () => {
        this.isOpen = !this.isOpen;
    };

    // select = () => {
    //     this.$store.dispatch('openFile', this.model);
    // };
    // btnGroupClasses = classNames(
    //     'btn-group',
    //     'pull-right',
    //     {
    //         'show': this.props.showBulkActions,
    //         'hidden': !this.props.showBulkActions
    //     }
    // );

    // renderItems = () => {
    //     return this.state.dirs.map((item, index) => (
    //         <Item className="item" key={ item.id } model=item />
    //     ));
    // };

    renderItems = () => {

        // console.log(this.props)
        if (this.props.model.hasOwnProperty('children')){
            return this.props.model.children.map((item, index) => (
                <Item className="item" key={item.id} openFile={this.props.openFile} selectFile={this.props.selectFile} model={item}/>
            ));
        }
    };

    render() {
        let model = this.props.model;
        // console.log('model', this.props.model);
        return (
            <li className="first_child_margin">
                <div className="wrapper">
                    <i className="material-icons icon">{ this.item_icon() }</i>
                    <span className="item-text noselect" onDoubleClick={this.doubleClick} onClick={this.toggle}>{model.name}</span>
                </div>
                <ul className="item" >
                    { this.renderItems() }
                </ul>
            </li>
        );
    }
}

//li(v-bind:class="{'item--active': isSelected}" )
// div( class="wrapper")
// v-icon(@click="toggle_icon") {{item_icon}}
// span(@click="toggle" class="item-text") {{model.name}}
// ul(class="item" v-show="this.isOpen")
// dir-item(class="item"  v-for="model_children in model.childrens" :key="model_children.name" :model="model_children")

// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators(treeActions, dispatch) }
// }

// const mapDispatch = (dispatch) => {
//     let boundActionCreators = bindActionCreators({ treeActions });
//     return {...boundActionCreators, dispatch};
// }
// null, mapDispatch

// const mapDispatch = (dispatch) => {
//     let a = 1;
//     return {
//         dispatch,
//         bob: {}
//     }
// }

export default connect()(Item)