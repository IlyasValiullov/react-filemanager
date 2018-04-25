'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import http from 'lib/http-config';


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
                                // console.log('s3', s3);
                                // console.log('AWS config', AWS.config);
                                // console.log('AWS CREDS', creds.accessKeyId);
                                // console.log("Here", params);

                                listObjPromise = s3.listObjectsV2(params).promise();
                                // console.log("Here", credentials.bucket);
                                // return s3.listObjectsV2(params, (err, data) => {

                                return _context.abrupt('return', listObjPromise.then(function (data, err) {

                                    // console.log('err', err);
                                    // console.log('err', err);
                                    // console.log("PromiseList");
                                    // let name = '';
                                    var id = null;
                                    var path = 's3/';
                                    var name = 's3/';
                                    var prefixChild = '';
                                    // console.log("data", data);
                                    if (data.Prefix !== 's3/') {
                                        path = data.Prefix;
                                        var dirs = data.Prefix.split('/');
                                        dirs.pop();
                                        name = dirs.pop();
                                        name += '/';
                                        id = Math.random().toString(36).substr(2, 9);
                                    }

                                    // const result_node = {
                                    //     id,
                                    //     path,
                                    //     name,
                                    //     isFolder: true,
                                    //     opened: false,
                                    //     childrens: []
                                    // };

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
        // async awsDeleteFile({ state }, currentNode) {
        //     const creds = new AWS.Credentials(state.credentials.access_key_id, state.credentials.secret_access_key, state.credentials.session_token);
        //     AWS.config.update({
        //         region: state.region,
        //         credentials: creds
        //     });
        //     const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
        //
        //     console.log(state.node);
        //     const params = {
        //         Bucket: state.bucket,
        //         Delete: {
        //             Objects: [
        //                 {
        //                     Key: currentNode.path
        //                 }
        //             ]
        //         }
        //     };
        //     const deleteObject = s3.deleteObjects(params).promise();
        //     return deleteObject;
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