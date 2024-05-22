"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = void 0;

var _vue = require("vue");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfirmDialog = _interopRequireDefault(require("./ConfirmDialog"));

var _Modal = require("./Modal");

var _omit = _interopRequireDefault(require("omit.js"));

var confirm = function confirm(config) {
	var div = document.createElement('div');
	document.body.appendChild(div);
	var currentConfig = (0, _extends2.default)((0, _extends2.default)({}, (0, _omit.default)(config, ['parentContext', 'appContext'])), {
		close: close,
		visible: true
	});
	var confirmDialogInstance = null;

	function close() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		currentConfig = (0, _extends2.default)((0, _extends2.default)({}, currentConfig), {
			visible: false,
			afterClose: destroy.bind.apply(destroy, [this].concat(args))
		});
		update(currentConfig);
	}

	function update(newConfig) {
		currentConfig = (0, _extends2.default)((0, _extends2.default)({}, currentConfig), newConfig);

		if (confirmDialogInstance) {
			_vue.render(_vue.cloneVNode(confirmDialogInstance.component.props, { ...currentConfig }, div))
		}
	}

	function destroy() {
		if (confirmDialogInstance && div.parentNode) {
			(0, _extends2.default)(confirmDialogInstance.component.props, {
				vIf: false
			}); // hack destroy

			//   confirmDialogInstance.component.update();
			confirmDialogInstance = null;
			div.parentNode.removeChild(div);
		}

		for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		var triggerCancel = args.some(function (param) {
			return param && param.triggerCancel;
		});

		if (config.onCancel && triggerCancel) {
			config.onCancel.apply(config, args);
		}

		for (var i = 0; i < _Modal.destroyFns.length; i++) {
			var fn = _Modal.destroyFns[i];

			if (fn === close) {
				_Modal.destroyFns.splice(i, 1);

				break;
			}
		}
	}

	var Wrapper = function Wrapper(p) {
		return p.vIf ? (0, _vue.createVNode)(_ConfirmDialog.default, p, null) : null;
	};

	function render(props) {
		var vm = (0, _vue.createVNode)(Wrapper, (0, _extends2.default)((0, _extends2.default)({}, props), {
			vIf: true
		}));
		vm.appContext = config.parentContext || config.appContext || vm.appContext;
		(0, _vue.render)(vm, div);
		return vm;
	}

	confirmDialogInstance = render(currentConfig);

	_Modal.destroyFns.push(close);

	return {
		destroy: close,
		update: update
	};
};

var _default = confirm;
exports.default = _default;