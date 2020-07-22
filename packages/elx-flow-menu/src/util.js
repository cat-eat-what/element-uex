export const cMessage = (function(event) {
  var interval_id;
  var last_hash;
  var cache_bust = 1;
  var attached_callback;
  return {
    postMessage: function(message, target_url, target) {
      if (!target_url) {
        return;
      }
      target = target || parent;
      if (window['postMessage']) {
        target['postMessage'](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
      } else if (target_url) {
        target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date()) + (cache_bust++) + '&' + message;
      }
    },
    receiveMessage: function(callback, source_origin) {
      if (window['postMessage']) {
        if (callback) {
          attached_callback = function(e) {
            if ((typeof source_origin === 'string' && e.origin !== source_origin) || (Object.prototype.toString.call(source_origin) === '[object Function]' && source_origin(e.origin) === !1)) {
              return !1;
            }
            callback(e);
          };
        }
        if (window['addEventListener']) {
          window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
        } else {
          window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
        }
      } else {
        interval_id && clearInterval(interval_id);
        interval_id = null;
        if (callback) {
          interval_id = setInterval(function() {
            var hash = document.location.hash;
            var re = /^#?\d+&/;
            if (hash !== last_hash && re.test(hash)) {
              last_hash = hash;
              callback({data: hash.replace(re, '')});
            }
          }, 100);
        }
      }
    },
    bindReceiveMessage: function(attr) {
      var isExecFunc = null;
      var base = {};
      if (typeof attr === 'object' && !Array.isArray(attr)) {
        isExecFunc = attr.isExecFunc;
        base = attr.base;
      }
      this.receiveMessage(function(message) {
        if (typeof message.data === 'object' && !Array.isArray(message.data)) {
          if (isExecFunc) {
            if (message.data.func) {
              if (message.data.base) {
                if (message.data.base === 'window') {
                  if (window[message.data.func]) {
                    window[message.data.func](message.data.para);
                  }
                } else {
                  if (base[message.data.func]) {
                    base[message.data.func](message.data.para);
                  }
                }
              }
            }
          }
        }
      });
    }
  };
})();
