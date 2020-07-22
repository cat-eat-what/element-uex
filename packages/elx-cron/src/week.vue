<template>
  <div class="elx-cron-week">
    <el-radio v-model="valType" label="1"><span>周 允许的通配符[, - * /]</span></el-radio>
    <el-radio v-model="valType" label="2"><span>不指定</span></el-radio>
    <el-radio v-model="valType" label="3">
      <span>周期从星期</span>
      <number size="small" v-model="valModel['3'].min" :min="1" :max="60"></number>
      <span>-</span>
      <number size="small" v-model="valModel['3'].max" :min="1" :max="60"></number>
      <span></span>
    </el-radio>
    <el-radio v-model="valType" label="4">
      <span>第</span>
      <number size="small" v-model="valModel['4'].start" :min="1" :max="60"></number>
      <span>周的星期</span>
      <number size="small" v-model="valModel['4'].frequency" :min="1" :max="60"></number>
    </el-radio>
    <el-radio v-model="valType" label="5">
      <span>本月最后一个星期</span>
      <number size="small" v-model="valModel['5'].week" :min="1" :max="7"></number>
    </el-radio>
    <el-radio v-model="valType" label="6">
      <span>指定</span>
      <elx-checkbox-group v-model="valModel['6']">
        <elx-checkbox :key="option.value" v-for="(option, index) in options" :label="option.value">{{option.label}}</elx-checkbox>
      </elx-checkbox-group>
    </el-radio>
  </div>
</template>

<script>
  import Number from './number';
  export default {
    name: 'Week',
    componentName: 'Week',
    components: {
      Number
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data: function() {
      var options = [];
      for (var i = 1; i < 8; i++) {
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
          '2': '?',
          '3': {min: 1, max: 2},
          '4': {start: 1, frequency: 1},
          '5': {week: 1},
          '6': []
        },
        replaceOption: {
          'SUN': '1',
          'MON': '2',
          'TUE': '3',
          'WED': '4',
          'THU': '5',
          'FRI': '6',
          'SAT': '7'
        },
        regexp: {
          '1': '^\\*$',
          '2': '^\\?$',
          '3': '^(\\d*|undefined)-(\\d*|undefined)$',
          '4': '^(\\d*|undefined)#(\\d*|undefined)$',
          '5': '^(\\d|undefined)L$',
          '6': '((^(\\d+)(,\\d+)*$)|(^\\?$))'
        },
        options: options
      };
    },
    methods: {
      formatValue: function() {
        if (!this.value) {
          return;
        }
        var currentVal = this.value;
        for (var i in this.replaceOption) {
          currentVal = currentVal.replace(i, this.replaceOption[i]);
        }
        this.$emit('input', currentVal);
        return currentVal;
      },
      validate: function(val) {
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
          self.$emit('error', '(周)格式错误');
          return null;
        }
      },
      formatNum: function(val) {
        var num = val;
        return num === undefined ? '' : num;
      },
      updateValue: function() {
        var val = this.valType;
        var currentVal;
        if (val === '1' || val === '2') {
          currentVal = this.valModel[val];
        } else if (val === '3') {
          currentVal = this.formatNum(this.valModel[val].min) + '-' + this.formatNum(this.valModel[val].max);
        } else if (val === '4') {
          currentVal = this.formatNum(this.valModel[val].start) + '#' + this.formatNum(this.valModel[val].frequency);
        } else if (val === '5') {
          currentVal = this.formatNum(this.valModel[val].week) + 'L';
        } else if (val === '6') {
          currentVal = this.valModel[val].length === 0 ? '?' : this.valModel[val].join(',');
        }
        this.currentValue = currentVal;
        this.$emit('input', currentVal);
      },
      initData: function() {
        var valType;
        if (!this.value || this.value === '') {
          this.valType = '1';
          this.$emit('input', this.valModel['1']);
          return false;
        }
        if (this.currentValue === this.value) {
          return false;
        }
        this.formatValue();
        valType = this.validate(this.value);
        var regexp = this.regexp[valType];
        if (valType) {
          this.valType = valType;
          var x = 0;
          var y = 0;
          this.value.replace(new RegExp(regexp, 'g'), function(a, b, c, d, e) {
            x = b === '' ? undefined : b;
            y = c === '' ? undefined : c;
          });
          if (valType === '3') {
            this.valModel[valType].min = x;
            this.valModel[valType].max = y;
          }
          if (valType === '4') {
            this.valModel[valType].start = x;
            this.valModel[valType].frequency = y;
          }
          if (valType === '5') {
            this.valModel[valType].week = x;
          }
          if (valType === '6') {
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
      'valType': function(val, oldVal) {
        this.updateValue();
      },
      'valModel': {
        deep: true,
        handler: function(val, oldVal) {
          this.updateValue();
        }
      },
      'value': function() {
        this.initData();
      }
    },
    created: function() {
      this.initData();
    },
    mounted: function() {
    }
  };
</script>