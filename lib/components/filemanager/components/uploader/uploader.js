'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _actions = require('store/tree/actions');

var treeActions = _interopRequireWildcard(_actions);

var _reducer = require('store/tree/reducer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import './folderPreview.css'


var UploaderPanel = function (_Component) {
    _inherits(UploaderPanel, _Component);

    function UploaderPanel(props) {
        _classCallCheck(this, UploaderPanel);

        var _this = _possibleConstructorReturn(this, (UploaderPanel.__proto__ || Object.getPrototypeOf(UploaderPanel)).call(this, props));

        _this.onDrop = function (files) {
            console.log('files', files);
            _this.setState({
                files: files
            });
        };

        _this.uploadFile = function () {
            console.log("upload file");
            _this.props.dispatch(treeActions.uploadFiles(_this.props.currentFilePath, _this.state.files));
        };

        _this.state = {
            files: null
        };
        return _this;
    }

    // closeWindow = () => {
    //     console.log('close clicked');
    //     if (typeof this.props.closeFileManager === 'function') {
    //         console.log('is function');
    //         this.props.closeFileManager();
    //     }
    // };

    _createClass(UploaderPanel, [{
        key: 'mount',
        value: function mount() {
            console.log("mount uploader panel");
        }
    }, {
        key: 'renderDropFiles',
        value: function renderDropFiles() {
            console.log('state', this.state);
            if (this.state.files) {
                return _react2.default.createElement(
                    'ul',
                    null,
                    this.state.files.map(function (f) {
                        return _react2.default.createElement(
                            'li',
                            { key: f.name },
                            f.name,
                            ' - ',
                            f.size,
                            ' bytes'
                        );
                    })
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // const { faq_list } = this.props;
            // console.log("currentFilePath", this.props.currentFilePath);
            // console.log("selectedFile", this.props.selectedFile);
            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'uploader' },
                    _react2.default.createElement(
                        _reactDropzone2.default,
                        { onDrop: this.onDrop },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Try dropping some files here, or click to select files to upload.'
                        )
                    ),
                    _react2.default.createElement(
                        'aside',
                        null,
                        _react2.default.createElement(
                            'h2',
                            null,
                            'Dropped files'
                        ),
                        this.renderDropFiles()
                    ),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.uploadFile },
                        'Save'
                    )
                )
            )
            // <div className="grid-list-md text-xs-center" >
            //     <div className={"autosize"}>
            //         <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/folder-icon.png"/>
            //     </div>
            // </div>
            ;
        }
    }]);

    return UploaderPanel;
}(_react.Component);

function mapStateToProps(state) {

    return {
        currentFilePath: (0, _reducer.getCurrentFilePath)(state.tree)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(UploaderPanel);
// export default UploaderPanel;