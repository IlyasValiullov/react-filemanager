'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FolderPreview = exports.FilePreview = exports.Preview = undefined;

var _preview = require('./preview');

var _preview2 = _interopRequireDefault(_preview);

var _filePreview = require('./file/filePreview');

var _filePreview2 = _interopRequireDefault(_filePreview);

var _folderPreview = require('./folder/folderPreview');

var _folderPreview2 = _interopRequireDefault(_folderPreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Preview = _preview2.default;
exports.FilePreview = _filePreview2.default;
exports.FolderPreview = _folderPreview2.default;