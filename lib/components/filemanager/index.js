'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _components = require('./components');

var _reducers = require('./store/reducers');

var reducers = _interopRequireWildcard(_reducers);

require('bootstrap/dist/css/bootstrap.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //
);

var FileManager = function (_React$Component) {
    _inherits(FileManager, _React$Component);

    function FileManager(props, context) {
        _classCallCheck(this, FileManager);

        var _this = _possibleConstructorReturn(this, (FileManager.__proto__ || Object.getPrototypeOf(FileManager)).call(this, props, context));

        _this.renderChildren = function () {
            return _this.props.children;
        };

        _this.setShowFileManager = function (e) {
            _this.setState({
                showFileManager: true
            });
        };

        _this.selectFile = function (file) {
            _this.setState({
                showFileManager: false
            });
            _this.props.onSelect(file);
        };

        _this.close = function () {
            _this.setState({
                showFileManager: false
            });
        };

        _this.renderFileManager = function () {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(_components.FileManagerCore, { selectFile: _this.selectFile, closeFileManager: _this.close, auth_url: _this.props.auth_url })
            );
        };

        _this.state = {
            showFileManager: false
        };
        return _this;
    }

    _createClass(FileManager, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.showFileManager ? this.renderFileManager() : null,
                _react2.default.createElement(
                    'div',
                    { onClick: this.setShowFileManager },
                    this.renderChildren()
                )
            );
        }
    }]);

    return FileManager;
}(_react2.default.Component);

exports.default = FileManager;