<template>
  <div class="elx-cron-year">
    <el-radio
      v-model="valType"
      label="1">
      <span>不指定 允许的通配符[, - * /]非必填</span>
    </el-radio>
    <el-radio
      v-model="valType"
      label="2">
      <span>每年</span>
    </el-radio>
    <el-radio
      v-model="valType"
      label="3">
      <span>周期从</span>
      <el-input-number
        v-model="valModel['3'].min"
        :min="1"
        :max="3000">
      </el-input-number>
      <span>-</span>
      <el-input-number
        v-model="valModel['3'].max"
        :min="1"
        :max="3000">
      </el-input-number>
      <span></span>
    </el-radio>
  </div>
</template>

<script>
  export default {
    name: 'Year',
    componentName: 'Year',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        currentValue: '',
        valType: '1',
        valModel: {
          '1': '',
          '2': '*',
          '3': {min: 2003, max: 2004}
        },
        regexp: {
          '1': '^\s*$',
          '2': '^\\*$',
          '3': '^(\\d+)-(\\d+)$'
        }
      };
    },
    methods: {
      validate(val) {
        const self = this;
        let valType;
        const regexp = [];
        Object.keys(this.regexp).forEach(function(key) {
          const item = self.regexp[key];
          const testRegExp = new RegExp(item, 'g');
          const judge = testRegExp.test(val);
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
          self.$emit('error', '(年)格式错误');
          return null;
        }
      },
      updateValue() {
        const val = this.valType;
        let currentVal;
        if (val === '1' || val === '2') {
          currentVal = this.valModel[val];
        } else if (val === '3') {
          currentVal = this.valModel[val].min + '-' + this.valModel[val].max;
        }
        this.currentValue = currentVal;
        this.$emit('input', currentVal);
      },
      initData() {
        let valType;
        if (!this.value || this.value === '') {
          this.valType = '1';
          this.$emit('input', this.valModel['1']);
          return false;
        }
        if (this.currentValue === this.value) {
          return false;
        }
        valType = this.validate(this.value);
        const regexp = this.regexp[valType];
        if (valType) {
          this.valType = valType;
          let x = 0;
          let y = 0;
          this.value.replace(new RegExp(regexp, 'g'), function(a, b, c, d, e) {
            x = b;
            y = c;
          });
          if (valType === '3') {
            this.valModel[valType].min = x;
            this.valModel[valType].max = y;
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