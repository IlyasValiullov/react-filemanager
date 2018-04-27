'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reducer = require('../../store/tree/reducer');

var _ = require('.');

var _uploader = require('../uploader/uploader');

var _uploader2 = _interopRequireDefault(_uploader);

require('./preview.css');

var _actions = require('../../store/tree/actions');

var treeActions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_Component) {
    _inherits(Preview, _Component);

    function Preview(props) {
        _classCallCheck(this, Preview);

        var _this = _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).call(this, props));

        _this.handleChange = function (event) {
            _this.setState({
                newFileName: event.target.value
            });
        };

        _this.closeWindow = function () {
            // console.log('close clicked');
            if (typeof _this.props.closeFileManager === 'function') {
                // console.log('is function');
                _this.props.closeFileManager();
            }
        };

        _this.moveFile = function () {
            _this.props.dispatch(treeActions.moveFile(_this.state.newFileName, _this.props.node));
        };

        _this.state = {
            newFileName: _this.props.currentFilePath
        };
        // this.setState({
        //     showUploadPanel: false
        // })
        return _this;
    }

    _createClass(Preview, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            console.log("Receive props", this.props);
            this.setState({
                newFileName: this.props.currentFilePath
            });
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            console.log("component will update", this.props);
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

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'preview col-9' },
                _react2.default.createElement(
                    'h1',
                    null,
                    this.props.currentFilePath
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { type: 'text', value: this.state.newFileName, onChange: this.handleChange }),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.moveFile },
                        'Move'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'preview_content' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content_grow' },
                        this.props.isFolder ? _react2.default.createElement(_.FolderPreview, null) : _react2.default.createElement(_.FilePreview, null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'content_footer' },
                        this.props.showUploadPanel ? _react2.default.createElement(_uploader2.default, null) : null
                    )
                )
            );
        }
    }]);

    return Preview;
}(_react.Component);

function mapStateToProps(state) {
    // console.log("MapStateToProps");
    // console.log("selected file", getSelectedFile(state.tree));
    // console.log("state", state);
    return {
        // selectedNode: treeSelectors.getSelectedNode(state),
        currentFilePath: (0, _reducer.getCurrentFilePath)(state.tree),
        selectedFile: (0, _reducer.getSelectedFile)(state.tree),
        node: (0, _reducer.getNode)(state.tree),
        isFolder: (0, _reducer.isFolder)(state.tree)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Preview);

// file-preview-menu(v-if="selectedIsFile")
// folder-preview-menu(v-if="selectedIsFolder" @uploadFiles="uploadFiles")
// v-layout(class="preview_content")
//   div(class='content_grow')
//     folder-preview(v-if="openedIsFolder" )
//     <!--textfile-preview(v-if="!isUpload && openedIsFile" )-->
//     file-preview(v-if="!isUpload && openedIsFile" )
//   div(class='content_footer')
//     dropzone-uploader(v-if="isUpload" @hideUploadPanel="hideUploadPanel")