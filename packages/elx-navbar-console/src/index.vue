<template>
  <div class="elx-navbar-console">
    <div class="elx-navbar-console-content">
      <ul>
        <li
          v-for="model in currentData"
          :class="{
            open: model.open,
            active: model.active
          }">
          <div class="nav-title">
            <span
              v-if="!model.open"
              :class="'nav-icon ' + (model.images != '' && model.images && model.images != null ? model.images : 'uex-icon-default') + ' ' + (model.open ? 'open' : '')"
              @click="expandNav(model)">
            </span>
            <span
              class="nav-name"
              :class="{ open: model.open, active: model.active}"
              :style="{
                'width': (currentNavOpen && currentNavOpen != '' ? model.open : true) ? model.modelname.length * 12 + 4 + 'px' : '0px',
                'padding': (currentNavOpen && currentNavOpen != '' ? model.open : true) ? '0px 2px' : '0px'
              }"
              v-text="model.modelname"
              @click.stop.prevent="navClick(model)">
            </span>
            <span
              v-if="currentNavOpen && currentNavOpen != '' ?  false : !model.open"
              class="nav-expand uex-icon-logout"
              :class="model.open ? 'open' : ''"
              @click="expandNav(model)">
            </span>
            <span
              v-if="currentNavOpen && currentNavOpen != '' ? model.open : false"
              class="nav-collapse uex-icon-import"
              :class="model.open ? 'open' : ''"
              @click="collapseNav(model)">
            </span>
          </div>
          <div v-if ="model.open" class="split"></div>
          <div
            :style="{
              'width': model.open  && (model.children ? model.children.length > 0 : false) ? childrenListLengthObj[model.modelcode] + 'px' : '0px'
            }"
            :class="'nav-expand-nav ' + model.sideType">
            <ul>
              <li
                v-for="item in model.children"
                :class="{ open: item.open, active: item.active}"
                @click.stop.prevent="navClick(item)">
                <el-tooltip
                  effect="light"
                  placement="bottom"
                  :open-delay="500"
                  :content="item.modelname">
                  <span class="nav-name" v-text="item.modelname"></span>
                </el-tooltip>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxNavbarConsole',
    componentName: 'ElxNavbarConsole',

    props: {
      data: {
        type: Array,
        default: []
      },
      navActive: {
        type: String,
        default: ''
      },
      navOpen: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        currentData: [],
        currentNavOpen: this.navOpen,
        currentNavActive: this.navActive,
        childrenListLengthObj: {}
      };
    },
    methods: {
      getModelDetail(modelcode) {
        for (let i in this.currentData) {
          if (this.currentData[i].modelcode === modelcode) {
            return {model: this.currentData[i], lvl: 0, parent: null};
          }
          if (this.currentData[i].children.length > 0) {
            for (let j in this.currentData[i].children) {
              if (this.currentData[i].children[j].modelcode === modelcode) {
                return {model: this.currentData[i].children[j], lvl: 1, parent: this.currentData[i]};
              }
            }
          }
        }
      },
      isModelChildren(model) {
        const self = this;
        let child = null;
        if (model.children.length > 0) {
          const func = function(item) {
            for (let i in item.children) {
              if (item.children[i].modelcode === self.currentNavActive) {
                child = item.children[i];
              } else {
                func(item.children[i]);
              }
            }
          };
          func(model);
        }
        return child;
      },
      expandNav(model) {
        this.currentNavOpen = model.modelcode;
        this.$emit('update:navOpen', this.currentNavOpen);
        this.changeOpen();
        const activeModel = this.isModelChildren(model);
        if (!activeModel) {
          if (model.children.length > 0) {
            this.currentNavActive = model.children[0].modelcode;
            this.$emit('update:navActive', this.currentNavActive);
            this.changeActive();
          }
        }
        this.$emit('nav-expand', model);
      },
      collapseNav(model) {
        for (let i in this.currentData) {
          this.currentData[i].open = false;
        }
        this.currentNavOpen = '';
        this.$emit('update:navOpen', this.currentNavOpen);
        this.$emit('nav-collapse', model);
      },
      navClick(model) {
        this.currentNavActive = model.modelcode;
        this.$emit('update:navActive', this.currentNavActive);
        this.changeActive(model);
      },
      calcStringPixelsCount(str) {
        const elementPixelsLengthRuler = document.createElement('span');
        elementPixelsLengthRuler.style.fontSize = '12px';
        elementPixelsLengthRuler.style.visibility = 'hidden';
        elementPixelsLengthRuler.style.display = 'inline-block';
        elementPixelsLengthRuler.style.wordBreak = 'break-all !important';
        document.body.appendChild(elementPixelsLengthRuler);
        elementPixelsLengthRuler.innerHTML = str;
        const width = elementPixelsLengthRuler.offsetWidth;
        document.body.removeChild(elementPixelsLengthRuler);
        return width;
      },
      getChildrenListLengthArr() {
        const childrenListLengthObj = {};
        this.currentData.map(function(model) {
          const strArr = model.children.map(function(item) {
            return typeof item.modelname === 'string' ? item.modelname : '';
          });
          childrenListLengthObj[model.modelcode] = 75 * strArr.length;
          return ;
        });
        this.childrenListLengthObj = childrenListLengthObj;
      },
      changeOpen() {
        for (let i in this.currentData) {
          if (this.currentData[i].modelcode === this.currentNavOpen) {
            this.currentData[i].open = true;
          } else {
            this.currentData[i].open = false;
          }
        }
      },
      changeActive() {
        const model = this.getModelDetail(this.currentNavActive);
        if (model) {
          this.currentData.map(function(item) {
            if (model.lvl === 1) {
              item.active = item.modelcode === model.parent.modelcode;
              item.children.map(function(children) {
                children.active = children.modelcode === model.model.modelcode;
                return;
              });
            } else {
              item.active = item.modelcode === model.model.modelcode;
            }
            return;
          });
          this.$emit('nav-change', model.model);
        }
      },
      formatData() {
        const self = this;
        const fun = function(node) {
          if (!('open' in node)) {
            self.$set(node, 'open', false);
          }
          if (!('active' in node)) {
            self.$set(node, 'active', false);
          }
          if (node.children.length === 0) {
            return;
          }
          for (let i = 0; i < node.children.length; i++) {
            fun(node.children[i]);
          }
        };
        for (let i = 0;i < this.currentData.length; i++) {
          fun(this.currentData[i]);
        }
      }
    },
    watch: {
      data(val, oldVal) {
        if (JSON.stringify(this.data) !== JSON.stringify(this.currentData)) {
          this.currentData = this.data;
          this.formatData();
          this.getChildrenListLengthArr();
        }
      },
      currentData(val, oldVal) {
        if (JSON.stringify(this.data) !== JSON.stringify(this.currentData)) {
          this.$emit('update:data', JSON.parse(JSON.stringify(this.currentData)));
        }
      },
      navActive(val, oldVal) {
        if (this.currentNavActive !== val) {
          this.currentNavActive = val;
          this.changeActive();
        }
      },
      navOpen(val, oldVal) {
        if (this.currentNavOpen !== val) {
          this.currentNavOpen = val;
          this.changeOpen();
        }
      },
      currentNavActive(val, oldVal) {
        if (this.navActive !== val) {
          this.$emit('update:navActive', val);
        }
      },
      currentNavOpen(val, oldVal) {
        if (this.navOpen !== val) {
          this.$emit('update:navOpen', val);
        }
      }
    },
    created() {
      this.currentData = this.data;
      this.formatData();
      this.getChildrenListLengthArr();
      window.addEventListener('resize', this.getChildrenListLengthArr);
      this.changeOpen();
      this.changeActive();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.getChildrenListLengthArr);
    }
  };
</script>

