'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCredentials = getCredentials;
exports.checkCredentials = checkCredentials;

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

var _httpConfig = require('../../lib/http-config');

var _httpConfig2 = _interopRequireDefault(_httpConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getCredentials() {
    var _this = this;

    // console.log("get creds");
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var url, response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            url = getState().aws.auth_url;
                            _context.next = 4;
                            return _httpConfig2.default.post(url);

                        case 4:
                            response = _context.sent;

                            // http.post("/aws_auth").then((response) => {
                            //     dispatch({ type: types.CREDENTIALS_UPDATED, credentials: response.data });
                            // });
                            // console.log(response);
                            dispatch({ type: types.CREDENTIALS_UPDATED, credentials: response.data });
                            _context.next = 11;
                            break;

                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context['catch'](0);

                            console.error(_context.t0);

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 8]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
}

function checkCredentials() {
    var _this2 = this;

    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var state;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            state = getState();

                            if (!(!state.aws.credentials.expiration || state.aws.credentials.expiration < Date.now())) {
                                _context2.next = 5;
                                break;
                            }

                            _context2.next = 5;
                            return dispatch(getCredentials());

                        case 5:
                            _context2.next = 10;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](0);

                            console.error(_context2.t0);

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 7]]);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();
}

// getCredentials(context) {
//     return http.post('/aws_auth').then((response) => {
//         if (response.status === 200) {
//             context.commit('save_credentials', response.data);
//         }
//     });
// },
// checkCredentials(context) {
//     if (!context.state.credentials.expiration || context.state.credentials.expiration < Date.now()) {
//         return context.dispatch('getCredentials');
//     }
// },