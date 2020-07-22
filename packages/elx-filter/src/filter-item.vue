<template>
    <div class="menu-type elx-filter-item">
      <div class="menu-type-title" v-html="name">:</div>
      <div class="menu-type-content">
        <ul id="category">
          <li v-if="selectType === 'multi'" @click="selectAll()" :class="allSelected?'active allSelected':'allSelected'" name="全选" value="all"> 全选 </li>
          <li @click="selectItem(item, $index)" :class="item.selected?'active':''" :name="item.name" :value="item.value" key="$index" v-for="(item, $index) in options">{{item.name}}</li> 
        </ul>
      </div>
  </div>
</template>

<script>
  var _ = require('underscore');
  export default {
    name: 'ElxFilterItem',
    componentName: 'ElxFilterItem',

    props: {
      name: {
        type: String,
        default: ''
      },
      items: {
        type: Array,
        default: []
      },
      selectType: {
        type: String,
        default: 'multi'
      }
    },
    data: function() {
      return {
        options: this.formatItem(),
        allSelected: false,
        values: []
      };
    },
    methods: {
      formatItem: function() {
        var options = [];
        for (var i = 0; i < this.items.length; i++) {
          options.push({
            name: this.items[i].name,
            value: this.items[i].value,
            selected: false
          });
        }
        return options;
      },
      selectItems: function(items) {
        this.values = [];
        var i, _index;
        for (i in this.options) {
          this.options[i].selected = false;
        }
        if (this.selectType === 'multi') {
          for (i in items) {
            _index = this.items.indexOf(items[i]);
            if (_index > -1) {
              this.options[_index].selected = true;
              this.values.push(this.items[i]);
            }
          }
          this.allSelected = this.values.length === this.options.length;
          this.$emit('select-item', this.values);
        } else if (this.selectType === 'single') {
          _index = this.items.indexOf(items[0]);
          if (_index > -1) {
            this.values = [this.items[_index]];
            this.options[_index].selected = true;
            this.$emit('select-item', this.values);
          }
        }
      },
      selectItem: function(item, index) {
        item.selected = !item.selected;
        if (this.selectType === 'multi') {
          if (item.selected) {
            this.values.push(this.items[index]);
          } else {
            this.values = _.without(this.values, this.items[index]);
          }
          this.allSelected = this.values.length === this.options.length;
        } else if (this.selectType === 'single') {
          this.values = [this.items[index]];
          for (var i in this.options) {
            if (Number(i) !== index) {
              this.options[i].selected = false;
            }
          }
        }
        this.$emit('select-item', this.values);
      },
      selectAll: function() {
        this.allSelected = !this.allSelected;
        this.values = [];
        for (var i = 0; i < this.items.length; i++) {
          this.options[i].selected = this.allSelected;
          if (this.allSelected) {
            this.values.push(this.items[i]);
          }
        }
        this.$emit('select-item', this.values);
      }
    },
    watch: {
      items: function() {
        this.options = this.formatItem();
        this.values = [];
        this.allSelected = false;
        this.$emit('select-item', this.values);
        this.$nextTick(function() {
          if (this.$parent) {
            if (this.$parent.refreshHeight) {
              this.$parent.refreshHeight();
            }
          }
        });
      }
    }
  };
</script>

