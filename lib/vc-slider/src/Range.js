"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = require("vue");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classNames3 = _interopRequireDefault(require("../../_util/classNames"));

var _vueTypes = _interopRequireWildcard(require("../../_util/vue-types"));

var _BaseMixin = _interopRequireDefault(require("../../_util/BaseMixin"));

var _propsUtil = require("../../_util/props-util");

var _Track = _interopRequireDefault(require("./common/Track"));

var _createSlider = _interopRequireDefault(require("./common/createSlider"));

var utils = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _trimAlignValue = function trimAlignValue(_ref) {
  var value = _ref.value,
      handle = _ref.handle,
      bounds = _ref.bounds,
      props = _ref.props;
  var allowCross = props.allowCross,
      pushable = props.pushable;
  var thershold = Number(pushable);
  var valInRange = utils.ensureValueInRange(value, props);
  var valNotConflict = valInRange;

  if (!allowCross && handle != null && bounds !== undefined) {
    if (handle > 0 && valInRange <= bounds[handle - 1] + thershold) {
      valNotConflict = bounds[handle - 1] + thershold;
    }

    if (handle < bounds.length - 1 && valInRange >= bounds[handle + 1] - thershold) {
      valNotConflict = bounds[handle + 1] - thershold;
    }
  }

  return utils.ensureValuePrecision(valNotConflict, props);
};

var rangeProps = {
  defaultValue: _vueTypes.default.arrayOf(_vueTypes.default.number),
  value: _vueTypes.default.arrayOf(_vueTypes.default.number),
  count: _vueTypes.default.number,
  pushable: (0, _vueTypes.withUndefined)(_vueTypes.default.oneOfType([_vueTypes.default.looseBool, _vueTypes.default.number])),
  allowCross: _vueTypes.default.looseBool,
  disabled: _vueTypes.default.looseBool,
  reverse: _vueTypes.default.looseBool,
  tabindex: _vueTypes.default.arrayOf(_vueTypes.default.number),
  prefixCls: _vueTypes.default.string,
  min: _vueTypes.default.number,
  max: _vueTypes.default.number,
  autofocus: _vueTypes.default.looseBool
};
var Range = {
  name: 'Range',
  inheritAttrs: false,
  displayName: 'Range',
  mixins: [_BaseMixin.default],
  props: (0, _propsUtil.initDefaultProps)(rangeProps, {
    count: 1,
    allowCross: true,
    pushable: false,
    tabindex: []
  }),
  data: function data() {
    var _this = this;

    var count = this.count,
        min = this.min,
        max = this.max;
    var initialValue = Array.apply(void 0, (0, _toConsumableArray2.default)(Array(count + 1))).map(function () {
      return min;
    });
    var defaultValue = (0, _propsUtil.hasProp)(this, 'defaultValue') ? this.defaultValue : initialValue;
    var value = this.value;

    if (value === undefined) {
      value = defaultValue;
    }

    var bounds = value.map(function (v, i) {
      return _trimAlignValue({
        value: v,
        handle: i,
        props: _this.$props
      });
    });
    var recent = bounds[0] === max ? 0 : bounds.length - 1;
    return {
      sHandle: null,
      recent: recent,
      bounds: bounds
    };
  },
  watch: {
    value: {
      handler: function handler(val) {
        var bounds = this.bounds;
        this.setChangeValue(val || bounds);
      },
      deep: true
    },
    min: function min() {
      var value = this.value;
      this.setChangeValue(value || this.bounds);
    },
    max: function max() {
      var value = this.value;
      this.setChangeValue(value || this.bounds);
    }
  },
  methods: {
    setChangeValue: function setChangeValue(value) {
      var _this2 = this;

      var bounds = this.bounds;
      var nextBounds = value.map(function (v, i) {
        return _trimAlignValue({
          value: v,
          handle: i,
          bounds: bounds,
          props: _this2.$props
        });
      });
      if (nextBounds.length === bounds.length && nextBounds.every(function (v, i) {
        return v === bounds[i];
      })) return;
      this.setState({
        bounds: nextBounds
      });

      if (value.some(function (v) {
        return utils.isValueOutOfRange(v, _this2.$props);
      })) {
        var newValues = value.map(function (v) {
          return utils.ensureValueInRange(v, _this2.$props);
        });

        this.__emit('change', newValues);
      }
    },
    onChange: function onChange(state) {
      var isNotControlled = !(0, _propsUtil.hasProp)(this, 'value');

      if (isNotControlled) {
        this.setState(state);
      } else {
        var controlledState = {};
        ['sHandle', 'recent'].forEach(function (item) {
          if (state[item] !== undefined) {
            controlledState[item] = state[item];
          }
        });

        if (Object.keys(controlledState).length) {
          this.setState(controlledState);
        }
      }

      var data = (0, _extends2.default)((0, _extends2.default)({}, this.$data), state);
      var changedValue = data.bounds;

      this.__emit('change', changedValue);
    },
    onStart: function onStart(position) {
      var bounds = this.bounds;

      this.__emit('beforeChange', bounds);

      var value = this.calcValueByPos(position);
      this.startValue = value;
      this.startPosition = position;
      var closestBound = this.getClosestBound(value);
      this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);
      this.setState({
        sHandle: this.prevMovedHandleIndex,
        recent: this.prevMovedHandleIndex
      });
      var prevValue = bounds[this.prevMovedHandleIndex];
      if (value === prevValue) return;
      var nextBounds = (0, _toConsumableArray2.default)(bounds);
      nextBounds[this.prevMovedHandleIndex] = value;
      this.onChange({
        bounds: nextBounds
      });
    },
    onEnd: function onEnd(force) {
      var sHandle = this.sHandle;
      this.removeDocumentEvents();

      if (sHandle !== null || force) {
        this.__emit('afterChange', this.bounds);
      }

      this.setState({
        sHandle: null
      });
    },
    onMove: function onMove(e, position) {
      utils.pauseEvent(e);
      var bounds = this.bounds,
          sHandle = this.sHandle;
      var value = this.calcValueByPos(position);
      var oldValue = bounds[sHandle];
      if (value === oldValue) return;
      this.moveTo(value);
    },
    onKeyboard: function onKeyboard(e) {
      var _this$$props = this.$props,
          reverse = _this$$props.reverse,
          vertical = _this$$props.vertical;
      var valueMutator = utils.getKeyboardValueMutator(e, vertical, reverse);

      if (valueMutator) {
        utils.pauseEvent(e);
        var bounds = this.bounds,
            sHandle = this.sHandle;
        var oldValue = bounds[sHandle === null ? this.recent : sHandle];
        var mutatedValue = valueMutator(oldValue, this.$props);

        var value = _trimAlignValue({
          value: mutatedValue,
          handle: sHandle,
          bounds: bounds,
          props: this.$props
        });

        if (value === oldValue) return;
        var isFromKeyboardEvent = true;
        this.moveTo(value, isFromKeyboardEvent);
      }
    },
    getClosestBound: function getClosestBound(value) {
      var bounds = this.bounds;
      var closestBound = 0;

      for (var i = 1; i < bounds.length - 1; ++i) {
        if (value > bounds[i]) {
          closestBound = i;
        }
      }

      if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
        closestBound += 1;
      }

      return closestBound;
    },
    getBoundNeedMoving: function getBoundNeedMoving(value, closestBound) {
      var bounds = this.bounds,
          recent = this.recent;
      var boundNeedMoving = closestBound;
      var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];

      if (isAtTheSamePoint && bounds[recent] === bounds[closestBound]) {
        boundNeedMoving = recent;
      }

      if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
        boundNeedMoving = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
      }

      return boundNeedMoving;
    },
    getLowerBound: function getLowerBound() {
      return this.bounds[0];
    },
    getUpperBound: function getUpperBound() {
      var bounds = this.bounds;
      return bounds[bounds.length - 1];
    },

    /**
     * Returns an array of possible slider points, taking into account both
     * `marks` and `step`. The result is cached.
     */
    getPoints: function getPoints() {
      var marks = this.marks,
          step = this.step,
          min = this.min,
          max = this.max;
      var cache = this._getPointsCache;

      if (!cache || cache.marks !== marks || cache.step !== step) {
        var pointsObject = (0, _extends2.default)({}, marks);

        if (step !== null) {
          for (var point = min; point <= max; point += step) {
            pointsObject[point] = point;
          }
        }

        var points = Object.keys(pointsObject).map(parseFloat);
        points.sort(function (a, b) {
          return a - b;
        });
        this._getPointsCache = {
          marks: marks,
          step: step,
          points: points
        };
      }

      return this._getPointsCache.points;
    },
    moveTo: function moveTo(value, isFromKeyboardEvent) {
      var _this3 = this;

      var nextBounds = (0, _toConsumableArray2.default)(this.bounds);
      var sHandle = this.sHandle,
          recent = this.recent;
      var handle = sHandle === null ? recent : sHandle;
      nextBounds[handle] = value;
      var nextHandle = handle;

      if (this.$props.pushable !== false) {
        this.pushSurroundingHandles(nextBounds, nextHandle);
      } else if (this.$props.allowCross) {
        nextBounds.sort(function (a, b) {
          return a - b;
        });
        nextHandle = nextBounds.indexOf(value);
      }

      this.onChange({
        recent: nextHandle,
        sHandle: nextHandle,
        bounds: nextBounds
      });

      if (isFromKeyboardEvent) {
        // known problem: because setState is async,
        // so trigger focus will invoke handler's onEnd and another handler's onStart too early,
        // cause onBeforeChange and onAfterChange receive wrong value.
        // here use setState callback to hack，but not elegant
        this.__emit('afterChange', nextBounds);

        this.setState({}, function () {
          _this3.handlesRefs[nextHandle].focus();
        });
        this.onEnd();
      }
    },
    pushSurroundingHandles: function pushSurroundingHandles(bounds, handle) {
      var value = bounds[handle];
      var threshold = this.pushable;
      threshold = Number(threshold);
      var direction = 0;

      if (bounds[handle + 1] - value < threshold) {
        direction = +1; // push to right
      }

      if (value - bounds[handle - 1] < threshold) {
        direction = -1; // push to left
      }

      if (direction === 0) {
        return;
      }

      var nextHandle = handle + direction;
      var diffToNext = direction * (bounds[nextHandle] - value);

      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // revert to original value if pushing is impossible
        bounds[handle] = bounds[nextHandle] - direction * threshold;
      }
    },
    pushHandle: function pushHandle(bounds, handle, direction, amount) {
      var originalValue = bounds[handle];
      var currentValue = bounds[handle];

      while (direction * (currentValue - originalValue) < amount) {
        if (!this.pushHandleOnePoint(bounds, handle, direction)) {
          // can't push handle enough to create the needed `amount` gap, so we
          // revert its position to the original value
          bounds[handle] = originalValue;
          return false;
        }

        currentValue = bounds[handle];
      } // the handle was pushed enough to create the needed `amount` gap


      return true;
    },
    pushHandleOnePoint: function pushHandleOnePoint(bounds, handle, direction) {
      var points = this.getPoints();
      var pointIndex = points.indexOf(bounds[handle]);
      var nextPointIndex = pointIndex + direction;

      if (nextPointIndex >= points.length || nextPointIndex < 0) {
        // reached the minimum or maximum available point, can't push anymore
        return false;
      }

      var nextHandle = handle + direction;
      var nextValue = points[nextPointIndex];
      var threshold = this.pushable;
      var diffToNext = direction * (bounds[nextHandle] - nextValue);

      if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
        // couldn't push next handle, so we won't push this one either
        return false;
      } // push the handle


      bounds[handle] = nextValue;
      return true;
    },
    trimAlignValue: function trimAlignValue(value) {
      var sHandle = this.sHandle,
          bounds = this.bounds;
      return _trimAlignValue({
        value: value,
        handle: sHandle,
        bounds: bounds,
        props: this.$props
      });
    },
    ensureValueNotConflict: function ensureValueNotConflict(handle, val, _ref2) {
      var allowCross = _ref2.allowCross,
          thershold = _ref2.pushable;
      var state = this.$data || {};
      var bounds = state.bounds;
      handle = handle === undefined ? state.sHandle : handle;
      thershold = Number(thershold);
      /* eslint-disable eqeqeq */

      if (!allowCross && handle != null && bounds !== undefined) {
        if (handle > 0 && val <= bounds[handle - 1] + thershold) {
          return bounds[handle - 1] + thershold;
        }

        if (handle < bounds.length - 1 && val >= bounds[handle + 1] - thershold) {
          return bounds[handle + 1] - thershold;
        }
      }
      /* eslint-enable eqeqeq */


      return val;
    },
    getTrack: function getTrack(_ref3) {
      var bounds = _ref3.bounds,
          prefixCls = _ref3.prefixCls,
          reverse = _ref3.reverse,
          vertical = _ref3.vertical,
          included = _ref3.included,
          offsets = _ref3.offsets,
          trackStyle = _ref3.trackStyle;
      return bounds.slice(0, -1).map(function (_, index) {
        var _classNames;

        var i = index + 1;
        var trackClassName = (0, _classNames3.default)((_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-track"), true), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-track-").concat(i), true), _classNames));
        return (0, _vue.createVNode)(_Track.default, {
          "class": trackClassName,
          "vertical": vertical,
          "reverse": reverse,
          "included": included,
          "offset": offsets[i - 1],
          "length": offsets[i] - offsets[i - 1],
          "style": trackStyle[index],
          "key": i
        }, null);
      });
    },
    renderSlider: function renderSlider() {
      var _this4 = this;

      var sHandle = this.sHandle,
          bounds = this.bounds,
          prefixCls = this.prefixCls,
          vertical = this.vertical,
          included = this.included,
          disabled = this.disabled,
          min = this.min,
          max = this.max,
          reverse = this.reverse,
          handle = this.handle,
          defaultHandle = this.defaultHandle,
          trackStyle = this.trackStyle,
          handleStyle = this.handleStyle,
          tabindex = this.tabindex;
      var handleGenerator = handle || defaultHandle;
      var offsets = bounds.map(function (v) {
        return _this4.calcOffset(v);
      });
      var handleClassName = "".concat(prefixCls, "-handle");
      var handles = bounds.map(function (v, i) {
        var _classNames2;

        var _tabIndex = tabindex[i] || 0;

        if (disabled || tabindex[i] === null) {
          _tabIndex = null;
        }

        return handleGenerator({
          class: (0, _classNames3.default)((_classNames2 = {}, (0, _defineProperty2.default)(_classNames2, handleClassName, true), (0, _defineProperty2.default)(_classNames2, "".concat(handleClassName, "-").concat(i + 1), true), _classNames2)),
          prefixCls: prefixCls,
          vertical: vertical,
          offset: offsets[i],
          value: v,
          dragging: sHandle === i,
          index: i,
          tabindex: _tabIndex,
          min: min,
          max: max,
          reverse: reverse,
          disabled: disabled,
          style: handleStyle[i],
          ref: function ref(h) {
            return _this4.saveHandle(i, h);
          },
          onFocus: _this4.onFocus,
          onBlur: _this4.onBlur
        });
      });
      return {
        tracks: this.getTrack({
          bounds: bounds,
          prefixCls: prefixCls,
          reverse: reverse,
          vertical: vertical,
          included: included,
          offsets: offsets,
          trackStyle: trackStyle
        }),
        handles: handles
      };
    }
  }
};

var _default = (0, _createSlider.default)(Range);

exports.default = _default;