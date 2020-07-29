## 可收缩按钮组

可收缩按钮组。

### 基本用法


::: demo 可收缩按钮组
```html
<elx-operate-button
  ref="test1"
  :operate-show="true">
  <elx-operate-expand-item>
    <el-button
      slot="operate-button"
      @click="test($event)"
      :class="{'active': formShow1}">
      <span class="uex-icon uex-icon-tick"></span>
      提交提交提交提交
    </el-button>
    <div
      slot="operate-expand"
      v-show="formShow1">
      <el-form
        ref="form"
        :model="form">
        <el-form-item label="请输入内容">
          <el-input
            type="textarea"
            v-model="form.name"
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
        <el-form-item>
           <el-button @click="test($event)">测试</el-button>
        </el-form-item>
      </el-form>
    </div>
  </elx-operate-expand-item>
  <elx-operate-expand-item>
    <el-button
      slot="operate-button"
      @click="test2($event)"
      :class="{'active': formShow2}">
      <span class="uex-icon uex-icon-tick"></span>
      下一步
    </el-button>
    <div
      slot="operate-expand"
      v-show="formShow2">
      <el-form
        ref="form"
        :model="form">
        <el-form-item label="">
          <el-select
            v-model="form.name1"
            multiple
            placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </elx-operate-expand-item>
  <elx-operate-item @click.native="save">
    <span class="uex-icon uex-icon-save"></span>
    保存
  </elx-operate-item>
  <elx-operate-item @click.native="next">
    <span class="uex-icon uex-icon-caret-right"></span>
    下一步
  </elx-operate-item>
</elx-operate-button>
<script>
  export default {
    data: function() {
      return {
        form: {
          name: null,
          name1: []
        },
        formShow1: false,
        formShow2: false,
        options: [
            {value: '选项1', label: '黄金糕'},
            {value: '选项2', label: '双皮奶'}
        ]
      }
    },
    methods: {
      hello: function() {
        alert('Hello World!');
      },
      test: function() {
        this.formShow2 = false;
        this.formShow1 = !this.formShow1;
      },
      test2: function() {
        this.formShow1 = false;
        this.formShow2 = !this.formShow2;
      },
      save: function() {
        this.formShow1 = false;
        this.formShow2 = false;
      },
      next: function() {
        this.formShow1 = false;
        this.formShow2 = false;
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|operate-show | 是否展开 | Boolean |－|true|

### elx-operate-item
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| - | 通过 slot 传入 DOM，配置按钮 | - | - | - |

### elx-operate-expand-item
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| operate-expand | 通过 slot#operate-expand 传入 DOM，配置按钮展开项 | - | - | - |
| operate-button | 通过 slot#operate-button 传入 DOM，配置按钮 | - | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
