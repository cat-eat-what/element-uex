<template>
  <div class="elx-cron-day">
    <el-radio v-model="valType" label="1"><span>日 允许的通配符[, - * /]</span></el-radio>
    <el-radio v-model="valType" label="2"><span>不指定</span></el-radio>
    <el-radio v-model="valType" label="3">
      <span>周期从</span>
      <el-input-number size="small" v-model="valModel['3'].min" :min="1" :max="60"></el-input-number>
      <span>-</span>
      <el-input-number size="small" v-model="valModel['3'].max" :min="1" :max="60"></el-input-number>
      <span>日</span>
    </el-radio>
    <el-radio v-model="valType" label="4">
      <span>从</span>
      <el-input-number size="small" v-model="valModel['4'].start" :min="1" :max="60"></el-input-number>
      <span>日开始，每</span>
      <el-input-number size="small" v-model="valModel['4'].frequency" :min="1" :max="60"></el-input-number>
      <span>天执行一次</span>
    </el-radio>
    <el-radio v-model="valType" label="5">
      <span>每月</span>
      <el-input-number size="small" v-model="valModel['5']" :min="1" :max="60"></el-input-number>
      <span>号最近的那个工作日</span>
    </el-radio>
    <el-radio v-model="valType" label="6"><span>本月最后一天</span></el-radio>
    <el-radio v-model="valType" label="7">
      <span>指定</span>
      <elx-checkbox-group v-model="valModel['7']">
        <elx-checkbox :key="option.value" v-for="(option, index) in options" :label="option.value">{{option.label}}</elx-checkbox>
      </elx-checkbox-group>
    </el-radio>
  </div>
</template>

<script>
  export default {
    name: 'Day',
    componentName: 'Day',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data: function() {
      var options = [];
      for (var i = 1; i < 32; i++) {
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
          '5': 1,
          '6': 'L',
          '7': []
        },
        regexp: {
          '1': '^\\*$',
          '2': '^\\?$',
          '3': '^(\\d+)-(\\d+)$',
          '4': '^(\\d+)/(\\d+)$',
          '5': '^(\\d+)W$',
          '6': '^L$',
          '7': '((^(\\d+)(,\\d+)*$)|(^\\?$))'
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
          self.$emit('error', '(天)格式错误');
          return null;
        }
      },
      updateValue: function() {
        var val = this.valType;
        var currentVal;
        if (val === '1' || val === '2' || val === '6') {
          currentVal = this.valModel[val];
        } else if (val === '3') {
          currentVal = this.valModel[val].min + '-' + this.valModel[val].max;
        } else if (val === '4') {
          currentVal = this.valModel[val].start + '/' + this.valModel[val].frequency;
        } else if (val === '5') {
          currentVal = this.valModel[val] + 'W';
        } else if (val === '7') {
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
            x = b;
            y = c;
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
            this.valModel[valType] = x;
          }
          if (valType === '7') {
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