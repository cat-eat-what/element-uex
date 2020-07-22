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
    data: function() {
      return {
        currentData: [],
        currentNavOpen: this.navOpen,
        currentNavActive: this.navActive,
        childrenListLengthObj: {}
      };
    },
    methods: {
      getModelDetail: function(modelcode) {
        var i;
        var j;
        for (i in this.currentData) {
          if (this.currentData[i].modelcode === modelcode) {
            return {model: this.currentData[i], lvl: 0, parent: null};
          }
          if (this.currentData[i].children.length > 0) {
            for (j in this.currentData[i].children) {
              if (this.currentData[i].children[j].modelcode === modelcode) {
                return {model: this.currentData[i].children[j], lvl: 1, parent: this.currentData[i]};
              }
            }
          }
        }
      },
      isModelChildren: function(model) {
        var self = this;
        var child = null;
        if (model.children.length > 0) {
          var func = function(item) {
            for (var i in item.children) {
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
      expandNav: function(model) {
        this.currentNavOpen = model.modelcode;
        this.$emit('update:navOpen', this.currentNavOpen);
        this.changeOpen();
        var activeModel = this.isModelChildren(model);
        if (!activeModel) {
          if (model.children.length > 0) {
            this.currentNavActive = model.children[0].modelcode;
            this.$emit('update:navActive', this.currentNavActive);
            this.changeActive();
          }
        }
        this.$emit('nav-expand', model);
      },
      collapseNav: function(model) {
        for (var i in this.currentData) {
          this.currentData[i].open = false;
        }
        this.currentNavOpen = '';
        this.$emit('update:navOpen', this.currentNavOpen);
        this.$emit('nav-collapse', model);
      },
      navClick: function(model) {
        this.currentNavActive = model.modelcode;
        this.$emit('update:navActive', this.currentNavActive);
        this.changeActive(model);
      },
      calcStringPixelsCount: function(str) {
        var elementPixelsLengthRuler = document.createElement('span');
        elementPixelsLengthRuler.style.fontSize = '12px';
        elementPixelsLengthRuler.style.visibility = 'hidden';
        elementPixelsLengthRuler.style.display = 'inline-block';
        elementPixelsLengthRuler.style.wordBreak = 'break-all !important';
        document.body.appendChild(elementPixelsLengthRuler);
        elementPixelsLengthRuler.innerHTML = str;
        var width = elementPixelsLengthRuler.offsetWidth;
        document.body.removeChild(elementPixelsLengthRuler);
        return width;
      },
      getChildrenListLengthArr: function() {
        var childrenListLengthObj = {};
        this.currentData.map(function(model) {
          var strArr = model.children.map(function(item) {
            return typeof item.modelname === 'string' ? item.modelname : '';
          });
          childrenListLengthObj[model.modelcode] = 75 * strArr.length;
          return ;
        });
        this.childrenListLengthObj = childrenListLengthObj;
      },
      changeOpen: function() {
        for (var i in this.currentData) {
          if (this.currentData[i].modelcode === this.currentNavOpen) {
            this.currentData[i].open = true;
          } else {
            this.currentData[i].open = false;
          }
        }
      },
      changeActive: function() {
        var model = this.getModelDetail(this.currentNavActive);
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
        if (model) {
          this.$emit('nav-change', model.model);
        }
      },
      formatData: function() {
        var self = this;
        var fun = function(node) {
          if (!('open' in node)) {
            self.$set(node, 'open', false);
          }
          if (!('active' in node)) {
            self.$set(node, 'active', false);
          }
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            fun(node.children[i]);
          }
        };
        for (var i = 0;i < this.currentData.length; i++) {
          fun(this.currentData[i]);
        }
      }
    },
    watch: {
      data: function(val, oldVal) {
        if (JSON.stringify(this.data) !== JSON.stringify(this.currentData)) {
          this.currentData = this.data;
          this.formatData();
          this.getChildrenListLengthArr();
        }
      },
      currentData: function(val, oldVal) {
        if (JSON.stringify(this.data) !== JSON.stringify(this.currentData)) {
          this.$emit('update:data', JSON.parse(JSON.stringify(this.currentData)));
        }
      },
      navActive: function(val, oldVal) {
        if (this.currentNavActive !== val) {
          this.currentNavActive = val;
          this.changeActive();
        }
      },
      navOpen: function(val, oldVal) {
        if (this.currentNavOpen !== val) {
          this.currentNavOpen = val;
          this.changeOpen();
        }
      },
      currentNavActive: function(val, oldVal) {
        if (this.navActive !== val) {
          this.$emit('update:navActive', val);
        }
      },
      currentNavOpen: function(val, oldVal) {
        if (this.navOpen !== val) {
          this.$emit('update:navOpen', val);
        }
      }
    },
    created: function() {
      this.currentData = this.data;
      this.formatData();
      this.getChildrenListLengthArr();
      if (window.addEventListener) {
        window.addEventListener('resize', this.getChildrenListLengthArr);
      } else if (window.attachEvent) {
        window.attachEvent('resize', this.getChildrenListLengthArr);
      }
      this.changeOpen();
      this.changeActive();
    }
  };
</script>

