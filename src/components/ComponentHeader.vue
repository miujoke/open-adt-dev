<template>
  <header>
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
      <span class="el-dropdown-link">
        <img :src="userImg" class="userImg"/>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-remove-outline">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },

  data() {
    return {
      userImg: require('../assets/img/user.png')
    }
  },
  name: "ComponentHeader"
}
</script>

<style lang="scss" scoped>
header {
  display: flex; // 水平居中
  align-items: center; // 垂直居中
  height: 100%;
  justify-content: space-between; // 两边布局
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px; // 外边距
  }
}

.r-content {
  .userImg {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }
}
</style>
<style>
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  color: #fff;
}
</style>