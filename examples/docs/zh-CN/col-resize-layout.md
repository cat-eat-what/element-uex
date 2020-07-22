## 列移动

列移动

### 基本用法1

::: demo 列移动
```html
<div class="col-main-demo">
  <div :style="{width: leftWidth + 'px', height: '100%', float: 'left'}"></div>
  <elx-col-resize-layout
    style="float:left"
    :width.sync="fullWidth1"
    :max-width="maxWidth1"
    :left-visible="false"
    @resize="resize">
    <div class="lay-right" slot="right" style="float:left"></div>
  </elx-col-resize-layout>
</div>
<script>
  export default {
    data: function() {
      return {
        fullWidth1: 461,
        maxWidth1: 761,
        leftWidth: 300
      }
    },
    methods: {
      resize: function(width, left) {
        this.leftWidth = this.maxWidth1 - width;
      },
      getFullWidth: function() {
        //this.fullWidth = document.querySelector('.main-demo').offsetWidth;
      }
    },
    mounted: function() {
      this.getFullWidth();
      if (window.addEventListener) {
        window.addEventListener('resize', this.getFullWidth);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', this.getFullWidth);
      }
    }
  }
</script>
```
:::

### 基本用法2

::: demo 行移动
```html
<style>
.drag iframe {
  pointer-events: none;
}
</style>
<div class="col-main-demo" :class="drag?'drag':''" style="width: 100%; height: 300px">
  <elx-col-resize-layout
    :default-left="200"
    split-type="narrow"
    :width.sync="fullWidth5"
    :max-width="maxWidth1"
    @drag-start="dragStart"
    @drag-end="dragEnd">
    <div class="lay-left" slot="left">
      <elx-tree
        :default-expanded-keys="defaultExpandedKeys"
        :expand-on-click-node="false"
        :current-node-key="currentNodeKey"
        :data="data2"
        default-expand-all>
        <template scope="scope" slot="operate">
          <ul>
            <li>
                <span class="uex-icon-field-blood-analyse"></span>
                <span>影响分析</span>
            </li>
          </ul>
        </template>
      </elx-tree>
    </div>
    <div class="lay-right" slot="right">
      <iframe width="100%" height="100%" style="border:0px" src="/icon"></iframe>
    </div>
  </elx-col-resize-layout>
</div>
<script>
  
  const data2 = [
    {
      id: 'paas_proc',
      label: '程序',
      icon: 'uex-icon-database',
      children: [
        {
          id: 'paas_proc_2',
          label: '流量经营哈哈哈哈哈哈',
          icon: 'uex-icon-table',
          children: [
            {
              id: 'paas_proc_21',
              label: '流量经营3u 互动呼呼呼呼',
              icon: 'uex-icon-tab-field',
              children: []
            }
          ]
        }
      ]
    }
  ];

  export default {
    data: function() {
      return {
        fullWidth5: 761,
        maxWidth1: 761,
        data2: data2,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        drag: false
      }
    },
    methods: {
      getFullWidth: function() {
        //this.fullWidth = document.querySelector('.main-demo').offsetWidth;
      },
      dragStart: function() {
        this.drag = true;
      },
      dragEnd: function() {
        this.drag = false;
      }
    },
    mounted: function() {
      this.getFullWidth();
      if (window.addEventListener) {
        window.addEventListener('resize', this.getFullWidth);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', this.getFullWidth);
      }
    }
  }
</script>
```
:::

### 基本用法3

::: demo 行移动
```html
  <div class="col-main-demo">
      <elx-col-resize-layout
        style="float:left"
        :width.sync="fullWidth3"
        :max-width="maxWidth3"
        :right-visible="false"
        @resize="resize3">
        <div class="lay-left" slot="left"></div>
      </elx-col-resize-layout>
      <div :style="{width: rightWidth + 'px', height: '100%', float: 'left'}"></div>
  </div>
  <script>
    export default {
      data: function() {
        return {
          fullWidth3: 461,
          maxWidth3: 761,
          rightWidth: 300
        }
      },
      methods: {
        resize3: function(width, left) {
          this.rightWidth = this.maxWidth3 - width;
        },
        getFullWidth: function() {
          //this.fullWidth = document.querySelector('.main-demo').offsetWidth;
        },
      },
      mounted: function() {
        this.getFullWidth();
        if (window.addEventListener) {
          window.addEventListener('resize', this.getFullWidth);
        } else if (window.attachEvent) {
          window.attachEvent('onresize', this.getFullWidth);
        }
      }
    }
  </script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | 可拖动宽度 | Number | | 300 |
| max-width | 可拖动最大宽度 | Number | | 500 |
| default-left | 默认左栏宽度 | Number | | -- |
| left-visible | 是否显示左栏 | Boolean | | true |
| right-visible | 是否显示右栏 | Boolean | | true |
| split-visible | 是否显示拖动分隔栏 | Boolean | | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| resize | 当该布局中各栏宽度发生改变触发的事件 | width, leftWidth |
| drag-start | 开始拖拽时触发的事件 | event |
| drag-end | 结束拖拽时触发的事件 | event |