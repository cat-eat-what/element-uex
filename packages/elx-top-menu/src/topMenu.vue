<template>
  <div class="elx-top-menu" v-clickoutside="closeMenu">
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
          <!-- <ul >
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
                    <span class="menuName">{{item.menuName}}</span>
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
          </ul>  -->
          <div v-for="(menu,index) in sliceMenuData" class="menuCol" :style="'margin-left:'+ulMargin+'px'">
            <div v-for="(item,index) in menu" class="firstMenu">
              <dl>
                    <dt @click="changeMenu(item,index)" :style="item.url?'cursor: pointer':'cursor: default'">
                      <span
                        :class="item.menuIcon==''||item.menuIcon==null?'uex-icon-gather':item.menuIcon" style="margin-right: 10px;">
                      </span>
                      <span class="menuName">{{item.menuName}}</span>
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
                        style="position: absolute;">
                        <rect
                          width="100%"
                          height="40"
                          style="fill:none;stroke-width: 1px;stroke:#495465;"/>
                      </svg> 
                      <span>{{child.menuName}}</span>
                    </dd>
                </dl>
            </div>
          </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Clickoutside from 'element-uex/src/utils/clickoutside';
  export default {
    name: 'ElxTopMenu',
    componentName: 'ElxTopMenu',
    directives: { Clickoutside },
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
        eveLineNum: 1,
        menuWidth: 0,
        ulMargin: 0,
        sliceMenuData: [],
        colHeight: 0
      };
    },
    methods: {
      openMenu: function() {
        this.isOpen = !this.isOpen;
        setTimeout(()=>{
          this.menuWidth = this.$refs.menuDiv.clientWidth;
          console.log('menuWidth', this.menuWidth);
          this.getUlMargin();
          this.getColheight();
          // this.sliceMenuData = this.sliceMenu(this.currentMenuData, this.eveLineNum);
          this.sliceMenuData = this.sliceMenuByHeight(this.currentMenuData);
        }, 50);
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
        // var w = document.body.clientWidth;
        this.eveLineNum = parseInt((this.menuWidth - 40) / 240, 10);
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
        this.getUlMargin();
        console.log('transMenuData-sliceMenu', this.currentMenuData, this.eveLineNum);
        this.sliceMenuData = this.sliceMenu(this.currentMenuData, this.eveLineNum);
        console.log('transMenuData-sliceMenuData', this.sliceMenuData);

      },
      getUlMargin: function() {
        // var w = document.body.clientWidth;
        this.getLineNum();
        this.ulMargin = parseInt((this.menuWidth - 240 * this.eveLineNum) / (this.eveLineNum + 1), 10);
      },
      getColheight: function() {
        let totalHeight = 0;
        for (var i = 0; i < this.currentMenuData.length; i++) {
          totalHeight += 14 * 2 + 40 + this.currentMenuData[i].children.length * 40;
        }
        this.colHeight = totalHeight / this.eveLineNum;
        console.log('colHeight', this.colHeight);
      },
      sliceMenuByHeight: function(arr, size) {
        let result = [];
        let height = 0;
        let colArr = [];
        let allArr = [];
        for (let i = 0; i < arr.length ; i++) {
          height += 14 * 2 + 40 + arr[i].children.length * 40;
          if (height > this.colHeight) {
            height = 14 * 2 + 40 + arr[i].children.length * 40;
            result.push(colArr);
            allArr.push.apply(allArr, colArr);
            colArr = [];
          }
          colArr.push(arr[i]);
        }

        let newArray = [];
        arr.forEach(item => {
          if (!allArr.includes(item)) {
            newArray.push(item);
          }
        });

        if (newArray.length > 0) {
          if (result.length < size) {
            result.push(newArray);
          } else {
            result[result.length - 1].concat(newArray);
          }
        }

        return result;
      },
      sliceMenu: function(arr, size) {
        let result = [];
        for (let i = 0; i < Math.ceil(arr.length / size) ; i++) {
          let start = i * size;
          let end = start + size;
          result.push(arr.slice(start, end));
        }
        console.log('sliceMenu', result);
        return result;
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
      // this.getLiMaxHeight();
    }
  };
</script>

