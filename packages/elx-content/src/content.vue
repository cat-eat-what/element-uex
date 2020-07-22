<template>
  <div class="elx-content">
    <div class="content-header">
        <span class="content-title" v-html="currentType=='list'?listTitle:createTitle"></span>
        <span class="content-back"  v-if="currentType=='create'" @click="backHref"><span class="uex-icon-back"></span>回到{{listTitle}}</span>
        <div class="content-add-button" @click="newPage" v-if="currentType=='list'">
            <el-tooltip effect="light" :content="iconLabel" placement="bottom">
                <i  :class="icon"></i>
            </el-tooltip>
        </div>
    </div>
    <div class="iframe-content">
        <div :class="currentType">
            <elx-main>
              <slot name="content"></slot>
            </elx-main>
            <iframe id="elx-sub-content" class="elx-sub-content"></iframe>
        </div>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery');
  import { cMessage } from 'packages/elx-menu/src/util';
  export default {
    name: 'ElxContent',
    componentName: 'ElxContent',

    props: {
      listTitle: {
        type: String,
        default: 'list'
      },
      createTitle: {
        type: String,
        default: 'create'
      },
      type: {
        type: String,
        default: 'list'
      },
      src: {
        type: String,
        default: ''
      },
      locationOrigin: {
        type: String,
        default: ''
      },
      iconLabel: {
        type: String,
        default: '新增'
      },
      icon: {
        type: String,
        default: 'uex-icon-add'
      }
    },
    data: function() {
      return {
        currentType: this.type,
        isPostChild: false,
        isPostChildData: {}
      };
    },
    methods: {
      'backHref': function() {
        this.currentType = 'list';
        this.$emit('back-href');
      },
      'newPage': function() {
        this.currentType = 'create';
        this.$emit('create');
      }
    },
    watch: {
      'type': function(val, oldVal) {
        this.currentType = val;
      },
      'currentType': function(val, oldVal) {
        this.$emit('update:type', val);
        if (val === 'create') {
          $('iframe.elx-sub-content').attr('src', this.src);
          this.$emit('end-load');
        }
      }
    },
    created: function() {
      var _self = this;
      cMessage.receiveMessage(function(message) {
        if (typeof message.data === 'object' && !Array.isArray(message.data)) {
          if (message.data.director === 'backToList') {
            _self.backHref();
          }
          if (message.data.handUp) {
            if (window.top !== window.self) {
              cMessage.postMessage(message.data, location.origin, parent);
            }
          } else {
            if (message.data.menuActive) {
              cMessage.postMessage(message.data, location.origin, parent);
            }
          }
          if (_self.isPostChild) {
            if (message.data.frameLoaded) {
              cMessage.postMessage(_self.isPostChildData, location.origin, document.getElementById('elx-sub-content').contentWindow);
              _self.isPostChild = false;
            }
          }
          if (message.data.menuActive) {
            if (message.data.func) {
              _self.isPostChild = true;
              _self.isPostChildData = message.data;
            }
          }
        }
        _self.$emit('receive-message', message);
      }, this.locationOrigin);
    }
  };
</script>

