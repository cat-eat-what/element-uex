<template>
  <div
    class="elx-cron-content"
    @click="focus"
    :style="{ minWidth: minWidth,maxWidth: maxWidth,maxHeight: maxHeight}">
    <el-tabs
      type="border-card"
      v-model="activeTabName">
      <el-tab-pane
        label="秒"
        name="secondly"
        v-if="visibleTypes.indexOf('secondly') > -1">
        <second
          ref="second"
          v-model="expressionModel.expressionSplit.second"
          @error="handleError">
        </second>
      </el-tab-pane>
      <el-tab-pane
        label="分钟"
        name="minutely"
        v-if="visibleTypes.indexOf('minutely') > -1">
        <minute
          ref="minute"
          v-model="expressionModel.expressionSplit.minute"
          @error="handleError">
        </minute>
      </el-tab-pane>
      <el-tab-pane
        label="小时"
        name="hourly"
        v-if="visibleTypes.indexOf('hourly') > -1">
        <hour
          ref="hour"
          v-model="expressionModel.expressionSplit.hour"
          @error="handleError">
        </hour>
      </el-tab-pane>
      <el-tab-pane
        label="日"
        name="daily"
        v-if="visibleTypes.indexOf('daily') > -1">
        <day
          ref="day"
          v-model="expressionModel.expressionSplit.day"
          @error="handleError">
        </day>
      </el-tab-pane>
      <el-tab-pane
        label="月"
        name="monthly"
        v-if="visibleTypes.indexOf('monthly') > -1">
        <month
          ref="month"
          v-model="expressionModel.expressionSplit.month"
          @error="handleError">
        </month>
      </el-tab-pane>
      <el-tab-pane
        label="周"
        name="weekly"
        v-if="visibleTypes.indexOf('weekly') > -1">
        <week
          ref="week"
          v-model="expressionModel.expressionSplit.week"
          @error="handleError">
        </week>
      </el-tab-pane>
      <el-tab-pane
        label="年"
        name="yearly"
        v-if="visibleTypes.indexOf('yearly') > -1">
        <year
          ref="year"
          v-model="expressionModel.expressionSplit.year"
          @error="handleError">
        </year>
      </el-tab-pane>
    </el-tabs>
    <div class="cron-expression">
      <el-form
        :model="expressionModel"
        label-width="90px">
        <el-form-item label="表达式字段: ">
          <div>
            <el-form
              class="expression"
              :inline="true"
              :model="expressionModel.expressionSplit">
              <el-form-item label="秒">
                <el-input
                  v-model="expressionModel.expressionSplit.second"
                  disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="分钟">
                <el-input
                  v-model="expressionModel.expressionSplit.minute"
                  disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="小时">
                <el-input
                  v-model="expressionModel.expressionSplit.hour"
                  disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="日">
                <el-input
                  v-model="expressionModel.expressionSplit.day"
                  disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="月">
                <el-input
                  v-model="expressionModel.expressionSplit.month"
                  disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="星期">
                <el-input
                  v-model="expressionModel.expressionSplit.week"
                  disabled>
                </el-input>
              </el-form-item>
              <el-form-item label="年">
                <el-input
                  v-model="expressionModel.expressionSplit.year"
                  disabled>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
        <!--<el-form-item label="Cron表达式: ">
          <el-input v-model="expressionModel.expression" disabled>
            <template slot="append">
              <span
                @click="getExpressionSplit"
                style="cursor:pointer">
                反解析到UI
              </span>
            </template>
          </el-input>
        </el-form-item>-->
        <el-form-item
          label="*"
          class="error"
          v-if="errorMessage!=''">
          <p>{{errorMessage + ' 请重新填写！'}}</p>
        </el-form-item>
      </el-form>
    </div>
    <div
      class="run-time"
      v-if="runTimeUrl">
      <el-button
        class="lasted-time"
        @click.native="getRunTimes">
        获取最近5次运行时间
      </el-button>
      <ul>
        <li
          v-for="runTime in runTimes"
          :key="runTime"
          v-text="runTime">
        </li>
      </ul>
    </div>
    <div class="button-group">
      <el-button @click="resetExpression">重置</el-button>
      <el-button @click="saveExpression">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Popper from 'element-uex/src/utils/vue-popper';
  import Second from './second';
  import Minute from './minute';
  import Hour from './hour';
  import Day from './day';
  import Month from './month';
  import Week from './week';
  import Year from './year';
  import axios from 'Axios';

  export default {
    name: 'cron',
    componentName: 'cron',
    mixins: [Popper],
    components: {
      Second, Minute, Hour, Day, Month, Week, Year
    },
    props: {
      value: {
        type: String,
        default: '* * * * * ?'
      },
      placement: {
        default: 'bottom-start'
      },
      boundariesPadding: {
        default: 0
      },
      popperOptions: {
        default() {
          return {
            forceAbsolute: true,
            gpuAcceleration: false
          };
        }
      },
      visible: Boolean,
      runTimeUrl: String,
      cycle: String,
      visibleTypes: Array
    },
    data: function() {
      return {
        minWidth: '',
        maxWidth: '',
        maxHeight: '',
        valueChange: false,
        runTimes: [],
        expressionModel: {
          expressionSplit: {
            second: '*',
            minute: '*',
            hour: '*',
            day: '*',
            month: '*',
            week: '?',
            year: ''
          },
          expression: ''
        },
        cronTypeMap: ['second', 'minute', 'hour', 'day', 'month', 'week', 'year'],
        defaultExpressionMap: ['*', '*', '*', '*', '*', '?', ''],
        errorMessage: '',
        activeTabName: this.cycle
      };
    },
    methods: {
      getRunTimes: function() {
        if (!this.runTimeUrl) {
          return;
        }
        var str = '';
        var self = this;
        var split = this.expressionModel.expressionSplit;
        Object.keys(split).forEach(function(key) {
          var val = split[key];
          str = str === '' ? val : str + ' ' + val;
        });
        axios.get(this.runTimeUrl, {
          params: {cron: str}
        })
          .then(function(response) {
            var data = response.data;
            if (!data.state) {
            } else {
              if (Array.isArray(data.date)) {
                self.runTimes = data.date;
              }
            }
          });
      },
      validate: function(split) {
        var judge = true;
        if (!this.$refs['second']) {
          return false;
        }
        if (this.$refs['second']) {
          judge = this.$refs['second'].validate(split.second) && judge;
        }
        if (this.$refs['minute']) {
          judge = this.$refs['minute'].validate(split.minute) && judge;
        }
        if (this.$refs['hour']) {
          judge = this.$refs['hour'].validate(split.hour) && judge;
        }
        if (this.$refs['day']) {
          judge = this.$refs['day'].validate(split.day) && judge;
        }
        if (this.$refs['month']) {
          judge = this.$refs['month'].validate(split.month) && judge;
        }
        if (this.$refs['week']) {
          judge = this.$refs['week'].validate(split.week) && judge;
        }
        if (this.$refs['year']) {
          judge = this.$refs['year'].validate(split.year) && judge;
        }
        return Boolean(judge);
      },
      formatExpression: function() {
        var self = this;
        this.errorMessage = '';
        this.expressionModel.expression = '';
        this.cronTypeMap.map(function(type, index) {
          var val = self.expressionModel.expressionSplit[type];
          if (self.expressionModel.expression === '') {
            self.expressionModel.expression = val;
          } else {
            if (self.expressionModel.expressionSplit[type] !== '') {
              self.expressionModel.expression = self.expressionModel.expression + ' ' + val;
            }
          }
        });
        this.$emit('input', self.expressionModel.expression);
      },
      getExpressionSplit: function() {
        var self = this;
        this.errorMessage = '';
        var ExpressionArr = this.expressionModel.expression.split(' ');
        this.cronTypeMap.map(function(type, index) {
          if (ExpressionArr[index]) {
            if (self.visible) {
              if (self.$refs[type]) {
                if (self.$refs[type].validate(ExpressionArr[index])) {
                  self.expressionModel.expressionSplit[type] = ExpressionArr[index];
                } else {
                  self.expressionModel.expressionSplit[type] = self.defaultExpressionMap[index];
                }
              } else {
                self.expressionModel.expressionSplit[type] = ExpressionArr[index];
              }
            }
          } else {
            self.expressionModel.expressionSplit[type] = self.defaultExpressionMap[index];
          }
        });
      },
      handleError: function(msg) {
        this.errorMessage = this.errorMessage === '' ? msg : this.errorMessage + ';' + msg;
        this.$emit('error', this.errorMessage);
      },
      focus: function() {
        if (this.valueChange) {
          this.errorMessage = '';
          this.valueChange = false;
          this.expressionModel.expression = this.getValue();
          this.getExpressionSplit();
        }
      },
      setExpression: function(type) {
        var self = this;
        var expressionArr = this.expressionModel.expression.split(' ');
        this.expressionModel.expression = '';
        var index = this.cronTypeMap.indexOf(type);
        this.cronTypeMap.map(function(type, i) {
          if (i !== index && expressionArr[i]) {
            self.expressionModel.expression = self.expressionModel.expression + expressionArr[i] + ' ';
          } else if (i === index) {
            self.expressionModel.expression = self.expressionModel.expression + self.expressionModel.expressionSplit[type] + ' ';
          } else {
            self.expressionModel.expression = self.expressionModel.expression + self.defaultExpressionMap[i] + ' ';
          }
        });
      },
      resetExpression: function() {
        this.expressionModel.expression = typeof this.originVal === 'string' ? this.originVal : '';
        this.getExpressionSplit();
        this.errorMessage = '';
        this.$emit('input', this.expressionModel.expression);
      },
      saveExpression: function() {
        this.errorMessage = '';
        this.$emit('input', this.expressionModel.expression);
        this.$emit('update:visible', false);
      },
      getValue: function() {
        return typeof this.value === 'string' ? this.value : '';
      },
      addEvent: function(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, function() {
            handler.call(element);
          });
        } else {
          element['on' + type] = handler;
        }
      },
      resizeCron: function() {
        this.maxWidth = (document.body.offsetWidth / 2) + 'px';
        this.maxHeight = (document.body.offsetHeight * 8 / 10) + 'px';
      }
    },
    watch: {
      'value': function(val) {
        this.valueChange = true;
      },
      'expressionModel.expressionSplit.second': function(val) {
        this.setExpression('second');
      },
      'expressionModel.expressionSplit.minute': function(val) {
        this.setExpression('minute');
      },
      'expressionModel.expressionSplit.hour': function(val) {
        this.setExpression('hour');
      },
      'expressionModel.expressionSplit.day': function(val) {
        this.setExpression('day');
      },
      'expressionModel.expressionSplit.month': function(val) {
        this.setExpression('month');
      },
      'expressionModel.expressionSplit.week': function(val) {
        this.setExpression('week');
      },
      'expressionModel.expressionSplit.year': function(val) {
        this.setExpression('year');
      },
      'visible': function(val, oldVal) {
        if (val) {
          this.originVal = this.value;
          this.activeTabName = this.cycle;
        }
        this.errorMessage = '';
        this.valueChange = false;
        this.expressionModel.expression = this.getValue();
        this.getExpressionSplit();
        this.runTimes = [];
      },
      errorMessage: function(val, oldVal) {
      },
      'expressionModel.expression': function(val, oldVal) {
        this.getRunTimes();
      },
      '$parent.inputWidth'() {
        this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
        this.resizeCron();
      }
    },
    created: function() {
    },
    mounted() {
      this.referenceElm = this.$parent.$refs.reference.$el;
      this.$parent.popperElm = this.popperElm = this.$el;
      this.addEvent(window, 'resize', this.resizeCron);
      this.$on('updatePopper', this.updatePopper);
      this.$on('destroyPopper', this.destroyPopper);
    }
  };
</script>

