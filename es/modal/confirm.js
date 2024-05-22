import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode } from "vue";
import { createVNode, render as vueRender, cloneVNode } from 'vue';
import ConfirmDialog from './ConfirmDialog';
import { destroyFns } from './Modal';
import Omit from 'omit.js';

var confirm = function confirm(config) {
	var div = document.createElement('div');
	document.body.appendChild(div);

	var currentConfig = _extends(_extends({}, Omit(config, ['parentContext', 'appContext'])), {
		close: close,
		visible: true
	});

	var confirmDialogInstance = null;

	function close() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		currentConfig = _extends(_extends({}, currentConfig), {
			visible: false,
			afterClose: destroy.bind.apply(destroy, [this].concat(args))
		});
		update(currentConfig);
	}

	function update(newConfig) {
		currentConfig = _extends(_extends({}, currentConfig), newConfig);

		if (confirmDialogInstance) {
			vueRender(cloneVNode(confirmDialogInstance.component.props, { ...currentConfig }), div)

		}
	}

	function destroy() {
		if (confirmDialogInstance && div.parentNode) {
			_extends(confirmDialogInstance.component.props, {
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

		for (var i = 0; i < destroyFns.length; i++) {
			var fn = destroyFns[i];

			if (fn === close) {
				destroyFns.splice(i, 1);
				break;
			}
		}
	}

	var Wrapper = function Wrapper(p) {
		return p.vIf ? _createVNode(ConfirmDialog, p, null) : null;
	};

	function render(props) {
		var vm = createVNode(Wrapper, _extends(_extends({}, props), {
			vIf: true
		}));
		vm.appContext = config.parentContext || config.appContext || vm.appContext;
		vueRender(vm, div);
		return vm;
	}

	confirmDialogInstance = render(currentConfig);
	destroyFns.push(close);
	return {
		destroy: close,
		update: update
	};
};

export default confirm;