<template>
  <div class="elx-cron-hour">
    <el-radio v-model="valType" label="1"><span>每小时 允许的通配符[, - * /]</span></el-radio>
    <el-radio v-model="valType" label="2">
      <span>周期从</span>
      <number size="small" v-model="valModel['2'].min" :min="1" :max="60"></number>
      <span>-</span>
      <number size="small" v-model="valModel['2'].max" :min="1" :max="60"></number>
      <span>小时</span>
    </el-radio>
    <el-radio v-model="valType" label="3">
      <span>从</span>
      <number size="small" v-model="valModel['3'].start" :min="0" :max="24"></number>
      <span>小时开始，每</span>
      <number size="small" v-model="valModel['3'].frequency" :min="1" :max="100"></number>
      <span>小时执行一次</span>
    </el-radio>
    <el-radio v-model="valType" label="4">
      <span>指定</span>
      <div class="hour-checkbox-group">
        <span>AM: </span>
        <elx-checkbox-group v-model="valModel['4']" class="hour-checkbox">
          <elx-checkbox :key="option.value" v-for="(option, index) in options" v-if="index<12" :label="option.value">{{option.label}}</elx-checkbox>
        </elx-checkbox-group>
        <span>PM: </span>
        <elx-checkbox-group v-model="valModel['4']" class="hour-checkbox">
          <elx-checkbox :key="option.value" v-for="(option, index) in options" v-if="index>11" :label="option.value">{{option.label}}</elx-checkbox>
        </elx-checkbox-group>
      </div>
    </el-radio>
  </div>
</template>

<script>
  import Number from './number';
  export default {
    name: 'Hour',
    componentName: 'Hour',
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
      for (var i = 0; i < 24; i++) {
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
          '2': {min: 0, max: 2},
          '3': {start: 0, frequency: 1},
          '4': []
        },
        regexp: {
          '1': '^\\*$',
          '2': '^(\\d*|undefined)-(\\d*|undefined)$',
          '3': '^(\\d*|undefined)/(\\d*|undefined)$',
          '4': '((^(\\d+)(,\\d+)*$)|(^\\?$))'
        },
        options: options
      };
    },
    methods: {
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
          self.$emit('error', '(小时)格式错误');
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
        if (val === '1') {
          currentVal = this.valModel[val];
        } else if (val === '2') {
          currentVal = this.formatNum(this.valModel[val].min) + '-' + this.formatNum(this.valModel[val].max);
        } else if (val === '3') {
          currentVal = this.formatNum(this.valModel[val].start) + '/' + this.formatNum(this.valModel[val].frequency);
        } else if (val === '4') {
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