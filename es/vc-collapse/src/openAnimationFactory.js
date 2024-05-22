import cssAnimation from '../../_util/css-animation';

function animate(node, show, transitionName, done) {
  var height;
  return cssAnimation(node, transitionName, {
    start: function start() {
      if (!show) {
        node.style.height = "".concat(node.offsetHeight, "px");
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
      }
    },
    active: function active() {
      node.style.height = "".concat(show ? height : 0, "px");
    },
    end: function end() {
      node.style.height = '';
      done();
    }
  });
}

function animation(prefixCls) {
  return {
    onEnter: function onEnter(node, done) {
      return animate(node, true, "".concat(prefixCls, "-anim"), done);
    },
    onLeave: function onLeave(node, done) {
      return animate(node, false, "".concat(prefixCls, "-anim"), done);
    }
  };
}

export default animation;