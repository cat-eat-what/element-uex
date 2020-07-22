<template>
    <div class="elx-codemirror" :style="{'width': width, 'height': height}">
        <div ref="elxCodemirror" :style="{'height': replaceVisible?'calc(100% - 78px)':(searchVisible?'calc(100% - 46px)':'100%')}" class="elx-codemirror-content" @contextmenu="contextmenu">
          <textarea></textarea>
        </div>
        <div class="elx-codemirror-search-content search" v-show="searchVisible">
            <div class="form">
              <el-form :model="searchData" label-width="70px" label-suffix=":">
                <el-form-item label="查找内容">
                  <el-input type="textarea" :rows="1" v-model="searchData.search"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="button-group">
              <el-button @click.native="searchNext">查找</el-button>
              <el-button @click.native="searchCancel">取消</el-button>
            </div>
        </div>
        <div class="elx-codemirror-search-content replace" v-show="replaceVisible">
            <div class="form">
              <el-form :model="searchData" label-width="70px" label-suffix=":">
                <el-form-item label="查找内容">
                  <el-input type="textarea" :rows="1" v-model="searchData.search"></el-input>
                </el-form-item>
                <el-form-item label="替换内容">
                  <el-input type="textarea" :rows="1" v-model="searchData.replace"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="button-group">
              <el-button @click.native="searchNext">查找</el-button>
              <el-button @click.native="replace">替换</el-button>
              <el-button @click.native="replaceAll">替换所有</el-button>
              <el-button @click.native="replaceCancel">取消</el-button>
            </div>
        </div>
        <elx-context-menu @action="action"  :data="currentActionData" :width="90" :visible="contentMenuShow" :x="pos.x" :y="pos.y"></elx-context-menu>
    </div>
</template>

<script>
  var CodeMirror = require('codemirror/lib/codemirror');
  var sqlFormatter = require('sql-formatter');
  var js_beautify = require('js-beautify/js/lib/beautify');
  var css_beautify = require('js-beautify/js/lib/beautify-css');
  var html_beautify = require('js-beautify/js/lib/beautify-html');
  
  import './extend.js';
  import _ from 'underscore';

  export default {
    name: 'ElxCodemirror',
    componentName: 'ElxCodemirror',

    props: {
      value: {
        type: String,
        default: ''
      },
      option: {
        type: Object,
        default: function() {
          return {};
        }
      },
      width: {
        type: [String, Number],
        default: '100%'
      },
      height: {
        type: [String, Number],
        default: '100px'
      },
      actionData: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    data: function() {
      return {
        codemirror: null,
        defaultOption: {
          mode: 'javascript',
          lineNumbers: true,
          styleActiveLine: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          extraKeys: {
            'Ctrl-F11': function(cm) {
              cm.setOption('fullScreen', !cm.getOption('fullScreen'));
            },
            'Esc': function(cm) {
              if (cm.getOption('fullScreen')) {
                cm.setOption('fullScreen', false);
              }
            },
            'Ctrl-Q': function(cm) {
              cm.foldCode(cm.getCursor());
            }
          }
        },
        currentActionData: [],
        defaultActionData: [
          {
            'label': '格式化',
            'action': 'codeMirrorFormat'
          },
          {
            'label': '查找',
            'action': 'codeMirrorSearch'
          },
          {
            'label': '替换',
            'action': 'codeMirrorReplace'
          }
        ],
        contentMenuShow: false,
        pos: {
          x: 0,
          y: 0
        },
        searchVisible: false,
        replaceVisible: false,
        searchData: {
          search: null,
          replace: null
        }
      };
    },
    methods: {
      getEventPos: function(e) {
        var x = e.clientX;
        var y = e.clientY;
        return { 'x': x, 'y': y };
      },
      contextmenu: function(event) {
        var e = event || window.event;
        var pos = this.getEventPos(e);
        if (e.which === 3) {
          this.contentMenuShow = false;
          this.pos.x = pos.x;
          this.pos.y = pos.y;
          this.contentMenuShow = true;
        }
        this.preventDefault(e);
        e.returnValue = false;
        return false;
      },
      preventDefault: function(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnvalue = false;
        }
      },
      action: function(data) {
        if (typeof data.action === 'function') {
          data.action(this);
        } else if (typeof this[data.action] === 'function') {
          this[data.action]();
        }
        this.contentMenuShow = false;
      },
      getSelectedRange: function() {
        return { from: this.codemirror.getCursor(true), to: this.codemirror.getCursor(false) };
      },
      codeMirrorFormat: function() {
        var range = this.getSelectedRange();
        var cm = this.codemirror;
        var from = range.from;
        var to = range.to;
        var out;
        if (this.codemirror.getMode().name === 'sql') {
          if (sqlFormatter) {
            out = sqlFormatter.format(cm.getRange(from, to));
          }
        } else if (this.codemirror.getMode().name === 'javascript') {
          if (js_beautify) {
            out = js_beautify(cm.getRange(from, to));
          }
        } else if (this.codemirror.getMode().name === 'css') {
          if (css_beautify) {
            out = css_beautify(cm.getRange(from, to));
          }
        } else if (this.codemirror.getMode().name === 'html') {
          if (html_beautify) {
            out = html_beautify(cm.getRange(from, to));
          }
        }
        if (out) {
          cm.operation(function() {
            cm.replaceRange(out, from, to);
            cm.setSelection(from, cm.getCursor(false));
          });
        } else {
          this.codemirror.autoFormatRange(from, to);
        }
      },
      codeMirrorSearch: function() {
        this.replaceVisible = false;
        this.searchVisible = true;
      },
      codeMirrorReplace: function() {
        this.searchVisible = false;
        this.replaceVisible = true;
      },
      searchNext: function() {
        CodeMirror.extends.find(this.codemirror, this.searchData);
      },
      replace: function() {
        CodeMirror.extends.replace(this.codemirror, this.searchData);
      },
      replaceAll: function() {
        CodeMirror.extends.replaceAll(this.codemirror, this.searchData);
      },
      searchCancel: function() {
        this.searchVisible = false;
        CodeMirror.extends.clearSearch(this.codemirror);
      },
      replaceCancel: function() {
        this.replaceVisible = false;
        CodeMirror.extends.clearSearch(this.codemirror);
      },
      renderCodemirror: function() {
        var self = this;
        var option = _.extend({}, this.defaultOption, this.option);
        this.codemirror = CodeMirror.fromTextArea(this.$refs['elxCodemirror'].children[0], option);
        this.codemirror.setValue(this.value || '');
        this.codemirror.on('change', function() {
          self.$emit('input', this.codemirror.getValue());
          if (self.value !== this.codemirror.getValue()) {
            self.$emit('change', this.codemirror.getValue());
          }
        }.bind(this));
      },
      setActionData: function() {
        this.currentActionData = this.actionData ? (this.defaultActionData).concat(this.actionData) : this.defaultActionData;
      }
    },
    watch: {
      value: function() {
        if (this.codemirror.getValue() !== this.value) {
          this.codemirror.setValue(this.value || '');
        }
      },
      option: function() {
        this.renderCodemirror();
      },
      actionData: function() {
        this.setActionData();
      }
    },
    created: function() {
      js_beautify = js_beautify ? (js_beautify['js_beautify'] || js_beautify) : null;
      css_beautify = css_beautify ? (css_beautify['css_beautify'] || css_beautify) : null;
      html_beautify = html_beautify ? (html_beautify['html_beautify'] || html_beautify) : null;
    },
    mounted: function() {
      var self = this;
      this.renderCodemirror();
      this.$nextTick(function() {
        var el = document.body;
        var handleDisplay = function() {
          self.contentMenuShow = false;
        };
        if (el.addEventListener) {
          el.addEventListener('click', handleDisplay);
        } else if (el.attachEvent) {
          el.attachEvent('onclick', handleDisplay);
        }
      });
      this.setActionData();
    }
  };
</script>

