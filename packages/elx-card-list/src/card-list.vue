<template>
  <div class="elx-card-list" @dblclick="cardDblclick(cardTitle)">
    <div class="card-image">
        <span :class="cardIcon"></span>
    </div>
    <div class="card-content">
        <div class="card-title">
            <span v-html="cardTitle"></span>
            <span>
                <slot name="cardState" :state="cardState"></slot>
            </span>
        </div>
        <div class="card-desc">
            <span v-html="cardDesc"></span> 
        </div>
        <ul class="base-data card-bottom">
            <li v-for="(item, index) in baseData" :key="index">
                <span class="card-label" v-html="item.label"></span>
                <span class="card-base-data" v-html="item.value"></span>
            </li>
        </ul>
    </div>
    <div class="card-right">
        <div>
            <div class="card-top card-operate">
                <slot name="cardOperate"></slot>
            </div>
            <div class="card-bottom">
                <span class="card-label" v-html="cardCreator.label"></span>
                <span class="card-base-data " v-html="cardCreator.value"></span>
            </div>
        </div>    
    </div>
</div>          
</template>

<script>
  export default {
    name: 'ElxCardList',

    props: {
      cardTitle: {
        type: String,
        default: '未知标题'
      },
      cardDesc: {
        type: String,
        default: '未知描述'
      },
      cardState: {
        type: String,
        default: ''
      },
      cardCreator: {
        type: Object,
        default: {label: '提供者', value: '未知提供者'}
      },
      baseData: {
        type: Array,
        default: []
      },
      cardIcon: {
        type: String,
        default: 'uex-icon-default'
      }
    },
    methods: {
      cardDblclick: function(cardTitle) {
        this.$emit('card-dblclick', cardTitle);
      }
    }
  };
</script>
