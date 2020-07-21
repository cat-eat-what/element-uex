## 行移动

行移动

### 基本用法1

::: demo 行移动
```html
<div class="main-demo">
  <div :style="{height: topHeight + 'px'}"></div>
  <elx-row-resize-layout
    :height.sync="fullHeight1"
    :max-height="maxHeight1"
    :top-visible="false"
    @drag-start="dragStart"
    @drag-end="dragEnd"
    @resize="resize">
    <div class="lay-bottom" slot="bottom"></div>
  </elx-row-resize-layout>
</div>
<script>
  export default {
    data: function() {
      return {
        fullHeight1: 200,
        maxHeight1: 300,
        topHeight: 100
      }
    },
    methods: {
      resize: function(height, top) {
        this.topHeight = this.maxHeight1 - height;
      },
      getFullHeight: function() {
        //this.fullHeight = document.querySelector('.main-demo').offsetHeight;
      },
      dragStart: function(height, splitTop) {
      },
      dragEnd: function(height, splitTop) {
      },
    },
    mounted: function() {
      this.getFullHeight();
      if (window.addEventListener) {
        window.addEventListener('resize', this.getFullHeight);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', this.getFullHeight);
      }
    }
  }
</script>
```
:::

### 基本用法2

::: demo 行移动
```html
<div class="main-demo">
  <elx-row-resize-layout
    split-type="narrow"
    :height.sync="fullHeight2"
    :max-height="maxHeight2">
    <div class="lay-top" slot="top"></div>
    <div class="lay-bottom" slot="bottom"></div>
  </elx-row-resize-layout>
</div>
<script>
  export default {
    data: function() {
      return {
        fullHeight2: 300,
        maxHeight2: 300
      }
    },
    methods: {
      getFullHeight: function() {
        //this.fullHeight2 = document.querySelector('.main-demo').offsetHeight;
        //this.maxHeight2 = document.querySelector('.main-demo').offsetHeight;
      }
    },
    mounted: function() {
      this.getFullHeight();
      if (window.addEventListener) {
        window.addEventListener('resize', this.getFullHeight);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', this.getFullHeight);
      }
    }
  }
</script>
```
:::

### 基本用法3

::: demo 行移动
```html
<div class="main-demo">
  <elx-row-resize-layout
    :height.sync="fullHeight3"
    :max-height="maxHeight3"
    :bottom-visible="false"
    @resize="resize3">
    <div class="lay-top" slot="top"></div>
  </elx-row-resize-layout>
  <div :style="{height: bottomHeight + 'px'}"></div>
</div>
<script>
  export default {
    data: function() {
      return {
        fullHeight3: 200,
        maxHeight3: 300,
        bottomHeight: 100
      }
    },
    methods: {
      resize3: function(height, top) {
        this.bottomHeight = this.maxHeight3 - height;
      },
      getFullHeight: function() {
        //this.fullHeight = document.querySelector('.main-demo').offsetHeight;
      }
    },
    mounted: function() {
      this.getFullHeight();
      if (window.addEventListener) {
        window.addEventListener('resize', this.getFullHeight);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', this.getFullHeight);
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | 可拖动高度 | Number | | 300 |
| max-height | 可拖动最大高度 | Number | | 500 |
| default-top | 默认顶栏高度 | Number | | -- |
| top-visible | 是否显示顶栏 | Boolean | | true |
| bottom-visible | 是否显示底栏 | Boolean | | true |
| split-visible | 是否显示拖动分隔栏 | Boolean | | true |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| resize | 当该布局中各栏高度发生改变触发的事件 | height, topHeight |
| drag-start | 当该布局开始拖动时触发的事件 | height, topHeight |
| drag-end | 当该布局结束拖动时触发的事件 | height, topHeight |