'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.aws = exports.tree = undefined;

var _reducer = require('./tree/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('./aws/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.tree = _reducer2.default;
exports.aws = _reducer4.default;