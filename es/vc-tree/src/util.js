import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _createForOfIteratorHelper from "@babel/runtime/helpers/esm/createForOfIteratorHelper";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode as _createVNode } from "vue";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint no-loop-func: 0*/


import warning from 'warning';
import TreeNode from './TreeNode';
import { getOptionProps, getSlot } from '../../_util/props-util';
var DRAG_SIDE_RANGE = 0.25;
var DRAG_MIN_GAP = 2;
var onlyTreeNodeWarned = false;
export function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return;
  onlyTreeNodeWarned = true;
  warning(false, 'Tree only accept TreeNode as children.');
}
export function arrDel(list, value) {
  var clone = list.slice();
  var index = clone.indexOf(value);

  if (index >= 0) {
    clone.splice(index, 1);
  }

  return clone;
}
export function arrAdd(list, value) {
  var clone = list.slice();

  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }

  return clone;
}
export function posToArr(pos) {
  return pos.split('-');
}
export function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}
export function isTreeNode(node) {
  return node.type && node.type.isTreeNode;
}
export function getNodeChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return children.filter(isTreeNode);
}
export function isCheckDisabled(node) {
  var _ref = getOptionProps(node) || {},
      disabled = _ref.disabled,
      disableCheckbox = _ref.disableCheckbox,
      checkable = _ref.checkable;

  return !!(disabled || disableCheckbox) || checkable === false;
}
export function traverseTreeNodes(treeNodes, callback) {
  function processNode(node, index, parent) {
    var children = node ? getSlot(node) : treeNodes;
    var pos = node ? getPosition(parent.pos, index) : 0; // Filter children

    var childList = getNodeChildren(children); // Process node if is not root

    if (node) {
      var key = node.key;

      if (!key && (key === undefined || key === null)) {
        key = pos;
      }

      var data = {
        node: node,
        index: index,
        pos: pos,
        key: key,
        parentPos: parent.node ? parent.pos : null
      };
      callback(data);
    } // Process children node


    childList.forEach(function (subNode, subIndex) {
      processNode(subNode, subIndex, {
        node: node,
        pos: pos
      });
    });
  }

  processNode(null);
}
/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */

export function mapChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var func = arguments.length > 1 ? arguments[1] : undefined;
  var list = children.map(func);

  if (list.length === 1) {
    return list[0];
  }

  return list;
}
export function getDragNodesKeys(treeNodes, node) {
  var _getOptionProps = getOptionProps(node),
      eventKey = _getOptionProps.eventKey,
      pos = _getOptionProps.pos;

  var dragNodesKeys = [];
  traverseTreeNodes(treeNodes, function (_ref2) {
    var key = _ref2.key;
    dragNodesKeys.push(key);
  });
  dragNodesKeys.push(eventKey || pos);
  return dragNodesKeys;
}
export function calcDropPosition(event, treeNode) {
  var clientY = event.clientY;

  var _treeNode$selectHandl = treeNode.selectHandle.getBoundingClientRect(),
      top = _treeNode$selectHandl.top,
      bottom = _treeNode$selectHandl.bottom,
      height = _treeNode$selectHandl.height;

  var des = Math.max(height * DRAG_SIDE_RANGE, DRAG_MIN_GAP);

  if (clientY <= top + des) {
    return -1;
  }

  if (clientY >= bottom - des) {
    return 1;
  }

  return 0;
}
/**
 * Return selectedKeys according with multiple prop
 * @param selectedKeys
 * @param props
 * @returns [string]
 */

export function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) {
    return undefined;
  }

  var multiple = props.multiple;

  if (multiple) {
    return selectedKeys.slice();
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }

  return selectedKeys;
}
/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */
// function keyListToString (keyList) {
//   if (!keyList) return keyList
//   return keyList.map(key => String(key))
// }

var internalProcessProps = function internalProcessProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _extends(_extends({}, props), {
    class: props.class || props.className,
    style: props.style,
    key: props.key
  });
};

export function convertDataToTree(treeData, processor) {
  if (!treeData) return [];

  var _ref3 = processor || {},
      _ref3$processProps = _ref3.processProps,
      processProps = _ref3$processProps === void 0 ? internalProcessProps : _ref3$processProps;

  var list = Array.isArray(treeData) ? treeData : [treeData];
  return list.map(function (_a) {
    var children = _a.children,
        props = __rest(_a, ["children"]);

    var childrenNodes = convertDataToTree(children, processor);
    return _createVNode(TreeNode, processProps(props), {
      default: function _default() {
        return [childrenNodes];
      }
    });
  });
} // TODO: ========================= NEW LOGIC =========================

/**
 * Calculate treeNodes entities. `processTreeEntity` is used for `rc-tree-select`
 * @param treeNodes
 * @param processTreeEntity  User can customize the entity
 */

export function convertTreeToEntities(treeNodes) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      initWrapper = _ref4.initWrapper,
      processEntity = _ref4.processEntity,
      onProcessFinished = _ref4.onProcessFinished;

  var posEntities = new Map();
  var keyEntities = new Map();
  var wrapper = {
    posEntities: posEntities,
    keyEntities: keyEntities
  };

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }

  traverseTreeNodes(treeNodes, function (item) {
    var node = item.node,
        index = item.index,
        pos = item.pos,
        key = item.key,
        parentPos = item.parentPos;
    var entity = {
      node: node,
      index: index,
      key: key,
      pos: pos
    };
    posEntities.set(pos, entity);
    keyEntities.set(key, entity); // Fill children

    entity.parent = posEntities.get(parentPos);

    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }

    if (processEntity) {
      processEntity(entity, wrapper);
    }
  });

  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }

  return wrapper;
}
/**
 * Parse `checkedKeys` to { checkedKeys, halfCheckedKeys } style
 */

export function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  } // Convert keys to object format


  var keyProps;

  if (Array.isArray(keys)) {
    // [Legacy] Follow the api doc
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (_typeof(keys) === 'object') {
    keyProps = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
    };
  } else {
    warning(false, '`checkedKeys` is not an array or an object');
    return null;
  } // keyProps.checkedKeys = keyListToString(keyProps.checkedKeys)
  // keyProps.halfCheckedKeys = keyListToString(keyProps.halfCheckedKeys)


  return keyProps;
}
/**
 * Conduct check state by the keyList. It will conduct up & from the provided key.
 * If the conduct path reach the disabled or already checked / unchecked node will stop conduct.
 * @param keyList       list of keys
 * @param isCheck       is check the node or not
 * @param keyEntities   parsed by `convertTreeToEntities` function in Tree
 * @param checkStatus   Can pass current checked status for process (usually for uncheck operation)
 * @returns {{checkedKeys: [], halfCheckedKeys: []}}
 */

export function conductCheck(keyList, isCheck, keyEntities) {
  var checkStatus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var checkedKeys = new Map();
  var halfCheckedKeys = new Map(); // Record the key has some child checked (include child half checked)

  (checkStatus.checkedKeys || []).forEach(function (key) {
    checkedKeys.set(key, true);
  });
  (checkStatus.halfCheckedKeys || []).forEach(function (key) {
    halfCheckedKeys.set(key, true);
  }); // Conduct up

  function conductUp(key) {
    if (checkedKeys.get(key) === isCheck) return;
    var entity = keyEntities.get(key);
    if (!entity) return;
    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    if (isCheckDisabled(node)) return; // Check child node checked status

    var everyChildChecked = true;
    var someChildChecked = false; // Child checked or half checked

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (_ref5) {
      var childKey = _ref5.key;
      var childChecked = checkedKeys.get(childKey);
      var childHalfChecked = halfCheckedKeys.get(childKey);
      if (childChecked || childHalfChecked) someChildChecked = true;
      if (!childChecked) everyChildChecked = false;
    }); // Update checked status

    if (isCheck) {
      checkedKeys.set(key, everyChildChecked);
    } else {
      checkedKeys.set(key, false);
    }

    halfCheckedKeys.set(key, someChildChecked);

    if (parent) {
      conductUp(parent.key);
    }
  } // Conduct down


  function conductDown(key) {
    if (checkedKeys.get(key) === isCheck) return;
    var entity = keyEntities.get(key);
    if (!entity) return;
    var children = entity.children,
        node = entity.node;
    if (isCheckDisabled(node)) return;
    checkedKeys.set(key, isCheck);
    (children || []).forEach(function (child) {
      conductDown(child.key);
    });
  }

  function conduct(key) {
    var entity = keyEntities.get(key);

    if (!entity) {
      warning(false, "'".concat(key, "' does not exist in the tree."));
      return;
    }

    var children = entity.children,
        parent = entity.parent,
        node = entity.node;
    checkedKeys.set(key, isCheck);
    if (isCheckDisabled(node)) return; // Conduct down

    (children || []).filter(function (child) {
      return !isCheckDisabled(child.node);
    }).forEach(function (child) {
      conductDown(child.key);
    }); // Conduct up

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conduct(key);
  });
  var checkedKeyList = [];
  var halfCheckedKeyList = []; // Fill checked list

  var _iterator = _createForOfIteratorHelper(checkedKeys),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      if (value) {
        checkedKeyList.push(key);
      }
    } // Fill half checked list

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(halfCheckedKeys),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          _key = _step2$value[0],
          _value = _step2$value[1];

      if (!checkedKeys.get(_key) && _value) {
        halfCheckedKeyList.push(_key);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  };
}
/**
 * If user use `autoExpandParent` we should get the list of parent node
 * @param keyList
 * @param keyEntities
 */

export function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = new Map();

  function conductUp(key) {
    if (expandedKeys.get(key)) return;
    var entity = keyEntities.get(key);
    if (!entity) return;
    expandedKeys.set(key, true);
    var parent = entity.parent,
        node = entity.node;
    var props = getOptionProps(node);
    if (props && props.disabled) return;

    if (parent) {
      conductUp(parent.key);
    }
  }

  (keyList || []).forEach(function (key) {
    conductUp(key);
  });
  return _toConsumableArray(expandedKeys.keys());
}
/**
 * Returns only the data- and aria- key/value pairs
 * @param {object} props
 */

export function getDataAndAria(props) {
  return Object.keys(props).reduce(function (prev, key) {
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      prev[key] = props[key];
    }

    return prev;
  }, {});
}