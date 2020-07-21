<template>
  <div class="elx-top-menu">
      <div
        :class="isOpen?'menuTitle open' : 'menuTitle'"
        @click="openMenu()">
        <span
          class="uex-icon-menu-card"
          style="margin-right: 10px"></span>
        <span>产品与服务</span>
        <svg
          id="menuLine"
          :class="isOpen?'menuLine show' : 'menuLine'"
          width="131px"
          height="2px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style="position: sticky;left: 0px;top:38px;z-index: 1;display: inherit;margin-top:-2px;" >
          <rect
            width="131"
            height="2"
            style="fill:#2F3C4E;stroke-width: 0;stroke:#2F3C4E;"/>
       </svg>
      </div>
      <transition name="menuFade">
        <div
          class="treeview-menu"
          v-show="isOpen">
        <!-- <div class="treeview-menu"> -->
          <ul :style="'padding-left:'+ulMargin+'px'">
            <li
              :style="'height:'+liMaxHeight[parseInt(index/eveLineNum)]+'px'"
              v-for="(item,index) in currentMenuData"
              class="firstTitle"
              >
                <dl>
                  <dt @click="changeMenu(item,index)">
                    <span
                      :class="item.menuIcon==''||item.menuIcon==null?'uex-icon-gather':item.menuIcon" style="margin-right: 10px;">
                    </span>
                    {{item.menuName}}
                  </dt>
                  <dd
                    v-for="(child,idx) in item.children"
                    :key="idx"
                    @click="changeMenu(child,index,child)">
                    {{child.menuName}}
                    <svg
                      id="selectLine"
                      class="selectLine"
                      width="124px"
                      height="40px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      style="position: absolute;left: 58px;">
                      <rect
                        width="100%"
                        height="40"
                        style="fill:none;stroke-width: 1px;stroke:#495465;"/>
                    </svg>
                  </dd>
              </dl>
            </li>
          </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'ElxTopMenu',
    componentName: 'ElxTopMenu',

    props: {
      menuData: {
        type: Array,
        default: []
      }
    },
    data: function() {
      return {
        currentMenuData: [],
        isOpen: false,
        liMaxHeight: [200],
        lineNum: 0,
        eveLineNum: 1
      };
    },
    methods: {
      openMenu: function() {
        this.isOpen = !this.isOpen;
      },
      closeMenu: function() {
        this.isOpen = false;
      },
      getLiMaxHeight: function() {
        this.getLineNum();
        this.liMaxHeight = [];
        for (var i = 0; i <= this.lineNum; i++) {
          var lineHeight = 0;
          for (var j = i * this.eveLineNum; j < this.eveLineNum * (i + 1) && j < this.currentMenuData.length; j++) {
            var height = (this.currentMenuData[j].children.length + 1) * 40;
            if (lineHeight === 0 || height > lineHeight) {
              lineHeight = height;
            }
          }
          this.liMaxHeight.push(lineHeight);
        }
      },
      getLineNum: function() {
        var w = document.body.clientWidth;
        this.eveLineNum = parseInt((w - 40) / 240, 10);
        this.lineNum = parseInt(this.currentMenuData.length / this.eveLineNum, 10);
      },
      changeMenu: function(item, index, child) {
        var menuData = this.menuData[index];
        this.$emit('change-menu', menuData, child);
        this.isOpen = false;
      },
      transMenuData: function(data) {
        for (var i in data) {
          if (data[i].children.length > 4) {
            data[i].children = data[i].children.slice(0, 4);
          }
        }
        this.currentMenuData = data;
      },
      getUlMargin: function() {
        var w = document.body.clientWidth;
        this.getLineNum();
        this.ulMargin = parseInt((w - 240 * this.eveLineNum) / 2, 10);
      }
    },
    watch: {
      menuData: function(val) {
        this.transMenuData(val);
        // this.getLiMaxHeight();
      }
    },
    created: function() {
      this.transMenuData(this.menuData);
      this.getUlMargin();
      // this.getLiMaxHeight();
    }
  };
</script>

