import _typeof from "@babel/runtime/helpers/esm/typeof";
import { createVNode as _createVNode } from "vue";
import PropTypes from './vue-types';
import _switchScrollingEffect from './switchScrollingEffect';
import setStyle from './setStyle';
import Portal from './Portal';
import { defineComponent } from 'vue';
var openCount = 0;
var windowIsUndefined = !(typeof window !== 'undefined' && window.document && window.document.createElement); // https://github.com/ant-design/ant-design/issues/19340
// https://github.com/ant-design/ant-design/issues/19332

var cacheOverflow = {};
export default defineComponent({
  name: 'PortalWrapper',
  props: {
    wrapperClassName: PropTypes.string,
    forceRender: PropTypes.looseBool,
    getContainer: PropTypes.any,
    children: PropTypes.func,
    visible: PropTypes.looseBool
  },
  data: function data() {
    this._component = null;
    var visible = this.$props.visible;
    openCount = visible ? openCount + 1 : openCount;
    return {};
  },
  watch: {
    visible: function visible(val) {
      openCount = val ? openCount + 1 : openCount - 1;
    },
    getContainer: function getContainer(_getContainer, prevGetContainer) {
      var getContainerIsFunc = typeof _getContainer === 'function' && typeof prevGetContainer === 'function';

      if (getContainerIsFunc ? _getContainer.toString() !== prevGetContainer.toString() : _getContainer !== prevGetContainer) {
        this.removeCurrentContainer(false);
      }
    }
  },
  updated: function updated() {
    this.setWrapperClassName();
  },
  beforeUnmount: function beforeUnmount() {
    var visible = this.$props.visible; // 离开时不会 render， 导到离开时数值不变，改用 func 。。

    openCount = visible && openCount ? openCount - 1 : openCount;
    this.removeCurrentContainer(visible);
  },
  methods: {
    getParent: function getParent() {
      var getContainer = this.$props.getContainer;

      if (getContainer) {
        if (typeof getContainer === 'string') {
          return document.querySelectorAll(getContainer)[0];
        }

        if (typeof getContainer === 'function') {
          return getContainer();
        }

        if (_typeof(getContainer) === 'object' && getContainer instanceof window.HTMLElement) {
          return getContainer;
        }
      }

      return document.body;
    },
    getDomContainer: function getDomContainer() {
      if (windowIsUndefined) {
        return null;
      }

      if (!this.container) {
        this.container = document.createElement('div');
        var parent = this.getParent();

        if (parent) {
          parent.appendChild(this.container);
        }
      }

      this.setWrapperClassName();
      return this.container;
    },
    setWrapperClassName: function setWrapperClassName() {
      var wrapperClassName = this.$props.wrapperClassName;

      if (this.container && wrapperClassName && wrapperClassName !== this.container.className) {
        this.container.className = wrapperClassName;
      }
    },
    savePortal: function savePortal(c) {
      // Warning: don't rename _component
      // https://github.com/react-component/util/pull/65#discussion_r352407916
      this._component = c;
    },
    removeCurrentContainer: function removeCurrentContainer() {
      this.container = null;
      this._component = null;
    },

    /**
     * Enhance ./switchScrollingEffect
     * 1. Simulate document body scroll bar with
     * 2. Record body has overflow style and recover when all of PortalWrapper invisible
     * 3. Disable body scroll when PortalWrapper has open
     *
     * @memberof PortalWrapper
     */
    switchScrollingEffect: function switchScrollingEffect() {
      if (openCount === 1 && !Object.keys(cacheOverflow).length) {
        _switchScrollingEffect(); // Must be set after switchScrollingEffect


        cacheOverflow = setStyle({
          overflow: 'hidden',
          overflowX: 'hidden',
          overflowY: 'hidden'
        });
      } else if (!openCount) {
        setStyle(cacheOverflow);
        cacheOverflow = {};

        _switchScrollingEffect(true);
      }
    }
  },
  render: function render() {
    var _this$$props = this.$props,
        children = _this$$props.children,
        forceRender = _this$$props.forceRender,
        visible = _this$$props.visible;
    var portal = null;
    var childProps = {
      getOpenCount: function getOpenCount() {
        return openCount;
      },
      getContainer: this.getDomContainer,
      switchScrollingEffect: this.switchScrollingEffect
    };

    if (forceRender || visible || this._component) {
      portal = _createVNode(Portal, {
        "getContainer": this.getDomContainer,
        "children": children(childProps),
        "ref": this.savePortal
      }, null);
    }

    return portal;
  }
});