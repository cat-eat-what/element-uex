<template>
  <div class="elx-top-menu" v-clickoutside="closeMenu">
      <div
        :class="isOpen?'menuTitle open' : 'menuTitle'"
        @click="openMenu()">
        <span
          class="uex-icon-menu-card"
          style="margin-right: 10px"></span>
        <span class="menu-title" v-text="menuTitle"></span>
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
          <div v-for="(menu,divIndex) in sliceMenuData" class="menuCol" :style="'margin-left:'+ulMargin+'px'">
            <div v-for="(item,index) in menu" class="firstMenu">
              <dl>
                    <dt @click="changeMenu(item, divIndex, index)" :style="item.url?'cursor: pointer':'cursor: default'">
                      <span
                        :class="item.menuIcon==''||item.menuIcon==null?'uex-icon-gather menuIcon':item.menuIcon + ' menuIcon'">
                      </span>
                      <span class="menuName">{{item.menuName}}</span>
                      <span :class="item.isOuter?'uex-icon-new-wins outerIcon':'outerIcon'"></span>
                    </dt>
                    <div v-for="(child,idx) in item.children"
                        :key="idx">
                      <el-tooltip :disabled="!child.tipShow" :content="child.menuName" placement="top" effect="light" :open-delay="delayTime">
                        <dd @click="changeMenu(item, divIndex, index, child)">
                            <svg
                              id="selectLine"
                              class="selectLine"
                              width="124px"
                              height="24px"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              style="position: absolute;">
                              <rect
                                width="100%"
                                height="24"
                                style="fill:none;stroke-width: 1px;stroke:#495465;z-index:-1"/>
                            </svg>
                            <span class="secMenu">{{child.menuNameShow}}</span>
                            <span :class="child.isOuter?'uex-icon-new-wins outerIcon':'outerIcon'"></span>
                        </dd>
                      </el-tooltip>
                    </div>
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
      menuTitle: {
        type: String,
        default: '产品与服务'
      },
      menuData: {
        type: Array,
        default: []
      },
      menuLength: {
        type: Number,
        default: 4
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
        colHeight: 0,
        delayTime: 500
      };
    },
    methods: {
      openMenu: function() {
        this.isOpen = !this.isOpen;
        setTimeout(()=>{
          this.menuWidth = this.$refs.menuDiv.clientWidth;
          this.getLineNum();
          // this.sliceMenuData = this.sliceMenu(this.currentMenuData, this.eveLineNum);
          this.sliceMenuData = this.sliceMenuByHeight(this.currentMenuData, this.eveLineNum);
          if (this.sliceMenuData.length !== this.eveLineNum) {
            this.eveLineNum = this.sliceMenuData.length;
          }
          this.getUlMargin();
        }, 50);
      },
      closeMenu: function() {
        this.isOpen = false;
      },
      getStrLength: function(val) {
        let len = 0;
        for (let i = 0; i < val.length; i++) {
          if (val.charCodeAt(i) > 127 || val.charCodeAt(i) === 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      },
      getLiMaxHeight: function() {
        this.getLineNum();
        this.liMaxHeight = [];
        for (let i = 0; i <= this.lineNum; i++) {
          let lineHeight = 0;
          for (let j = i * this.eveLineNum; j < this.eveLineNum * (i + 1) && j < this.currentMenuData.length; j++) {
            let height = (this.currentMenuData[j].children.length + 1) * 40;
            if (lineHeight === 0 || height > lineHeight) {
              lineHeight = height;
            }
          }
          this.liMaxHeight.push(lineHeight);
        }
      },
      getLineNum: function() {
        // let w = document.body.clientWidth;
        this.eveLineNum = parseInt((this.menuWidth - 40) / 240, 10);
        this.lineNum = parseInt(this.currentMenuData.length / this.eveLineNum, 10);
      },
      changeMenu: function(item, divIndex, index, child) {
        // lef menuData = this.menuData[index];
        let menuData = this.sliceMenuData[divIndex][index];
        this.$emit('change-menu', menuData, child);
        this.isOpen = false;
      },
      transMenuData: function(data, length) {
        for (let i in data) {
          if (data[i].children.length > length) {
            data[i].children = data[i].children.slice(0, length);
          }
          for (let j = 0; j < data[i].children.length; j++) {
            let strLength = this.getStrLength(data[i].children[j].menuName);
            data[i].children[j].menuNameShow = data[i].children[j].menuName;
            data[i].children[j].tipShow = false;
            if (data[i].children[j].isOuter) {
              if (strLength >= 12) {
                data[i].children[j].menuNameShow = data[i].children[j].menuName.substring(0, 5) + '...';
                data[i].children[j].tipShow = true;
              }
            } else {
              if (strLength >= 13) {
                data[i].children[j].menuNameShow = data[i].children[j].menuName.substring(0, 6) + '...';
                data[i].children[j].tipShow = true;
              }
            }
          }
        }
        this.currentMenuData = data;
      },
      getUlMargin: function() {
        // let w = document.body.clientWidth;
        this.ulMargin = parseInt((this.menuWidth - 240 * this.eveLineNum) / (this.eveLineNum + 1), 10);
      },
      getColheight: function(arr, size) {
        let totalHeight = 0;
        let colHeight = 0;
        for (let i = 0; i < arr.length; i++) {
          totalHeight += 14 * 2 + 40 + arr[i].children.length * 24;
        }
        colHeight = totalHeight / size;
        return colHeight;
      },
      sliceMenuByHeight: function(arr, size) {
        let result = [];
        let height = 0;
        let colArr = [];
        let allArr = [];
        let index = 0;
        let minHeight = 14 * 2 + 40 + 24 * 3;
        let isPush = false;
        let colHeight = this.getColheight(arr, size);
        let cnt = 0;
        for (let i = 0; i < arr.length ; i++) {
          if (cnt === size - 1) {
            if (!isPush) {
              colArr.push(arr[i]);
            }
            if (i === arr.length - 1) {
              result.push(colArr);
            }
          } else {
            if (height <= minHeight) {
              colArr.push(arr[i]);
              isPush = true;
            }
            height += 14 * 2 + 40 + arr[i].children.length * 24;
            if (height > colHeight + 120) {
              height = 14 * 2 + 40 + arr[i].children.length * 24;
              index = i - 1;
              if (isPush) {
                height = 0;
                index = i;
              }
              result.push(colArr);
              allArr.push.apply(allArr, colArr);
              colArr = [];
              cnt++;
              colHeight = this.getColheight(arr.slice(index), size - cnt);
            }
            if (!isPush) {
              colArr.push(arr[i]);
            }
          }
          isPush = false;
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
        return result;
      }
    },
    watch: {
      menuData: function(val) {
        this.transMenuData(val, this.menuLength);
        // this.getLiMaxHeight();
      }
    },
    created: function() {
      this.transMenuData(this.menuData, this.menuLength);
      // this.getLiMaxHeight();
    }
  };
</script>
