<template>
  <div class="elx-cron" v-clickoutside="handleClose">
    <el-input ref="reference" v-model="currentValue" @focus="visible = true" @keydown.esc.prevent.native="visible = false" style="width: 100%" :disabled="disabled" :placeholder="placeholder"></el-input>
    <transition name="md-fade-bottom" @after-leave="doDestroy">
      <cron ref="popper" v-show="visible" :cycle="cycle" :visible-types="visibleTypes" :run-time-url="runTimeUrl" :visible.sync="visible" v-model="currentValue" @error="handleError"></cron>
    </transition>
  </div>
</template>

<script>
  import Cron from './cron';
  import Emitter from 'element-uex/src/mixins/emitter';
  import Migrating from 'element-uex/src/mixins/migrating';
  import Locale from 'element-uex/src/mixins/locale';
  import { addResizeListener, removeResizeListener } from 'element-uex/src/utils/resize-event';
  import Clickoutside from 'element-uex/src/utils/clickoutside';

  export default {
    name: 'ElxCron',
    componentName: 'ElxCron',
    mixins: [Emitter, Locale, Migrating],
    directives: { Clickoutside },
    components: {
      Cron
    },
    props: {
      value: {
        type: String,
        default: '* * * * * ?'
      },
      runTimeUrl: String,
      disabled: Boolean,
      placeholder: String,
      cycle: {
        type: String,
        default: 'secondly'
      },
      visibleTypes: {
        type: Array,
        default: function() {
          return ['secondly', 'minutely', 'hourly', 'daily', 'monthly', 'weekly', 'yearly'];
        }
      }
    },
    data: function() {
      return {
        currentValue: this.value,
        inputWidth: 0,
        visible: false
      };
    },
    methods: {
      resetInputWidth() {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      },
      handleFocus() {
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
      handleMouseDown(event) {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') return;
        if (this.visible) {
          this.handleClose();
          event.preventDefault();
        }
      },
      handleMenuEnter() {
      },
      handleResize() {
        this.resetInputWidth();
      },
      doDestroy() {
        this.$refs.popper && this.$refs.popper.doDestroy();
      },
      handleError: function(msg) {
        console.log(msg);
      }
    },
    watch: {
      visible: function(val, oldVal) {
        if (!val) {
          this.broadcast('cron', 'destroyPopper');
        } else {
          this.broadcast('cron', 'updatePopper');
        }
      },
      value: function(val, oldVal) {
        this.currentValue = val;
      },
      currentValue: function(val, oldVal) {
        this.$emit('input', val);
        this.$emit('change', val);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', val);
        }
      }
    },
    created: function() {
    },
    mounted: function() {
      addResizeListener(this.$el, this.handleResize);
    },
    destroyed() {
      if (this.resetInputWidth) {
        removeResizeListener(this.$el, this.resetInputWidth);
      }
    }
  };
</script>

