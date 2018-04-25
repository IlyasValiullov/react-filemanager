'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('../../store/tree/actions');

var treeActions = _interopRequireWildcard(_actions);

require('./item.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import 'classnames';

// import autoBind from 'react-autobind';

var Item = function (_Component) {
    _inherits(Item, _Component);

    function Item(props) {
        _classCallCheck(this, Item);

        // autoBind(this);
        var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

        _this.model = function () {
            return _this.props.model;
        };

        _this.is_open = function () {
            return _this.model().opened;
        };

        _this.item_icon = function () {
            if (_this.model().isFolder) {
                if (_this.is_open()) {
                    return 'folder_open';
                }
                return 'folder';
            }
            return 'insert_drive_file';
        };

        _this.toggle = function () {
            _this.props.selectFile(_this.model());
        };

        _this.doubleClick = function () {
            _this.props.openFile(_this.model());
        };

        _this.toggle_icon = function () {
            _this.isOpen = !_this.isOpen;
        };

        _this.renderItems = function () {

            // console.log(this.props)
            if (_this.props.model.hasOwnProperty('children')) {
                return _this.props.model.children.map(function (item, index) {
                    return _react2.default.createElement(Item, { className: 'item', key: item.id, openFile: _this.props.openFile, selectFile: _this.props.selectFile, model: item });
                });
            }
        };

        return _this;
    }

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

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var model = this.props.model;
            // console.log('model', this.props.model);
            return _react2.default.createElement(
                'li',
                { className: 'first_child_margin' },
                _react2.default.createElement(
                    'div',
                    { className: 'wrapper' },
                    _react2.default.createElement(
                        'i',
                        { className: 'material-icons icon' },
                        this.item_icon()
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'item-text noselect', onDoubleClick: this.doubleClick, onClick: this.toggle },
                        model.name
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'item' },
                    this.renderItems()
                )
            );
        }
    }]);

    return Item;
}(_react.Component);

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

exports.default = (0, _reactRedux.connect)()(Item);