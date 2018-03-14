<template>
  <div id="app">
    <router-view v-if="$route.name === 'login'"></router-view>
    <el-container class="ql-wrapper" v-else>
      <el-aside
        class="ql-aside"
        :style="{
          background: asideBgColor,
          width: asideWidth + 'px'
        }">
        <router-link class="ql-logo" :to="{path: '/'}">
          <img src="./assets/img/logo.png" alt="">
          <h1 v-show="!isCollapse">Project Name</h1>
        </router-link>
        <el-menu
          class="ql-aside-menu"
          :router="true"
          :collapse="isCollapse"
          :default-active="activeIndex"
          :background-color="asideBgColor"
          text-color="#fff"
          mode="vertical">
          <el-menu-item index="/">
            <ql-icon name="home"></ql-icon>
            <span slot="title">首页</span>
          </el-menu-item>
          <template v-for="nav in menuList">
            <el-menu-item :index="nav.path" :key="nav.path" v-if="nav.name">
              <ql-icon :name="nav.icon"></ql-icon>
              <span slot="title">{{nav.label}}</span>
            </el-menu-item>
            <el-submenu :index="nav.label" :key="nav.path" v-if="nav.children">
              <template slot="title">
                <ql-icon :name="nav.icon"></ql-icon>
                <span slot="title">{{nav.label}}</span>
              </template>
              <el-menu-item :index="subNav.path" v-for="subNav in nav.children" :key="subNav.name">{{subNav.label}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="ql-header">
          <ql-icon :name="isCollapse ? 'menu-fold' : 'menu-unfold'" @click="handleMenuToggle" class="ql-header-toggle"></ql-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.title">{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown @command="handleCommand" class="ql-header-dropdown">
            <span class="dropdown-link">
              {{username}} <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pwd"><ql-icon name="lock"></ql-icon> 修改密码</el-dropdown-item>
              <el-dropdown-item divided command="logout"><ql-icon name="logout"></ql-icon> 注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="ql-main">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import navConfig from "./router/nav.config";
const ASIDE_WIDTH_MINI = 64;
const ASIDE_WIDTH_FULL = 220;
export default {
  name: "app",
  data() {
    return {
      asideBgColor: "#545c64",
      isCollapse: false,
      transitionName: "slide-left"
    };
  },

  computed: {
    ...mapGetters(["username"]),
    activeIndex() {
      return this.$route.path;
    },
    asideWidth() {
      return this.isCollapse ? ASIDE_WIDTH_MINI : ASIDE_WIDTH_FULL;
    },
    menuList() {
      const getPath = (menu, groupName) => {
        menu.forEach(item => {
          const name = item.name;
          let prefix = groupName ? `${groupName}/` : "";
          if (name) {
            item.path = `/${prefix}${name}`;
          }
          if (item.children) {
            getPath(item.children, item.groupName);
          }
        });
        return menu;
      };
      return getPath(navConfig);
    }
  },

  mounted() {},

  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  },

  methods: {
    handleMenuToggle() {
      this.isCollapse = !this.isCollapse;
    },
    handleMenuOpen() {
      this.asideWidth = ASIDE_WIDTH_FULL;
    },
    handleMenuClose() {
      this.asideWidth = ASIDE_WIDTH_MINI;
    },
    handleCommand(cmd) {
      if (cmd === "logout") {
        this.$store.dispatch("logout").then(() => {
          this.$router.push({ name: "login" });
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/common/transition.scss";
@import "./assets/scss/common/var.scss";
body {
  margin: 0;
  padding: 0;
}
html,
#app,
body,
.ql-wrapper,
.ql-aside {
  height: 100vh;
}

.ql-logo {
  height: $--header-height;
  line-height: $--header-height;
  display: block;
  overflow: hidden;
  img {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
  }
  h1 {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 6px;
    font-size: 20px;
    font-weight: 600;
  }
}
.ql-header {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  &-toggle {
    line-height: $--header-height;
    cursor: pointer;
    padding: 0 24px;
    transition: all 0.3s;
    &:hover {
      background: $--color-primary-light-9;
    }
  }
  &-dropdown {
    position: absolute;
    right: 0;
    .dropdown-link {
      line-height: $--header-height;
      cursor: pointer;
      display: inline-block;
      padding: 0 12px;
      transition: all 0.3s;
      &:hover {
        background: $--color-primary-light-9;
      }
    }
  }
}
.ql-aside {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.3s;
  position: relative;
  z-index: 10;
  .el-menu {
    border-right-color: #545c64;
  }
  .el-menu-item i {
    color: rgba(255, 255, 255, 0.65);
  }
}
.ql-main {
  background: #f0f2f5;
}
</style>
