<template>
  <div class="side-nav" :style="navStyle">
    <!-- <el-dropdown
      v-show="isComponentPage"
      trigger="click"
      class="nav-dropdown"
      :class="{ 'is-active': dropdownVisible }">
      <span>
        {{ langConfig.dropdown }}{{ version }}
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu
        slot="dropdown"
        :offset="-80"
        class="nav-dropdown-list"
        @input="handleDropdownToggle">
        <el-dropdown-item
          v-for="(item,key) in Object.keys(versions)" :key="key"
          @click.native="switchVersion(item)">
          {{ item }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <ul>
      <li class="nav-item" v-for="item in data">
        <a v-if="!item.path" @click="expandMenu">{{item.name}}</a>
        <router-link
          v-else
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name">
        </router-link>
        <ul class="pure-menu-list sub-nav" v-if="item.children">
          <li class="nav-item" v-for="navItem in item.children">
            <router-link
              class=""
              active-class="active"
              :to="base + navItem.path"
              exact
              v-text="navItem.title || navItem.name">
            </router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div class="nav-group" v-for="group in item.groups">
            <div class="nav-group__title" @click="expandMenu">{{group.groupName}}</div>
            <ul class="pure-menu-list">
              <li
                class="nav-item"
                v-for="navItem in group.list"
                v-if="!navItem.disabled">
                <router-link
                  active-class="active"
                  :to="base + navItem.path"
                  exact
                  v-text="navItem.title"></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
  import compoLang from '../i18n/component.json';
  import { version } from 'main/index.js';

  export default {
    props: {
      data: Array,
      base: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        highlights: [],
        navState: [],
        isSmallScreen: false,
        versions: [],
        version,
        dropdownVisible: false
      };
    },
    watch: {
      '$route.path'() {
        this.handlePathChange();
      }
    },
    computed: {
      navStyle() {
        return this.isSmallScreen ? { 'padding-bottom': '60px' } : {};
      },
      isComponentPage() {
        return /^component-/.test(this.$route.name);
      },
      langConfig() {
        return compoLang.filter(config => config.lang === this.$route.meta.lang)[0]['nav'];
      }
    },
    methods: {
      switchVersion(version) {
        if (version === this.version) return;
        location.href = `${ location.origin }/${ this.versions[version] }/${ location.hash } `;
      },
      handleResize() {
        this.isSmallScreen = document.documentElement.clientWidth < 768;
        this.handlePathChange();
      },
      handlePathChange() {
        if (!this.isSmallScreen) {
          this.expandAllMenu();
          return;
        }
        this.$nextTick(() => {
          this.hideAllMenu();
          let activeAnchor = this.$el.querySelector('a.active');
          let ul = activeAnchor.parentNode;
          while (ul.tagName !== 'UL') {
            ul = ul.parentNode;
          }
          ul.style.height = 'auto';
        });
      },
      hideAllMenu() {
        [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
          ul.style.height = '0';
        });
      },
      expandAllMenu() {
        [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
          ul.style.height = 'auto';
        });
      },
      expandMenu(event) {
        if (!this.isSmallScreen) return;
        let target = event.currentTarget;
        if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return;
        this.hideAllMenu();
        event.currentTarget.nextElementSibling.style.height = 'auto';
      },
      handleDropdownToggle(visible) {
        this.dropdownVisible = visible;
      }
    },
    created() {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = _ => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this.versions = JSON.parse(xhr.responseText);
        }
      };
      xhr.open('GET', '/versions.json');
      xhr.send();
    },
    mounted() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    }
  };
</script>
