<template>
  <div class="date-button-group">
    <el-button-group>
      <el-button
        v-for="(type, index) in operateType"
        :key="index"
        :class="currentActiveDate == type ? 'active' : ''"
        @click.native="operateTime(type)">
        {{type == 'year' ? t('el.datepickerGroup.year') : (type == 'month' ? t('el.datepickerGroup.month') : (type == 'date' ? t('el.datepickerGroup.day') : t('el.datepickerGroup.duration')))}}
      </el-button>
    </el-button-group>
    <template v-if="currentActiveDate == 'date'">
      <el-date-picker
        class="date"
        v-model="currentDate"
        type="date"
        format="yyyy-MM-dd"
        :placeholder="t('el.datepicker.selectDate')"
        :picker-options="pickerOptions">
      </el-date-picker>
    </template>
    <template v-if="currentActiveDate == 'month'">
      <el-date-picker
        class="month"
        v-model="currentDate"
        type="month"
        :placeholder="t('el.datepicker.selectMonth')"
        :picker-options="pickerMonthOptions">
      </el-date-picker>
    </template>
    <template v-if="currentActiveDate == 'year'">
      <el-date-picker
        class="year"
        v-model="currentDate"
        type="year"
        format="yyyy"
        :placeholder="t('el.datepicker.selectYear')"
        :picker-options="pickerYearOptions">
      </el-date-picker>
    </template>
    <template v-if="currentActiveDate == 'daterange'">
      <el-date-picker
        class="range"
        v-model="currentDate"
        type="daterange"
        :placeholder="t('el.datepicker.selectDuration')">
      </el-date-picker>
    </template>
  </div>
</div>
</template>
<script>
import Locale from 'element-uex/src/mixins/locale';
export default {
  name: 'ElxDatePickerGroup',

  componentName: 'ElxDatePickerGroup',
  mixins: [Locale],

  props: {
    value: {
      type: [String, Array, Object, Date],
      default: {}
    },
    activeDate: {
      type: String,
      default: 'date'
    },
    separate: {
      type: String,
      default: ''
    },
    operateType: {
      type: Array,
      default: function() {
        return ['year', 'month', 'date', 'daterange'];
      }
    }
  },
  data: function() {
    return {
      currentDate: this.value,
      currentActiveDate: this.activeDate,
      formatedTime: '',
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() >= Date.now();
        }
      },
      pickerMonthOptions: {
        disabledDate: function(time) {
          var _date = new Date();
          var _judge = false;
          if (time.getFullYear() > _date.getFullYear()) {
            _judge = true;
          } else if (time.getFullYear() === _date.getFullYear()) {
            if (time.getMonth() > _date.getMonth()) {
              _judge = true;
            }
          }
          return _judge;
        }
      },
      pickerYearOptions: {
        disabledDate: function(time) {
          var _date = new Date();
          return time.getFullYear() > _date.getFullYear();
        }
      }
    };
  },
  methods: {
    formateDate: function(val) {
      if ((val === '' || val === null) || (Array.isArray(val) && (val[0] === null || val[1] === null))) {
        return this.formatedTime;
      }
      var _separate = this.separate;
      var _date;
      var date = [];
      var _arr = [];
      if (Array.isArray(val)) {
        _arr = val;
      } else {
        _arr.push(val);
      }
      for (var i in _arr) {
        var _year = _arr[i].getFullYear();
        var _month = _arr[i].getMonth() + 1;
        _month = _month < 10 ? '0' + _month : _month;
        _date = _arr[i].getDate() < 10 ? '0' + _arr[i].getDate() : _arr[i].getDate();
        if (this.currentActiveDate === 'date') {
          date.push(_year + _separate + _month + _separate + _date);
        } else if (this.currentActiveDate === 'month') {
          date.push(_year + _separate + _month);
        } else if (this.currentActiveDate === 'daterange') {
          date.push(_year + _separate + _month + _separate + _date);
        } else {
          date.push(_year);
        }
      }
      return date;
    },
    operateTime: function(type, callType) {
      if (this.currentActiveDate !== type) {
        if (this.currentActiveDate === 'daterange') {
          this.currentDate = this.currentDate[0];
        } else if (this.currentActiveDate !== 'daterange' && type === 'daterange') {
          if (this.currentDate === '' || ((Array.isArray(this.currentDate)) ? this.currentDate.length === 0 : false)) {
            this.currentDate = [];
          } else {
            this.currentDate = [this.currentDate, new Date()];
          }
        }
      }
      this.currentActiveDate = type;
      this.formatedTime = this.formateDate(this.currentDate);
    }
  },
  watch: {
    'currentDate': function(val, oldVal) {
      this.formatedTime = this.formateDate(val);
    },
    'formatedTime': function(val, oldVal) {
      this.$emit('change', this.formatedTime);
      this.$emit('input', this.formatedTime);
    }
  },
  created: function() {
    this.formatedTime = this.formateDate(this.currentDate);
  }
};
</script>
