<script>
  export default {
    data: function(){
      return {
      }
    },
    methods: {
    }
  }
</script>
<style>
  .main-demo.layout-demo.layout-demo {
    background-color: #fafafa;
  }
  .main-demo.layout-demo .elx-main>.main-show.elx-row>div{
    margin-bottom: 10px;
  }
  .main-demo.layout-demo .elx-main>.main-show.elx-row>div.elx-footer,
  .main-demo.layout-demo .elx-main>.main-show.elx-row>div:last-child{
    margin-bottom: 0px;
  }
  .main-demo.layout-demo .main-show div {
    background: #fff;
    border:1px solid #d3d3d3;
  }
  .main-demo.layout-demo {
    height: 300px;
    text-align: center;
    font-size: 16px;
  }
  .main-demo.layout-demo .main-show .content-demo {
    height: 600px;
    background: #fafafa;
    text-align: center;
  }
</style>

## 布局(一屏展示)

scroll-content自动补齐高宽度

(注意：1、已监控window.resize事件(因为窗口导致dom大小改变的情况不用管)；2、当相邻dom因为数据双向绑定发生大小改变，用户可执行elx-scroll-content组件resize方法实现滚动区域大小刷新)

### 基本用法1

::: demo 布局
```html
<template>
  <style>
    .main-demo.layout-demo {
      background-color: #fafafa
    }
    .main-demo.layout-demo .main-show div {
      background: #fff;
      border:1px solid #d3d3d3;
    }
    .main-demo.layout-demo {
      height: 300px;
      text-align: center;
      font-size: 16px;
    }
    .main-demo.layout-demo .main-show .content-demo {
      height: 600px;
      border: 0px;
      background: #eaeaea;
      text-align: center;
    }
  </style>
  <div class="main-demo layout-demo">
    <elx-main split-type="row">
      <elx-header>顶层内容顶层内容顶层内容顶层内容顶层内容顶层内容顶层内容顶层内容</elx-header>
      <div>自定义auto</div>
      <elx-scroll-content>
        <div class="content-demo">主内容（滚动）</div>
      </elx-scroll-content>
      <div>自定义auto</div>
      <elx-footer>底层内容</elx-footer>
    </elx-main>
  </div>
  <script>
    export default {
      data: function(){
        return {
        }
      },
      methods: {
      }
    }
  </script>
</template>
```
:::

### 基本用法2
::: demo 布局
```html
<template>
  <div class="main-demo layout-demo">
    <elx-main split-type="row">
      <elx-header>顶层内容</elx-header>
      <elx-scroll-content>
        <div class="content-demo">主内容（滚动）</div>
      </elx-scroll-content>
      <elx-footer>底层内容</elx-footer>
    </elx-main>
  </div>
  <script>
    export default {
      data: function(){
        return {
        }
      },
      methods: {
      }
    }
  </script>
</template>
```
:::

### 基本用法3
::: demo 布局
```html
<template>
  <div class="main-demo layout-demo">
    <elx-main split-type="row">
        <elx-header>顶层内容</elx-header>
        <elx-scroll-content split-type="col">
          <elx-aside style="width: 120px">侧边栏内容</elx-aside>
          <elx-scroll-content>
            <div class="content-demo">主内容（滚动）</div>
          </elx-scroll-content>
          <elx-aside style="width: 120px">侧边栏内容</elx-aside>
        </elx-scroll-content>
        <elx-footer>底层内容</elx-footer>
    </elx-main>
  </div>
  <script>
    export default {
      data: function(){
        return {
        }
      },
      methods: {
      }
    }
  </script>
</template>
```
:::

### 基本用法4
::: demo 布局
```html
<template>
  <div class="main-demo layout-demo">
    <elx-main split-type="row">
        <elx-header>顶层内容</elx-header>
        <elx-scroll-content split-type="col">
          <elx-aside style="width: 120px">侧边栏内容</elx-aside>
          <elx-scroll-content>
            <div class="content-demo">主内容（滚动）</div>
          </elx-scroll-content>
        </elx-scroll-content>
        <elx-footer>底层内容</elx-footer>
    </elx-main>
  </div>
  <script>
    export default {
      data: function(){
        return {
        }
      },
      methods: {
      }
    }
  </script>
</template>
```
:::

### 基本用法5
::: demo scroll布局
```html
<template>
  <div class="main-demo layout-demo">
    <elx-main split-type="col">
        <elx-aside style="width: 100px">侧边栏内容</elx-aside>
        <elx-scroll-content split-type="row">
          <elx-header>顶层内容</elx-header>
          <elx-scroll-content>
            <div class="content-demo">主内容（滚动）</div>
          </elx-scroll-content>
          <elx-footer>底层内容</elx-footer>
        </elx-scroll-content>
    </elx-main>
  </div>
  <script>
    export default {
      data: function(){
        return {
        }
      },
      methods: {
      }
    }
  </script>
</template>
```
:::


### elx-scroll-content说明
### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|split-type | 切分方式 | 'string' | (row：行；col:列) | 'row' |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
|resize | 大小发生改变时 | size |

### methods
| 方法 | 说明 | 回调参数 |
|---------- |-------- |---------- |
|resize | 刷新大小 |---------- |
