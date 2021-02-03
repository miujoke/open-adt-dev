<template>
  <div>

    <!--面包屑导航--->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="m_addUser">
      <!--添加用户-->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入查找的用户" v-model="likeUser.username" clearable @clear="getUser">
            <el-button slot="append" icon="el-icon-search" @click="getLikeUser"></el-button>
          </el-input>
        </el-col>
        <el-col span="4" style="margin-left: 50%">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="addUserRuleForm" :rules="addUserRules" ref="addUserRuleForm" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserRuleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserRuleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserRuleForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser('addUserRuleForm')">添加</el-button>
            <el-button @click="dialogFormVisible = false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
    <!--用户列表展示-->
    <div>
      <el-table style="width: 100%" :data="tableData">
        <el-table-column
            prop="id" label="用户id" width="180">
        </el-table-column>
        <el-table-column
            prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column
            prop="password" label="密码" width="180">
        </el-table-column>
        <el-table-column
            prop="email" label="邮箱" width="180">
        </el-table-column>

        <el-table-column label="操作" width="180">


          <template slot-scope="scope"><!--获取当前行的id-->
            <el-button @click="deleteUser(scope.row.id)">删除</el-button>

            <!--修改-->
            <el-button type="primary" @click="updateDialogFormVisible = true;updateUserRuleForm=scope.row">修改
            </el-button>
            <el-dialog title="修改用户" :visible.sync="updateDialogFormVisible">
              <el-form :model="updateUserRuleForm" :rules="updateUserRules" ref="updateUserRuleForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="updateUserRuleForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="updateUserRuleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="updateUserRuleForm.email"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateUser('updateUserRuleForm')">修改</el-button>
                  <el-button @click="updateDialogFormVisible = false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination class="m_page"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=getUser>
      </el-pagination>

    </div>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  data() {
    return {
      likeUser:{},
      tableData: [{
        id: '',
        username: '',
        password: '',
        email: ''
      }],

      currentPage: 1,
      total: 0,
      pageSize: 5,


      addUserRuleForm: {
        username: '',
        password: '',
        email: ''
      },
      updateUserRuleForm: {
        username: '',
        password: '',
        email: ''
      },
      // 规则
      addUserRules: {
        username: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {min: 3, max: 11, message: '长度在 3 到 11个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'change'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ]
      },
      updateUserRules: {
        password: [
          {required: true, message: '请输入密码', trigger: 'change'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ]
      },// 规则
      dialogFormVisible: false,
      updateDialogFormVisible: false,
    }


  },
  // 方法
  methods: {
    addUser(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.$axios.post('/user/saveUser', this.addUserRuleForm).then(res => {
            let code = res.data.code;
            // alert(code);
            if (code === 200) {
              alert("添加成功")
            }
            this.reload()
          })
        }
      });
    },

    // 修改用户
    updateUser(forName) {
      this.$refs[forName].validate((valida) => {
        if (valida) {
          this.$axios.post("/user/updateUser", this.updateUserRuleForm).then(res => {
            let code = res.data.code;
            if (code === 200) {
              alert("修改成功")
            }
            this.reload()
          })
        }
      })

    },
    // 获取用户列表方法
    getUser(currentPage) {
      const _this = this
      _this.$axios.get("/user/getUser?currentPage=" + currentPage).then(res => {
        // console.log(res)
        _this.tableData = res.data.data.records
        console.log(_this.tableData)
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
        _this.currentPage = res.data.data.current

      })
    },
    // 删除用户
    deleteUser(id) {
      const _this = this
      _this.$axios.post("/user/deleteUser?id=" + id).then(res => {
        let code = res.data.code;
        if (code === 200) {
          alert("删除成功")
        } else {
          alert("删除失败")
        }
        this.reload()
      })
    },
    getLikeUser() {
      alert("submit")
    }

  }, // 方法
  // 启动页面展示数据
  created() {
    this.getUser(1)
  }
}
</script>

<style lang="scss" scoped>
.m_addUser {
  margin-top: 20px;
}

.demo-ruleForm {
  max-width: 420px;
  margin: 0 auto;
}

.m_page {
  margin: 0 auto;
  text-align: center;
}
</style>
