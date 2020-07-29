<template>
  <div class="menu-type elx-filter-item">
    <div class="menu-type-title" v-html="name">:</div>
    <div class="menu-type-content">
      <ul id="category">
        <li
          v-if="selectType === 'multi'"
          name="全选"
          value="all"
          :class="allSelected?'active allSelected':'allSelected'"
          @click="selectAll()">
           全选
         </li>
        <li
          v-for="(item, $index) in options"
          :class="item.selected?'active':''"
          :name="item.name"
          :value="item.value"
          :key="$index"
          @click="selectItem(item, $index)">
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
    data() {
      return {
        options: this.formatItem(),
        allSelected: false,
        values: []
      };
    },
    methods: {
      formatItem() {
        const options = [];
        for (let i = 0; i < this.items.length; i++) {
          options.push({
            name: this.items[i].name,
            value: this.items[i].value,
            selected: false
          });
        }
        return options;
      },
      selectItems(items) {
        this.values = [];
        let _index;
        for (let i in this.options) {
          this.options[i].selected = false;
        }
        if (this.selectType === 'multi') {
          for (let i in items) {
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
      selectItem(item, index) {
        const self = this;
        item.selected = !item.selected;
        if (this.selectType === 'multi') {
          if (item.selected) {
            this.values.push(this.items[index]);
          } else {
            this.values = this.values.filter(function(val) {
              return val !== self.items[index];
            });
          }
          this.allSelected = this.values.length === this.options.length;
        } else if (this.selectType === 'single') {
          this.values = [this.items[index]];
          for (let i in this.options) {
            if (Number(i) !== index) {
              this.options[i].selected = false;
            }
          }
        }
        this.$emit('select-item', this.values);
      },
      selectAll() {
        this.allSelected = !this.allSelected;
        this.values = [];
        for (let i = 0; i < this.items.length; i++) {
          this.options[i].selected = this.allSelected;
          if (this.allSelected) {
            this.values.push(this.items[i]);
          }
        }
        this.$emit('select-item', this.values);
      }
    },
    watch: {
      items() {
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

