<script>
  import TabNav from './tab-nav';
  import { cMessage } from 'packages/elx-menu/src/util';
  import { fullScreen, maximize, restore} from './process.screen';

  export default {
    name: 'ElxTabs',

    components: {
      TabNav
    },

    props: {
      type: String,
      activeName: String,
      closable: Boolean,
      addable: Boolean,
      value: {},
      editable: Boolean
    },

    data() {
      return {
        currentName: this.value || this.activeName,
        panes: []
      };
    },

    watch: {
      activeName(value) {
        this.setCurrentName(value);
      },
      value(value) {
        this.setCurrentName(value);
      },
      currentName(value) {
        if (this.$refs.nav) {
          this.$nextTick(_ => {
            this.$refs.nav.scrollToActiveTab();
          });
        }
      }
    },

    methods: {
      calcPaneInstances(isForceUpdate = false) {
        if (this.$slots.default) {
          const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
            vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElTabPane');
          // update indeed
          const panes = paneSlots.map(({ componentInstance }) => componentInstance);
          const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]));
          if (isForceUpdate || panesChanged) {
            this.panes = panes;
          }
        } else if (this.panes.length !== 0) {
          this.panes = [];
        }
      },
      handleTabClick(tab, tabName, event) {
        if (tab.disabled) return;
        this.setCurrentName(tabName);
        this.$emit('tab-click', tab, event);
      },
      handleTabRemove(pane, ev) {
        if (pane.disabled) return;
        ev.stopPropagation();
        this.$emit('edit', pane.name, 'remove');
        this.$emit('tab-remove', pane.name);
      },
      handleTabContextmenu(tab, tabName, event) {
        this.$emit('tab-contextmenu', tab, tabName, event);
      },
      handleTabAdd() {
        this.$emit('edit', null, 'add');
        this.$emit('tab-add');
      },
      setCurrentName(value) {
        const changeCurrentName = () => {
          this.currentName = value;
          this.$emit('input', value);
        };
        if (this.currentName !== value && this.beforeLeave) {
          const before = this.beforeLeave(value, this.currentName);
          if (before && before.then) {
            before
              .then(() => {
                changeCurrentName();
                this.$refs.nav && this.$refs.nav.removeFocus();
              }, () => {
                // https://github.com/ElemeFE/element/pull/14816
                // ignore promise rejection in `before-leave` hook
              });
          } else if (before !== false) {
            changeCurrentName();
          }
        } else {
          changeCurrentName();
        }
      },
      addPanes(item) {
        const index = this.$slots.default.indexOf(item.$vnode);
        this.panes.splice(index, 0, item);
      },
      removePanes(item) {
        const panes = this.panes;
        const index = panes.indexOf(item);
        if (index > -1) {
          panes.splice(index, 1);
        }
      }
    },
    render(h) {
      let {
        type,
        handleTabClick,
        handleTabRemove,
        handleTabContextmenu,
        handleTabAdd,
        currentName,
        panes,
        editable,
        addable
      } = this;

      const newButton = editable || addable
        ? (
          <span
            class="el-tabs__new-tab"
            on-click={ handleTabAdd }
          >
            <i class="el-icon-plus"></i>
          </span>
        )
        : null;

      const navData = {
        props: {
          currentName,
          onTabClick: handleTabClick,
          onTabRemove: handleTabRemove,
          onTabContextmenu: handleTabContextmenu,
          editable,
          type,
          panes
        },
        ref: 'nav'
      };

      return (
        <div class={{
          'el-tabs': true,
          'el-tabs--card': type === 'card',
          'el-tabs--border-card': type === 'border-card'
        }}>
          <div class="el-tabs__header">
            {newButton}
            {this.$slots.title}
            <tab-nav { ...navData }></tab-nav>
            {this.$slots.extra}
          </div>
          <div class="el-tabs__content">
            {this.$slots.default}
          </div>
        </div>
      );
    },
    created() {
      if (!this.currentName) {
        this.setCurrentName('0');
      }
      cMessage.receiveMessage(function(message) {
        if (typeof message.data === 'object' && !Array.isArray(message.data)) {
          if ('screen' in message.data) {
            const frame = message.source.frameElement;
            if (message.data.screen === 'fullScreen') {
              fullScreen(frame, frame);
            } else if (message.data.screen === 'maximize') {
              maximize(frame, frame);
            } else {
              restore(frame, frame, message.data.type);
            }
            if (window.top !== window.self) {
              cMessage.postMessage(message.data, window.location.origin, parent);
            }
          }
        }
      }, window.location.origin);
      if (!this.currentName) {
        this.setCurrentName('0');
      }

      this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true));
    },
    mounted() {
      this.calcPaneInstances();
    },

    updated() {
      this.calcPaneInstances();
    }

  };
</script>
