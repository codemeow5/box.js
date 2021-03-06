'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Path = require('./Path');

var _Path2 = _interopRequireDefault(_Path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
    function Context(ctx, x, y, zoom) {
        _classCallCheck(this, Context);

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this.paths = [];
    }

    _createClass(Context, [{
        key: '_getPaths',
        value: function _getPaths() {
            return this.paths.reverse();
        }
    }, {
        key: '_zoom',
        value: function _zoom() {
            return _lodash2.default.map(arguments, function (val) {
                return val * this.zoom;
            }.bind(this));
        }
    }, {
        key: 'createPath',
        value: function createPath() {
            return new _Path2.default(this);
        }
    }, {
        key: 'scale',
        value: function scale(x, y) {
            this.ctx.scale(x, y);
        }

        // Drawing rectangles

    }, {
        key: 'clearRect',
        value: function clearRect(x, y, width, height) {
            var _zoom2 = this._zoom(x, y, width, height);

            var _zoom3 = _slicedToArray(_zoom2, 4);

            x = _zoom3[0];
            y = _zoom3[1];
            width = _zoom3[2];
            height = _zoom3[3];

            var path = new Path2D();
            path.rect(this.x + x, this.y + y, width, height);
            this.ctx.clearRect(this.x + x, this.y + y, width, height);
            this.paths.push([false, path]);
        }
    }, {
        key: 'fillRect',
        value: function fillRect(x, y, width, height) {
            var _zoom4 = this._zoom(x, y, width, height);

            var _zoom5 = _slicedToArray(_zoom4, 4);

            x = _zoom5[0];
            y = _zoom5[1];
            width = _zoom5[2];
            height = _zoom5[3];

            var path = new Path2D();
            path.rect(this.x + x, this.y + y, width, height);
            this.ctx.fill(path);
            this.paths.push([true, path]);
        }
    }, {
        key: 'strokeRect',
        value: function strokeRect(x, y, width, height) {
            var select = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            var _zoom6 = this._zoom(x, y, width, height);

            var _zoom7 = _slicedToArray(_zoom6, 4);

            x = _zoom7[0];
            y = _zoom7[1];
            width = _zoom7[2];
            height = _zoom7[3];

            var path = new Path2D();
            path.rect(this.x + x, this.y + y, width, height);
            this.ctx.stroke(path);
            if (select) {
                this.paths.push([true, path]);
            }
        }

        // Drawing text

    }, {
        key: 'fillText',
        value: function fillText(text, x, y) {
            var maxWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            var _zoom8 = this._zoom(x, y, maxWidth);

            var _zoom9 = _slicedToArray(_zoom8, 3);

            x = _zoom9[0];
            y = _zoom9[1];
            maxWidth = _zoom9[2];

            var mtext = this.ctx.measureText(text);
            this.ctx.fillText(text, x, y, maxWidth);
            var path = new Path2D();
            var width = mtext.width;
            if (maxWidth != undefined && maxWidth < width) {
                width = maxWidth;
            }
            path.rect(x, y, width, mtext.height);
            this.paths.push([true, path]);
        }
    }, {
        key: 'strokeText',
        value: function strokeText(text, x, y) {
            var maxWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

            var _zoom10 = this._zoom(x, y, maxWidth);

            var _zoom11 = _slicedToArray(_zoom10, 3);

            x = _zoom11[0];
            y = _zoom11[1];
            maxWidth = _zoom11[2];

            var mtext = this.ctx.measureText(text);
            this.ctx.strokeText(text, x, y, maxWidth);
            var path = new Path2D();
            var width = mtext.width;
            if (maxWidth != undefined && maxWidth < width) {
                width = maxWidth;
            }
            path.rect(x, y, width, mtext.height);
            this.paths.push([true, path]);
        }
    }, {
        key: 'measureText',
        value: function measureText(text) {
            return this.measureText(text);
        }

        // Line styles

    }, {
        key: 'getLineWidth',
        value: function getLineWidth() {
            return this.ctx.lineWidth;
        }
    }, {
        key: 'setLineWidth',
        value: function setLineWidth(val) {
            this.ctx.lineWidth = val;
        }
    }, {
        key: 'getLineCap',
        value: function getLineCap() {
            return this.ctx.lineCap;
        }
    }, {
        key: 'setLineCap',
        value: function setLineCap(val) {
            this.ctx.lineCap = val;
        }
    }, {
        key: 'getLineJoin',
        value: function getLineJoin() {
            return this.ctx.lineJoin;
        }
    }, {
        key: 'setLineJoin',
        value: function setLineJoin(val) {
            this.ctx.lineJoin = val;
        }
    }, {
        key: 'getMiterLimit',
        value: function getMiterLimit() {
            return this.ctx.miterLimit;
        }
    }, {
        key: 'setMiterLimit',
        value: function setMiterLimit(val) {
            this.ctx.miterLimit = val;
        }
    }, {
        key: 'getLineDash',
        value: function getLineDash() {
            return this.ctx.getLineDash();
        }
    }, {
        key: 'setLineDash',
        value: function setLineDash(val) {
            this.ctx.setLineDash(val);
        }
    }, {
        key: 'getLineDashOffset',
        value: function getLineDashOffset() {
            return this.ctx.lineDashOffset;
        }
    }, {
        key: 'setLineDashOffset',
        value: function setLineDashOffset(val) {
            this.ctx.lineDashOffset = val;
        }

        // Text styles

    }, {
        key: 'getFont',
        value: function getFont() {
            return this.ctx.font;
        }
    }, {
        key: 'setFont',
        value: function setFont(val) {
            this.ctx.font = val;
        }
    }, {
        key: 'getTextAlign',
        value: function getTextAlign() {
            return this.ctx.textAlign;
        }
    }, {
        key: 'setTextAlign',
        value: function setTextAlign(val) {
            this.ctx.textAlign = val;
        }
    }, {
        key: 'getTextBaseline',
        value: function getTextBaseline() {
            return this.ctx.textBaseline;
        }
    }, {
        key: 'setTextBaseline',
        value: function setTextBaseline(val) {
            this.ctx.textBaseline = val;
        }
    }, {
        key: 'getDirection',
        value: function getDirection() {
            return this.ctx.direction;
        }
    }, {
        key: 'setDirection',
        value: function setDirection(val) {
            this.ctx.direction = val;
        }

        // Fill and stroke styles

    }, {
        key: 'getFillStyle',
        value: function getFillStyle() {
            return this.ctx.fillStyle;
        }
    }, {
        key: 'setFillStyle',
        value: function setFillStyle(val) {
            this.ctx.fillStyle = val;
        }
    }, {
        key: 'getStrokeStyle',
        value: function getStrokeStyle() {
            return this.ctx.strokeStyle;
        }
    }, {
        key: 'setStrokeStyle',
        value: function setStrokeStyle(val) {
            this.ctx.strokeStyle = val;
        }

        // Gradients and patterns

    }, {
        key: 'createLinearGradient',
        value: function createLinearGradient(x0, y0, x1, y1) {
            var _zoom12 = this._zoom(x0, y0, x1, y1);

            var _zoom13 = _slicedToArray(_zoom12, 4);

            x0 = _zoom13[0];
            y0 = _zoom13[1];
            x1 = _zoom13[2];
            y1 = _zoom13[3];

            this.ctx.createLinearGradient(this.x + x0, this.y + y0, this.x + x1, this.y + y1);
        }
    }, {
        key: 'createRadialGradient',
        value: function createRadialGradient(x0, y0, r0, x1, y1, r1) {
            var _zoom14 = this._zoom(x0, y0, r0, x1, y1, r1);

            var _zoom15 = _slicedToArray(_zoom14, 6);

            x0 = _zoom15[0];
            y0 = _zoom15[1];
            r0 = _zoom15[2];
            x1 = _zoom15[3];
            y1 = _zoom15[4];
            r1 = _zoom15[5];

            this.ctx.createRadialGradient(this.x + x0, this.y + y0, r0, this.x + x1, this.y + y1, r1);
        }
    }, {
        key: 'createPattern',
        value: function createPattern(image, repetition) {
            this.ctx.createPattern(image, repetition);
        }

        // Shadows

    }, {
        key: 'getShadowBlur',
        value: function getShadowBlur() {
            return this.ctx.shadowBlur;
        }
    }, {
        key: 'setShadowBlur',
        value: function setShadowBlur(val) {
            this.ctx.shadowBlur = val;
        }
    }, {
        key: 'getShadowColor',
        value: function getShadowColor() {
            return this.ctx.shadowColor;
        }
    }, {
        key: 'setShadowColor',
        value: function setShadowColor(val) {
            this.ctx.shadowColor = val;
        }
    }, {
        key: 'getShadowOffsetX',
        value: function getShadowOffsetX() {
            return this.ctx.shadowOffsetX;
        }
    }, {
        key: 'setShadowOffsetX',
        value: function setShadowOffsetX(val) {
            this.ctx.shadowOffsetX = val;
        }
    }, {
        key: 'getShadowOffsetY',
        value: function getShadowOffsetY() {
            return this.ctx.shadowOffsetY;
        }
    }, {
        key: 'setShadowOffsetY',
        value: function setShadowOffsetY(val) {
            this.ctx.shadowOffsetY = val;
        }

        // Paths

        // https://github.com/google/canvas-5-polyfill

        // With this polyfill installed, the calls to context.clip(path), 
        // context.isPointInPath(path, x, y) and context.isPointInStroke(path, x, y) 
        // all affect the current path.

        // When using the polyfill the best approach is to move strictly to using 
        // Path2D objects to describe paths and then use the path enabled calls on 
        // the context, such as ctx.fill(path). Do not mix and match such calls.

        // Drawing paths

    }, {
        key: 'fill',
        value: function fill(path, fillRule) {
            path = path.nativePath;
            this.ctx.fill(path, fillRule);
            this.paths.push([true, path]);
        }
    }, {
        key: 'stroke',
        value: function stroke(path) {
            path = path.nativePath;
            this.ctx.stroke(path);
            this.paths.push([true, path]);
        }
    }, {
        key: 'drawFocusIfNeeded',
        value: function drawFocusIfNeeded(arg1, arg2) {
            this.ctx.drawFocusIfNeeded(arg1, arg2);
        }
    }, {
        key: 'scrollPathIntoView',
        value: function scrollPathIntoView(path) {
            path = path.nativePath;
            this.ctx.scrollPathIntoView(path);
        }
    }, {
        key: 'clip',
        value: function clip(path, fillRule) {
            throw 'Not implemented';
        }
    }, {
        key: 'isPointInPath',
        value: function isPointInPath(path, x, y, fillRule) {
            var _zoom16 = this._zoom(x, y);

            var _zoom17 = _slicedToArray(_zoom16, 2);

            x = _zoom17[0];
            y = _zoom17[1];

            path = path.nativePath;
            this.ctx.isPointInPath(path, this.x + x, this.y + y, fillRule);
        }
    }, {
        key: 'isPointInStroke',
        value: function isPointInStroke(path, x, y) {
            var _zoom18 = this._zoom(x, y);

            var _zoom19 = _slicedToArray(_zoom18, 2);

            x = _zoom19[0];
            y = _zoom19[1];

            path = path.nativePath;
            this.ctx.isPointInStroke(path, this.x + x, this.y + y);
        }
    }]);

    return Context;
}();

exports.default = Context;
//# sourceMappingURL=Context.js.map