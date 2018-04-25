'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

require('./tree.css');

var _reactRedux = require('react-redux');

var _actions = require('../../store/tree/actions');

var treeActions = _interopRequireWildcard(_actions);

var _reducer = require('../../store/tree/reducer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree(props) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        _this.updateTree = function () {
            // this.props.dispatch();
            // console.log("TreeComponent: updateTree");
            //this.props.dispatch()
            _this.props.dispatch(treeActions.fetchDirs());
        };

        _this.selectFile = function (model) {
            _this.props.dispatch(treeActions.selectNode(model));
        };

        _this.openNode = function (model) {
            _this.props.dispatch(treeActions.openNode(model));
        };

        _this.renderItems = function () {
            return _this.props.dirs.map(function (item, index) {
                return _react2.default.createElement(_.Item, { className: 'item', key: item.id, openFile: _this.openNode, selectFile: _this.selectFile, model: item });
            });
        };

        return _this;
    }

    _createClass(Tree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
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

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'scroll_list first_child_margin col-3' },
                this.renderItems()
            );
        }
    }]);

    return Tree;
}(_react.Component);

// FileManager.propTypes = {
//     closeFileManager: PropTypes.func
// };

function mapStateToProps(state) {
    return {
        // selectedNode: treeSelectors.getSelectedNode(state),
        dirs: (0, _reducer.getDirs)(state.tree)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Tree);