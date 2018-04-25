"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reducer = require("../../../store/tree/reducer");

require("./filePreview.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilePreview = function (_Component) {
    _inherits(FilePreview, _Component);

    function FilePreview() {
        _classCallCheck(this, FilePreview);

        return _possibleConstructorReturn(this, (FilePreview.__proto__ || Object.getPrototypeOf(FilePreview)).apply(this, arguments));
    }

    _createClass(FilePreview, [{
        key: "render",


        // closeWindow = () => {
        //     console.log('close clicked');
        //     if (typeof this.props.closeFileManager === 'function') {
        //         console.log('is function');
        //         this.props.closeFileManager();
        //     }
        // };

        value: function render() {
            // const { faq_list } = this.props;
            // console.log("currentFilePath", this.props.currentFilePath);
            // console.log("selectedFile", this.props.selectedFile);
            return _react2.default.createElement("img", { className: "autosize", src: this.props.nodeUrl });
        }
    }]);

    return FilePreview;
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
        isFolder: (0, _reducer.isFolder)(state.tree),
        nodeUrl: (0, _reducer.getNodeAwsUrl)(state)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(FilePreview);