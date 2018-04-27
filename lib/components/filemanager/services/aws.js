'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import http from 'lib/http-config';


var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AwsService = function () {
    function AwsService() {
        _classCallCheck(this, AwsService);
    }

    _createClass(AwsService, [{
        key: 'awsListing',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(state) {
                var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

                var _state$aws$credential, credentials, bucket, region, creds, params, s3, listObjPromise;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // state.aws.credentials
                                _state$aws$credential = state.aws.credentials, credentials = _state$aws$credential.credentials, bucket = _state$aws$credential.bucket, region = _state$aws$credential.region;
                                creds = new _awsSdk2.default.Credentials({
                                    accessKeyId: credentials.access_key_id,
                                    secretAccessKey: credentials.secret_access_key,
                                    sessionToken: credentials.session_token
                                });

                                _awsSdk2.default.config.update({
                                    region: region,
                                    credentials: creds
                                    //     accessKeyId: credentials.access_key_id,
                                    //     expireTime: credentials.secret_access_key,
                                    //     expired: credentials.expired,
                                    //     sessionToken: credentials.session_token
                                    // }
                                });
                                params = {
                                    Delimiter: '/',
                                    Bucket: bucket,
                                    Prefix: prefix //'undefined/bob/'
                                };
                                s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket } }); //,

                                listObjPromise = s3.listObjectsV2(params).promise();
                                return _context.abrupt('return', listObjPromise.then(function (data, err) {

                                    var id = null;
                                    var path = 's3/';
                                    var name = 's3/';
                                    var prefixChild = '';
                                    if (data.Prefix !== 's3/') {
                                        path = data.Prefix;
                                        var dirs = data.Prefix.split('/');
                                        dirs.pop();
                                        name = dirs.pop();
                                        name += '/';
                                        id = Math.random().toString(36).substr(2, 9);
                                    }

                                    var result_node = [];

                                    data.CommonPrefixes.forEach(function (element) {
                                        var dirs = element.Prefix.split('/');
                                        prefixChild = dirs.join('/');
                                        dirs.pop();
                                        name = dirs.pop();
                                        name += '/';
                                        result_node.push({
                                            id: Math.random().toString(36).substr(2, 9),
                                            path: prefixChild,
                                            name: name,
                                            isFolder: true,
                                            opened: false,
                                            children: []
                                        });
                                    });
                                    data.Contents.forEach(function (element) {
                                        var dirs = element.Key.split('/');
                                        name = dirs.pop();
                                        result_node.push({
                                            id: Math.random().toString(36).substr(2, 9),
                                            path: element.Key,
                                            name: name,
                                            isFolder: false,
                                            children: [],
                                            key: element.Key,
                                            versionId: element.VersionId
                                        });
                                    });
                                    return result_node;
                                }));

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function awsListing(_x) {
                return _ref.apply(this, arguments);
            }

            return awsListing;
        }()
    }, {
        key: 'awsUploadFolder',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(state, folderName) {
                var _state$aws$credential2, credentials, bucket, region, creds, s3, params;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _state$aws$credential2 = state.aws.credentials, credentials = _state$aws$credential2.credentials, bucket = _state$aws$credential2.bucket, region = _state$aws$credential2.region;
                                creds = new _awsSdk2.default.Credentials({
                                    accessKeyId: credentials.access_key_id,
                                    secretAccessKey: credentials.secret_access_key,
                                    sessionToken: credentials.session_token
                                });

                                _awsSdk2.default.config.update({
                                    region: region,
                                    credentials: creds
                                });

                                s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket } });
                                params = {
                                    Body: new ArrayBuffer(),
                                    Bucket: bucket,
                                    Key: folderName + '/.keep'
                                };
                                return _context2.abrupt('return', s3.putObject(params, function (err, data) {
                                    if (err) {
                                        console.log('error', err.stack);
                                    } else {
                                        // console.log(data);
                                    }
                                }));

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function awsUploadFolder(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return awsUploadFolder;
        }()
        //
        // async awsDeleteFolder({ state }, currentNode) {
        //     const creds = new AWS.Credentials(state.credentials.access_key_id, state.credentials.secret_access_key, state.credentials.session_token);
        //     AWS.config.update({
        //         region: state.region,
        //         credentials: creds
        //     });
        //     const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        //
        //     const params = { Bucket: state.bucket, Delete: { Objects: [] } };
        //     const getAllKeys = function (node, params) {
        //         node.childrens.forEach((element) => {
        //             if (element.isFolder) {
        //                 getAllKeys(element, params);
        //             } else {
        //                 params.Delete.Objects.push({
        //                     Key: element.path
        //                 });
        //             }
        //         });
        //     };
        //     getAllKeys(state.node, params);
        //     if (params.Delete.Objects.length > 0) {
        //         const deleteObject = s3.deleteObjects(params).promise();
        //         return deleteObject;
        //     }
        // }
        //

    }, {
        key: 'awsUploadFile',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(state, _ref4) {
                var buffer = _ref4.buffer,
                    name = _ref4.name,
                    type = _ref4.type;

                var _state$aws$credential3, credentials, bucket, region, creds, s3, params;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _state$aws$credential3 = state.aws.credentials, credentials = _state$aws$credential3.credentials, bucket = _state$aws$credential3.bucket, region = _state$aws$credential3.region;
                                creds = new _awsSdk2.default.Credentials({
                                    accessKeyId: credentials.access_key_id,
                                    secretAccessKey: credentials.secret_access_key,
                                    sessionToken: credentials.session_token
                                });

                                _awsSdk2.default.config.update({
                                    region: state.region,
                                    credentials: creds
                                });

                                s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket }, endpoint: "http://static.nr.s3.amazonaws.com" });
                                params = {
                                    ACL: 'public-read',
                                    Body: buffer,
                                    Bucket: bucket,
                                    Key: '' + state.tree.currentFilePath + name,
                                    ContentType: type,
                                    ServerSideEncryption: 'AES256'
                                };
                                return _context3.abrupt('return', s3.putObject(params, function (err, data) {
                                    if (err) {
                                        console.log('error', err.stack);
                                    } else {
                                        console.log(data);
                                    }
                                }));

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function awsUploadFile(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return awsUploadFile;
        }()
    }, {
        key: 'awsMoveFile',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(state, file_url, new_file_url) {
                var _this = this;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                return _context4.abrupt('return', this.awsCopyFile(state, file_url, new_file_url).then(function () {
                                    return _this.awsDeleteFile(state, file_url);
                                }));

                            case 1:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function awsMoveFile(_x7, _x8, _x9) {
                return _ref5.apply(this, arguments);
            }

            return awsMoveFile;
        }()
    }, {
        key: 'awsCopyFile',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(state, file_url, new_file_url) {
                var _state$aws$credential4, credentials, bucket, region, creds, s3, params;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _state$aws$credential4 = state.aws.credentials, credentials = _state$aws$credential4.credentials, bucket = _state$aws$credential4.bucket, region = _state$aws$credential4.region;
                                creds = new _awsSdk2.default.Credentials({
                                    accessKeyId: credentials.access_key_id,
                                    secretAccessKey: credentials.secret_access_key,
                                    sessionToken: credentials.session_token
                                });

                                console.log(creds, state.aws.credentials);
                                _awsSdk2.default.config.update({
                                    region: region,
                                    credentials: creds
                                });
                                s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01' });
                                params = {
                                    Bucket: bucket,
                                    CopySource: '/' + bucket + '/' + file_url,
                                    Key: new_file_url
                                };

                                console.log("copy file", params);
                                return _context5.abrupt('return', s3.copyObject(params, function (err, data) {
                                    if (err) {
                                        console.log('error', err.stack);
                                    } else {
                                        console.log(data);
                                    }
                                }));

                            case 8:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function awsCopyFile(_x10, _x11, _x12) {
                return _ref6.apply(this, arguments);
            }

            return awsCopyFile;
        }()
    }, {
        key: 'awsDeleteFile',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(state, file_url) {
                var _state$aws$credential5, credentials, bucket, region, creds, s3, params, deleteObject;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _state$aws$credential5 = state.aws.credentials, credentials = _state$aws$credential5.credentials, bucket = _state$aws$credential5.bucket, region = _state$aws$credential5.region;
                                creds = new _awsSdk2.default.Credentials({
                                    accessKeyId: credentials.access_key_id,
                                    secretAccessKey: credentials.secret_access_key,
                                    sessionToken: credentials.session_token
                                });

                                _awsSdk2.default.config.update({
                                    region: region,
                                    credentials: creds
                                });
                                s3 = new _awsSdk2.default.S3({ apiVersion: '2006-03-01' });


                                console.log("awsDeleteFile", state);
                                params = {
                                    Bucket: bucket,
                                    Delete: {
                                        Objects: [{
                                            Key: file_url
                                        }]
                                    }
                                };

                                console.log("Delete params", params);
                                deleteObject = s3.deleteObjects(params).promise();
                                return _context6.abrupt('return', deleteObject);

                            case 9:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function awsDeleteFile(_x13, _x14) {
                return _ref7.apply(this, arguments);
            }

            return awsDeleteFile;
        }()

        // async awsGetFile(state) {
        //     const { credentials, bucket, region } = state.aws.credentials;
        //     const creds = new AWS.Credentials({
        //         accessKeyId: credentials.access_key_id,
        //         secretAccessKey: credentials.secret_access_key,
        //         sessionToken: credentials.session_token
        //     });
        //     AWS.config.update({
        //         region: region,
        //         credentials: creds
        //     });
        //
        //     const s3 = new AWS.S3({ apiVersion: '2006-03-01', params: { Bucket: bucket } });
        //     const params = {
        //         Bucket: bucket,
        //         Key: state.tree.node.path
        //     };
        //     return s3.getObject(params, (err, data) => {
        //         if (err) {
        //             console.log('error', err.stack);
        //         } else {
        //             console.log('get object result', data);
        //         }
        //     });
        // }

    }]);

    return AwsService;
}();

exports.default = new AwsService();