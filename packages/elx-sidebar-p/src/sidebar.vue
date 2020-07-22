<template>
  <div class="elx-siderbar-p" :class="currentShow?'show':'hide'">
    <div class="elx-siderbar-content">
      <div class="elx-sidebar-intro">
        <div class="elx-siderbar-title" @click="operateSidebar">
          <span v-show="!currentShow" class="uex-icon uex-icon-d-arrow-right"></span>
          <span v-html="title"></span>
        </div>
        <el-tooltip class="item" :open-delay="1000" effect="light" :content="descr" placement="right">
          <div class="elx-siderbar-descr" v-show="descr!=''" v-html="getCurDesc(descr)"></div>
        </el-tooltip>
        <div class="separate"></div>
      </div>
      <elx-menu :style="{height: height}"  v-on:menu-change="menuChange" :menu-active="menuActive" :menu-open='menuOpen' :menu-data="menuData" :menu-type="menuType" :guide-arrow-show="guideArrowShow"></elx-menu> 
      
      <div class="elx-narrow-sidebar">
        <ul>
          <narrow-sidebar v-on:menu-change="menuChange" v-for = "(model,index) in menuData" :key="index" :model="model"></narrow-sidebar>
        </ul>      
      </div>
    </div>
    <div class="elx-sidebar-operate" @click="operateSidebar">
      <div class="elx-sidebar-operate-back"></div>
      <span class="uex-icon-d-arrow-left"></span>
    </div>
  </div>
</template>

<script>
  import { cMessage } from 'packages/elx-menu/src/util';
  import NarrowSidebar from './narrow-sidebar';
  var $ = require('jquery');

  export default {
    name: 'ElxSidebarP',
    componentName: 'ElxSidebarP',
    components: {
      NarrowSidebar
    },
    props: {
      isPost: {
        type: Boolean,
        default: false
      },
      message: {
        type: [Array, Object, Number, String],
        default: ''
      },
      locationOrigin: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '暂无'
      },
      descr: {
        type: String,
        default: '暂无'
      },
      menuData: {
        type: Array,
        default: []
      },
      menuActive: {
        type: String,
        default: ''
      },
      menuOpen: {
        type: String,
        default: ''
      },
      guideArrowShow: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
        currentShow: this.show,
        menuType: 'outer',
        height: '0px'
      };
    },
    methods: {
      getCurDesc: function(str) {
        var realLength = 0;
        var len = str.length;
        var charCode = -1;
        var sub = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode > 0 && charCode < 129) {
            realLength += 1;
          } else {
            realLength += 2;
          }
          if (realLength > 68 && sub === -1) {
            sub = i;
          }
        }
        return sub !== -1 ? this.descr.substring(0, sub) + '..' : this.descr;
      },
      menuChange: function(model) {
        this.$emit('menu-change', model);
        this.$emit('update:menuActive', model.modelcode);
      },
      operateSidebar: function(judge) {
        var _self = this;
        this.currentShow = typeof judge === 'boolean' ? judge : !this.currentShow;
        setTimeout(function() {
          _self.changeSidebarHeight();
        }, 200);
        this.$emit('sidebar-open', this.currentShow);
      },
      postMessage: function() {
        if (this.isPost) {
          cMessage.postMessage(this.message, this.locationOrigin, parent);
        }
      },
      bindPostMessage: function() {
        var _self = this;
        cMessage.receiveMessage(function(message) {
          if (typeof message.data === 'object' && !Array.isArray(message.data)) {
            if ('menuType' in message.data) {
              if (window.top !== window.self) {
                cMessage.postMessage(message.data, _self.locationOrigin, parent);
              }
              if (message.data.menuType === 'narrow') {
                _self.operateSidebar(false);
              }
            } else if ('menuActive' in message.data) {
              _self.$emit('update:menuActive', message.data.menuActive);
            }
          }
          _self.$emit('receive-message', message);
        }, _self.locationOrigin);
      },
      changeSidebarHeight: function() {
        this.height = (window.parseFloat($('.elx-siderbar-p').height()) - window.parseFloat($('.elx-siderbar-p .elx-sidebar-intro').height()) - 10) + 'px';
      }
    },
    watch: {
      'isPost': function(val, oldVal) {
        this.postMessage();
      },
      'currentShow': function(val, oldVal) {
        this.$emit('update:show', val);
      },
      'show': function(val, oldVal) {
        this.currentShow = val;
      },
      'descr': function() {
        this.changeSidebarHeight();
      }
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        _self.changeSidebarHeight();
        $(window).on('resize', function(event) {
          _self.changeSidebarHeight();
        });
      });
    },
    created: function() {
      this.postMessage();
      this.bindPostMessage();
    }
  };
</script>

