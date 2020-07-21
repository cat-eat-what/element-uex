import Vue from 'vue';
import ElxContextMenu from 'element-uex/packages/elx-context-menu/src/index.vue';
let Mask = Vue.extend(ElxContextMenu);

exports.install = Vue => {
  const getEventPos = function(e) {
    const x = e.clientX;
    const y = e.clientY;
    return { 'x': x, 'y': y };
  };
  const preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnvalue = false;
    }
  };
  const addEvent = function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, function() {
        handler.call(element);
      });
    } else {
      element['on' + type] = handler;
    }
  };
  const updateData = function(mask, binding, nodeData) {
    mask.data = binding.value;
    mask.width = Number(nodeData.attrs['contextmenu-width']);
    mask.tipShow = 'tip' in binding.modifiers ? binding.modifiers.tip : false;
  };
  Vue.directive('contextmenu', {
    bind: function(el, binding, vnode) {
      if (el) {
        el.binding = binding;
        addEvent(el, 'contextmenu', function(e) {
          e.preventDefault();
          e.stopPropagation();
          let mask;
          const state = !el.instance;
          if (state) {
            mask = new Mask({
              el: document.createElement('div'),
              methods: {
                action: function(data) {
                  vnode.componentInstance.$emit('contextmenu-action', data);
                  mask.visible = false;
                }
              }
            });
          } else {
            mask = el.instance;
          }

          el.instance = mask;
          el.mask = mask.$el;
          el.maskStyle = {};

          vnode.componentInstance.$emit('exec-contextmenu', el, vnode);

          e = e || window.event;
          var pos = getEventPos(e);
          if (e.which === 3) {
            mask.visible = false;
            mask.x = pos.x;
            mask.y = pos.y;
            updateData(mask, el.binding, vnode.data);
            mask.visible = true;
          }
          preventDefault(e);
          e.returnValue = false;

          if (state) {
            document.body.appendChild(el.mask);
          }
          return false;
        });
        addEvent(document.body, 'click', function(e) {
          if (el.instance) {
            el.instance.visible = false;
          }
        });
        addEvent(window, 'scroll', function(e) {
          if (el.instance) {
            el.instance.visible = false;
          }
        });
      }
    },

    update: function(el, binding, vnode) {
      if (el.instance) {
        el.binding = binding;
        updateData(el.instance, el.binding, vnode.data);
      }
    },

    unbind: function(el, binding) {
      if (el.instance) {
        document.body.removeChild(el.mask);
      }
    }
  });
};
