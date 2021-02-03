<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

    <!-- 遍历定义的数组 asideMenu   noChildren:没有二级页面的  :index="item.path +''" :是因为index 应该为字符串 +'' 转为字符串 -->
    <el-menu-item :index="item.path +''" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <!-- item.icon 就是组件的图标-->
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- hasChildren：有二级页面的  -->
    <el-submenu :index="item.path +''" v-for="(item,index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem,subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          {{ subItem.label }}>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <!--
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
    -->

  </el-menu>
</template>

<script>
export default {
  // 计算属性 是否有二级页面
  computed: {
    noChildren() {
      return this.asideMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asideMenu.filter(item => item.children)
    }
  },

  data() {
    return {
      // 定义所边框的 菜单数组
      asideMenu: [
        {
          path: '/',
          name:'home',
          label: '首页',
          icon: 'home'
        },
        {
          path: '/user',
          name:'user',
          label: '用户管理',
          icon: 'user-solid'
        },
        {
          // 二级菜单
          label: '广告管理',
          icon: 's-shop',
          children: [
            {
              path: '/advertising1',
              name:'advertising1',
              label: '旅游胜地广告',
              icon: 'user'
            },
            {
              path: '/advertising2',
              name:'advertising2',
              label: '美食广告',
              icon: 'user'
            }
          ]
        },
        {
          path: '/qita',
          name:'qita',
          label: '其他',
          icon: 'user-solid',
        },
      ]
    }
  },

  methods: {
    clickMenu(item) {
      this.$store.commit('selectMenu', item)
    }
  },
  name: "ComponentAside"
}
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>