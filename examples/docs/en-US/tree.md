<script>
  const data2 = [
    {
        "id": "paas_proc",
        "label": "程序",
        "children": [
            {
                "id": "paas_proc_2",
                "label": "流量经营哈哈哈哈哈哈",
                "children": [
                    {
                        "id": "paas_proc_21",
                        "label": "流量经营3u 互动呼呼呼呼",
                        "children": [
                            {
                                "id": "paas_proc_211",
                                "label": "流量经营31说为啥为啥为啥为啥为啥为啥",
                                "children": null
                            }
                        ]
                    }
                ]
            },
            {
                "id": "paas_proc_3",
                "label": "一经程序",
                "children": null
            },
            {
                "id": "paas_proc_4",
                "label": "话单统计",
                "children": null
            },
            {
                "id": "paas_proc_5",
                "label": "短彩信",
                "children": null
            },
            {
                "id": "paas_proc_6",
                "label": "营销活动",
                "children": null
            },
            {
                "id": "paas_proc_7",
                "label": "人均收入",
                "children": null
            },
            {
                "id": "paas_proc_tmp",
                "label": "临时文件夹",
                "children": null
            }
        ]
    }
  ];

  export default {
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
    },

    data() {
      return {
        data2: [],
        defaultExpandedKeys: ['paas_proc', 'paas_proc_6'],
        currentNodeKey: 'paas_proc'
      };
    },
    created: function(){
      var _self = this;
      _self.data2 = data2
    }
  };
</script>
<style>
.demo-tree .source{
  width:220px;
  height: 300px;
  overflow: auto;
}
</style>
### 自定义节点内容

::: demo 
```html
<elx-tree  
  @node-click="handleNodeClick" 
  :default-expanded-keys="defaultExpandedKeys" 
  :current-node-key="currentNodeKey"
  :data="data2"
  default-expand-all
  :expand-on-click-node="false">
</elx-tree>

<script>
  
</script>
```
:::

### Attributes
| 参数                    | 说明                                       | 类型                          | 可选值  | 默认值   |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| data                  | 展示数据                                     | array                       | —    | —     |
| props                 | 配置选项，具体看下表                               | object                      | —    | —     |
| current-node-key      | 当前选中节点的 key，只写属性                         | string, number              | —    | —     |
| default-expanded-keys | 默认展开的节点的 key 的数组                         | array                       | —    | —     |


### props
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| children | 子树属性名 | ------ | ---- | ---- |
| label | 节点标签属性名 | ------ | ---- | ---- |

### Events
| 事件名称           | 说明             | 回调参数                                     |
| -------------- | -------------- | ---------------------------------------- |
| node-click | 节点点击事件 | 返回节点node |
| right-click | 节点右键点击事件 | 返回节点node |
| add | 节点添加事件 | 返回节点node |
| remove | 节点删除事件 | 返回节点node |
| rename | 节点重命名事件 | 返回节点node |
