'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./filemanager.css');

var _tree = require('./tree');

var _preview = require('./preview');

var _reactRedux = require('react-redux');

var _actionTypes = require('../store/aws/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _reducer = require('../store/tree/reducer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// const { PropTypes }  = React;

// import * as types from "../store/tree/actionTypes";


var FileManager = function (_Component) {
    _inherits(FileManager, _Component);

    function FileManager(props) {
        _classCallCheck(this, FileManager);

        var _this = _possibleConstructorReturn(this, (FileManager.__proto__ || Object.getPrototypeOf(FileManager)).call(this, props));

        _this.closeWindow = function () {
            console.log('close clicked');
            if (typeof _this.props.closeFileManager === 'function') {
                // console.log('is function');
                _this.props.closeFileManager();
            }
        };

        _this.setShowUploadPanel = function () {
            _this.setState({
                showUploadPanel: !_this.state.showUploadPanel
            });
        };

        _this.hideUploadPanel = function () {
            _this.setState({
                showUploadPanel: false
            });
        };

        _this.selectFile = function () {
            _this.props.selectFile(_this.props.selected_aws_file);
        };

        _this.state = {
            showUploadPanel: false
        };
        console.log("Mount file manager", _this.props.auth_url);
        _this.props.dispatch({ type: types.FILEMANAGER_MOUNTED, auth_url: _this.props.auth_url });
        return _this;
    }

    _createClass(FileManager, [{
        key: 'render',
        value: function render() {
            // const { faq_list } = this.props;
            console.log("state", this.state);
            return _react2.default.createElement(
                'div',
                { id: 'myModal', className: 'my_modal' },
                _react2.default.createElement(
                    'div',
                    { className: 'my-modal-content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-content' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-header' },
                            _react2.default.createElement(
                                'button',
                                { type: 'button', onClick: this.selectFile },
                                'Select'
                            ),
                            _react2.default.createElement(
                                'button',
                                { type: 'button' },
                                'Refresh'
                            ),
                            _react2.default.createElement(
                                'button',
                                { type: 'button', onClick: this.setShowUploadPanel },
                                'Upload'
                            ),
                            _react2.default.createElement(
                                'button',
                                { type: 'button', className: 'close', onClick: this.closeWindow },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'close' },
                                    '\xD7'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-body' },
                            _react2.default.createElement(
                                'div',
                                { className: 'layout row' },
                                _react2.default.createElement(_tree.Tree, { className: 'flex' }),
                                _react2.default.createElement(_preview.Preview, { className: 'flex',
                                    setShowUploadPanel: this.setShowUploadPanel,
                                    hideUploadPanel: this.hideUploadPanel,
                                    showUploadPanel: this.state.showUploadPanel
                                })
                            )
                        )
                    )
                )
            )

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
            ;
        }
    }]);

    return FileManager;
}(_react.Component);

// FileManager.propTypes = {
//     closeFileManager: PropTypes.func
// };

function mapStateToProps(state) {
    return {
        // selectedNode: treeSelectors.getSelectedNode(state),
        selected_aws_file: (0, _reducer.getSelectedAwsFile)(state.tree)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FileManager);