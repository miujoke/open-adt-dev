<template>
  <div>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item>
        <img class="m_logo" src="../assets/img/login.png">
      </el-menu-item>
      <el-menu-item index="Index">
        <router-link to="/index">首页</router-link>
      </el-menu-item>
      <el-menu-item index="Electronic">
        <router-link to="/electronic">电子产品</router-link>
      </el-menu-item>
      <el-menu-item index="Cate">
        <router-link to="/cate">美食</router-link>
      </el-menu-item>
      <el-menu-item index="Tour">
        <router-link to="/tour">旅游胜地</router-link>
      </el-menu-item>
      <el-menu-item index="PublicService">
        <router-link to="/publicService">公益</router-link>
      </el-menu-item>

      <div class="m_logout">
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
          个人信息
        </el-button>
        <el-drawer
            class="m_myself"
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false">
          <span>暂时没签名</span>
        </el-drawer>
        <el-button>
          <el-link @click="logout">退出</el-link>
        </el-button>
      </div>

    </el-menu>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: false,
      user: {
        username: "请先登录"
      }
    }
  },
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
  },
};
</script>

<style scoped>
.el-menu-demo {
  margin: 0 auto;
  text-align: center;
}

.m_logo {
  height: 90%;
  margin-top: 0px;
}

.m_logout {
  float: right;
  margin-top: 10px;
}


.router-link-active {
  text-decoration: none;
  font-size: 18px;
}

</style>
