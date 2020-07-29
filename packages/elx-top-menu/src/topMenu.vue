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
          ref="menuDiv"
          class="treeview-menu"
          v-show="isOpen"> 
        <!-- <div
          ref="menuDiv"
          :class="isOpen?'treeview-menu show':'treeview-menu'"
          > -->
        <!-- <div class="treeview-menu"> -->
          <ul >
            <li
              :style="'height:'+liMaxHeight[parseInt(index/eveLineNum)]+'px;margin-left:'+ulMargin+'px'"
              v-for="(item,index) in currentMenuData"
              class="firstTitle"
              >
                <dl>
                  <dt @click="changeMenu(item,index)">
                    <span
                      :class="item.menuIcon==''||item.menuIcon==null?'uex-icon-gather':item.menuIcon" style="margin-right: 10px;">
                    </span>
                    <span>{{item.menuName}}</span>
                  </dt>
                  <dd
                    v-for="(child,idx) in item.children"
                    :key="idx"
                    @click="changeMenu(child,index,child)">
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
                    <span>{{child.menuName}}</span>
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
    data() {
      return {
        currentMenuData: [],
        isOpen: false,
        liMaxHeight: [200],
        lineNum: 0,
        eveLineNum: 1,
        menuWidth: 0,
        ulMargin: 0
      };
    },
    methods: {
      openMenu() {
        this.isOpen = !this.isOpen;
        setTimeout(()=>{
          this.menuWidth = this.$refs.menuDiv.clientWidth;
          console.log('menuWidth', this.menuWidth);
          this.getUlMargin();
        }, 50);
      },
      closeMenu() {
        this.isOpen = false;
      },
      getLiMaxHeight() {
        this.getLineNum();
        this.liMaxHeight = [];
        for (let i = 0; i <= this.lineNum; i++) {
          let lineHeight = 0;
          for (let j = i * this.eveLineNum; j < this.eveLineNum * (i + 1) && j < this.currentMenuData.length; j++) {
            const height = (this.currentMenuData[j].children.length + 1) * 40;
            if (lineHeight === 0 || height > lineHeight) {
              lineHeight = height;
            }
          }
          this.liMaxHeight.push(lineHeight);
        }
      },
      getLineNum() {
        // const w = document.body.clientWidth;
        this.eveLineNum = parseInt((this.menuWidth - 40) / 240, 10);
        this.lineNum = parseInt(this.currentMenuData.length / this.eveLineNum, 10);
      },
      changeMenu(item, index, child) {
        const menuData = this.menuData[index];
        this.$emit('change-menu', menuData, child);
        this.isOpen = false;
      },
      transMenuData(data) {
        for (let i in data) {
          if (data[i].children.length > 4) {
            data[i].children = data[i].children.slice(0, 4);
          }
        }
        this.currentMenuData = data;
      },
      getUlMargin() {
        // const w = document.body.clientWidth;
        this.getLineNum();
        this.ulMargin = parseInt((this.menuWidth - 240 * this.eveLineNum) / (this.eveLineNum + 1), 10);
      }
    },
    watch: {
      menuData(val) {
        this.transMenuData(val);
        // this.getLiMaxHeight();
      }
    },
    created() {
      this.transMenuData(this.menuData);
      // this.getLiMaxHeight();
    }
  };
</script>

