<template>
  <div class="elx-cron-minute">
    <el-radio
      v-model="valType"
      label="1">
      <span>每分钟 允许的通配符[, - * /]</span>
    </el-radio>
    <el-radio
      v-model="valType"
      label="2">
      <span>周期从</span>
      <el-input-number
        v-model="valModel['2'].min"
        :min="1"
        :max="60">
      </el-input-number>
      <span>-</span>
      <el-input-number
        v-model="valModel['2'].max"
        :min="1"
        :max="60">
      </el-input-number>
      <span>分钟</span>
    </el-radio>
    <el-radio
      v-model="valType"
      label="3">
      <span>从</span>
      <el-input-number
        v-model="valModel['3'].start"
        :min="0"
        :max="60">
      </el-input-number>
      <span>分钟开始，每</span>
      <el-input-number
        v-model="valModel['3'].frequency"
        :min="1"
        :max="60">
      </el-input-number>
      <span>分钟执行一次</span>
    </el-radio>
    <el-radio
      v-model="valType"
      label="4">
      <span>指定</span>
      <elx-checkbox-group
        v-model="valModel['4']">
        <elx-checkbox
          :key="option.value"
          v-for="option in options"
          :label="option.value">
          {{option.label}}
        </elx-checkbox>
      </elx-checkbox-group>
    </el-radio>
  </div>
</template>

<script>
  export default {
    name: 'Minute',
    componentName: 'Minute',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      var options = [];

      for (var i = 0; i < 60; i++) {
        if (i < 10) {
          options.push({value: '' + i, label: '0' + i});
        } else {
          options.push({value: '' + i, label: '' + i});
        }
      }
      return {
        currentValue: '',
        valType: '1',
        valModel: {
          '1': '*',
          '2': {min: 1, max: 2},
          '3': {start: 0, frequency: 1},
          '4': []
        },
        regexp: {
          '1': '^\\*$',
          '2': '^(\\d+)-(\\d+)$',
          '3': '^(\\d+)/(\\d+)$',
          '4': '((^(\\d+)(,\\d+)*$)|(^\\?$))'
        },
        options: options
      };
    },
    methods: {
      validate(val) {
        var self = this;
        var valType;
        var regexp = [];
        Object.keys(this.regexp).forEach(function(key) {
          var item = self.regexp[key];
          var testRegExp = new RegExp(item, 'g');
          var judge = testRegExp.test(val);
          if (judge) {
            valType = key;
          }
          if (judge) {
            regexp.push(item);
          }
          return judge;
        });
        if (regexp.length > 0) {
          return valType;
        } else {
          self.$emit('error', '(分钟)格式错误');
          return null;
        }
      },
      updateValue() {
        var val = this.valType;
        var currentVal;
        if (val === '1') {
          currentVal = this.valModel[val];
        } else if (val === '2') {
          currentVal = this.valModel[val].min + '-' + this.valModel[val].max;
        } else if (val === '3') {
          currentVal = this.valModel[val].start + '/' + this.valModel[val].frequency;
        } else if (val === '4') {
          currentVal = this.valModel[val].length === 0 ? '?' : this.valModel[val].join(',');
        }
        this.currentValue = currentVal;
        this.$emit('input', currentVal);
      },
      initData() {
        var valType;
        if (!this.value || this.value === '') {
          this.valType = '1';
          this.$emit('input', this.valModel['1']);
          return false;
        }
        if (this.currentValue === this.value) {
          return false;
        }
        valType = this.validate(this.value);
        var regexp = this.regexp[valType];
        if (valType) {
          this.valType = valType;
          var x = 0;
          var y = 0;
          this.value.replace(new RegExp(regexp, 'g'), function(a, b, c, d, e) {
            x = b;
            y = c;
          });
          if (valType === '2') {
            this.valModel[valType].min = x;
            this.valModel[valType].max = y;
          }
          if (valType === '3') {
            this.valModel[valType].start = x;
            this.valModel[valType].frequency = y;
          }
          if (valType === '4') {
            if (this.value === '?') {
              this.valModel[valType] = [];
            } else {
              this.valModel[valType] = this.value.split(',');
            }
          }
        }
      }
    },
    watch: {
      valType(val, oldVal) {
        this.updateValue();
      },
      valModel: {
        deep: true,
        handler(val, oldVal) {
          this.updateValue();
        }
      },
      value() {
        this.initData();
      }
    },
    created() {
      this.initData();
    },
    mounted() {
    }
  };
</script>