'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../../api');

var _api2 = _interopRequireDefault(_api);

var _overlay = require('../overlay/overlay');

var _overlay2 = _interopRequireDefault(_overlay);

var _constants = require('../../api/constants');

var _whichTransitionEndEvent = require('../../utils/whichTransitionEndEvent');

var _whichTransitionEndEvent2 = _interopRequireDefault(_whichTransitionEndEvent);

var _rprogressStyles = require('./rprogress-styles');

var _rprogressStyles2 = _interopRequireDefault(_rprogressStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RProgress = (function (_Component) {
    _inherits(RProgress, _Component);

    function RProgress(props, context) {
        _classCallCheck(this, RProgress);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RProgress).call(this, props, context));

        _this.state = {
            progress: 0,
            active: false
        };

        _api2.default.subscribe(function (event) {
            var data = event.data;

            if (data.type === _constants.PROGRESS_COMPLETE) {
                _this.progress.addEventListener(_whichTransitionEndEvent2.default, function () {
                    _this.setState({
                        progress: 0,
                        active: false
                    });
                });
            }

            _this.setState({
                progress: data.position,
                active: true
            });
        });
        return _this;
    }

    _createClass(RProgress, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state;
            var progress = _state.progress;
            var active = _state.active;
            var className = this.props.className;

            if (!progress) {
                return _react2.default.DOM.noscript();
            }

            return _react2.default.createElement(
                _overlay2.default,
                { visible: active },
                _react2.default.createElement(
                    'div',
                    { className: (_rprogressStyles2.default.rprogress || 'rprogress') + ' ' + (className || ''),
                        style: { width: progress + '%' },
                        ref: function ref(progress) {
                            return _this2.progress = progress;
                        } },
                    ' '
                )
            );
        }
    }]);

    return RProgress;
})(_react.Component);

exports.default = RProgress;