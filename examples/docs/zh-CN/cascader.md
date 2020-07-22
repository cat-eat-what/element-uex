## 级联

级联

### 基本用法


::: demo 级联
```html
<el-form :model="form" ref="ruleForm" label-width="80px">
  <el-form-item label="a" prop="a">
    <el-input v-model="form.a"></el-input>
  </el-form-item>
  <el-form-item label="b" prop="b">
    <elx-cascader
      ref="cascader"
      v-model="form.b"
      placeholder="请选择内容"
      :clearable="true"
      expand-trigger="hover"
      :disabled="false"
      :filterable="true"
      :props="defaultProps"
      :show-all-levels="true"
      :change-on-select="false"
      :options="options"
      @change="handleChange">
    </elx-cascader>
  </el-form-item>
  <el-form-item>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
<script>
  export default {
    data: function() {
      return {
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
                children: [
                  {value: 'yizhi', label: '一致'},
                  {value: 'fankui', label: '反馈'},
                  {value: 'xiaolv', label: '效率'},
                  {value: 'kekong', label: '可控'}
                ]
              },
              {
                value: 'daohang',
                label: '导航',
                children: [
                  {value: 'cexiangdaohang', label: '侧向导航'},
                  {value: 'dingbudaohang', label: '顶部导航'}
                ]
              }
            ]
          },
          {
            value: 'zujian',
            label: '组件',
            children: [
              {
                value: 'basic',
                label: 'Basic',
                children: [
                  {value: 'layout', label: 'Layout 布局'},
                  {value: 'color', label: 'Color 色彩'},
                  {value: 'typography', label: 'Typography 字体'},
                  {value: 'icon', label: 'Icon 图标'},
                  {value: 'button', label: 'Button 按钮'}
                ]
              },
              {
                value: 'form',
                label: 'Form',
                children: [
                  {value: 'radio', label: 'Radio 单选框'},
                  {value: 'checkbox', label: 'Checkbox 多选框'},
                  {value: 'input', label: 'Input 输入框'},
                  {value: 'input-number', label: 'InputNumber 计数器'},
                  {value: 'select', label: 'Select 选择器'},
                  {value: 'cascader', label: 'Cascader 级联选择器'},
                  {value: 'switch', label: 'Switch 开关'},
                  {value: 'slider', label: 'Slider 滑块'},
                  {value: 'time-picker', label: 'TimePicker 时间选择器'},
                  {value: 'date-picker', label: 'DatePicker 日期选择器'},
                  {value: 'datetime-picker', label: 'DateTimePicker 日期时间选择器'},
                  {value: 'upload', label: 'Upload 上传'},
                  {value: 'rate', label: 'Rate 评分'},
                  {value: 'form', label: 'Form 表单'}
                ]
              },
              {
                value: 'data',
                label: 'Data',
                children: [
                  {value: 'table', label: 'Table 表格'},
                  {value: 'tag', label: 'Tag 标签'},
                  {value: 'progress', label: 'Progress 进度条'},
                  {value: 'tree', label: 'Tree 树形控件'},
                  {value: 'pagination', label: 'Pagination 分页'},
                  {value: 'badge', label: 'Badge 标记'}
                ]
              },
              {
                value: 'notice',
                label: 'Notice',
                children: [
                  {value: 'alert', label: 'Alert 警告'},
                  {value: 'loading', label: 'Loading 加载'},
                  {value: 'message', label: 'Message 消息提示'},
                  {value: 'message-box', label: 'MessageBox 弹框'},
                  {value: 'notification', label: 'Notification 通知'}
                ]
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {value: 'menu', label: 'NavMenu 导航菜单'},
                  {value: 'tabs', label: 'Tabs 标签页'},
                  {value: 'breadcrumb', label: 'Breadcrumb 面包屑'},
                  {value: 'dropdown', label: 'Dropdown 下拉菜单'},
                  {value: 'steps', label: 'Steps 步骤条'}
                ]
              },
              {
                value: 'others',
                label: 'Others',
                children: [
                  {value: 'dialog', label: 'Dialog 对话框'},
                  {value: 'tooltip', label: 'Tooltip 文字提示'},
                  {value: 'popover', label: 'Popover 弹出框'},
                  {value: 'card', label: 'Card 卡片'},
                  {value: 'carousel', label: 'Carousel 走马灯'},
                  {value: 'collapse', label: 'Collapse 折叠面板'}
                ]
              }
            ]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [
              {value: 'axure', label: 'Axure Components'},
              {value: 'sketch', label: 'Sketch Templates'},
              {value: 'jiaohu', label: '组件交互文档'}
            ]
          }
        ],
        form: {
            a: 'bgbg',
            b: null
        },
        defaultProps: {
          value: 'value',
          label: 'label',
          children: 'children',
        }
      };
    },
    methods: {
      handleChange: function(value) {
        console.log(this.$refs['cascader'].$children[0].menuVisible = false);
        //console.log(value);
      },
      resetForm: function(formName) {
        console.log(this.$refs[formName]);
        this.$refs[formName].resetFields();
        console.log(this.form);
      }
    },
    watch: {
      form: function(val) {
        console.log(val);
      }
    },
    created: function() {
      window.form = this.form;
    }
  };
</script>
```
:::


### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options | 可选项数据源，键名可通过 `props` 属性配置 | Array | — | — |
| props | 配置选项，具体见下表 | Object | — | — |
| show-all-levels | 输入框中是否显示选中值的完整路径 | Boolean | — | true |
| value | 选中项绑定值   | Array | — | — |
| change-on-select | 是否允许选择任意一级的选项 | Boolean | — | false |
| disabled | 是否禁用 | Boolean | — | false |
| clearable | 是否支持清空选项 | Boolean | — | false |
| placeholder | 输入框占位文本 | String | — | '请选择' |
| expand-trigger | 次级菜单的展开方式 | String | 'click' / 'hover' | 'click' |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当绑定值变化时触发的事件 | 当前值 |