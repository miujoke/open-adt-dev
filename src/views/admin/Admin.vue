<template>
  <el-container class="home-container">
    <!-- 头部-->
    <el-header>
      <div>
        <img src="">
        <span>OpenAdt广告投放系统</span>
      </div>
      <el-button class="m_logout">
        <el-link @click="logout">退出</el-link>
      </el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏-->
      <el-aside width="200px">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#6F6F6F"
            text-color="#fff"
            active-text-color="#fff"
            router
        >
          <!--一级菜单-->
          <el-menu-item index="indexM">
            <!--一级菜单区域模块-->
            <template slot="title">
              <!--图标-->
              <i class="el-icon-s-home"></i>
              <!--文本-->
              <span slot="title">系统首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="userM">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="mainlyM">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>推荐广告管理</span>
            </template>
          </el-menu-item>

          <el-submenu index="adtM">
            <template slot="title">
              <i class="el-icon-s-help"></i>
              <span>广告管理</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="eleM">
              <template slot="title">
                <i class="el-icon-s-platform"></i>
                <span>电子产品广告</span>
              </template>
            </el-menu-item>
            <el-menu-item index="cateM">
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>美食广告</span>
              </template>
            </el-menu-item>
            <el-menu-item index="tourM">
              <template slot="title">
                <i class="el-icon-s-opportunity"></i>
                <span>旅游胜地广告</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="publicM">
            <i class="el-icon-document"></i>
            <span slot="title">公益广告管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 页面主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
  methods: {
    logout() {
      const _this = this
      _this.$axios.post("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.headers)
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.m_logout {
  float: right;
  margin-top:4px;
}

.el-header {
  background-color: #444444;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #dddddd;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px
    }
  }
}

.el-aside {
  background-color: #6F6F6F;
}

.el-main {
  background-color: #dddddd;
}

</style>
