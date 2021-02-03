<template>
  <div>
    <!--面包屑导航--->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>推荐广告管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="m_public">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入查找的内容" v-model="likeMainly.name" clearable @clear="getMainly">
            <el-button slot="append" icon="el-icon-search" @click="getLikeMainly"></el-button>
          </el-input>
        </el-col>
        <el-col span="4" style="margin-left: 50%">
          <el-button type="primary" @click="addDialogFormVisible = true">添加广告</el-button>
        </el-col>
      </el-row>

      <el-dialog title="添加广告" :visible.sync="addDialogFormVisible">
        <el-form :model="mainlyDataForm" :rules="mainlyRules" ref="mainlyDataForm" label-width="100px"
                 class="demo-ruleForm">

          <div>
            <!-- 文件上传模块-->
            <Upload @success="res => mainlyDataForm.img = res"></Upload>
            <el-form-item label="图片名称" prop="img">
              <el-input v-model="mainlyDataForm.img" disabled></el-input>
            </el-form-item>
          </div>

          <el-form-item label="名称" prop="name">
            <el-input v-model="mainlyDataForm.name"></el-input>
          </el-form-item>
          <el-form-item label="广告介绍" prop="introduce">
            <el-input v-model="mainlyDataForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="mainlyDataForm.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addMainly('mainlyDataForm')">添加</el-button>
            <el-button @click="addDialogFormVisible = false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!--公益列表-->
    <div>
      <el-table
          :data="mainlyData"
          style="width: 100%"
      >
        <el-table-column
            prop="id"
            label="ID"
            width="180">
        </el-table-column>

        <el-table-column
            prop="img"
            label="图片"
            width="180">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" style="width: 80px;height: 80px">
          </template>
        </el-table-column>

        <el-table-column
            prop="name"
            label="名称"
            width="180">
        </el-table-column>

        <el-table-column
            prop="introduce"
            label="广告介绍"
            width="180">
        </el-table-column>

        <el-table-column
            prop="address"
            label="地址"
            width="180">
        </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteMainly(scope.row.id)">删除</el-button>

            <!--publicDataForm = scope.row 弹出框获取当前行的数据-->
            <el-button type="primary" @click="dialogFormVisible = true;mainlyDataForm = scope.row">修改</el-button>
            <el-dialog title="修改广告信息" :visible.sync="dialogFormVisible">

              <div style="margin-left: 20%">
                <img :src="mainlyDataForm.img" alt="" style="width: 360px;height: 360px">
              </div>
              <el-form :model="mainlyDataForm" :rules="updateMainlyRules" ref="mainlyDataForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="mainlyDataForm.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="广告介绍" prop="introduce">
                  <el-input v-model="mainlyDataForm.introduce"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                  <el-input v-model="mainlyDataForm.address"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateMainly('mainlyDataForm')">修改</el-button>
                  <el-button @click="dialogFormVisible = false">取消</el-button>
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
                     @current-change=getMainly>
      </el-pagination>
    </div>

  </div>

</template>

<script>
import Upload from "@/components/Upload";
export default {
  components: {Upload},
  inject: ['reload'],
  data(){
    return{
      // 搜索变量
      likeMainly:{},
      mainlyData: [{
        id: '',
        img: '',
        name: '',
        introduce: '',
        address: ''

      }],

      mainlyDataForm: {
        id: '',
        img: '',
        name: '',
        introduce: '',
        address: ''
      },
      mainlyRules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'change'},
          {min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur'}
        ],
        introduce: [
          {required: true, message: '请输入介绍', trigger: 'change'},
          {min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'change'},
          {min: 3, max: 128, message: '长度在 3 到 128 个字符', trigger: 'blur'}
        ],
      },
      updateMainlyRules: {
        introduce: [
          {required: true, message: '请输入介绍', trigger: 'change'},
          {min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'change'},
          {min: 3, max: 128, message: '长度在 3 到 128 个字符', trigger: 'blur'}
        ],
      },
      currentPage: 1,
      total: 0,
      pageSize: 5,
      dialogFormVisible: false,
      addDialogFormVisible: false,

    }
  },
  methods:{
    updateMainly(forName) {
      this.$refs[forName].validate((valida) => {
        if (valida) {
          this.$axios.post("/mainly/updateMainly", this.mainlyDataForm).then(res => {
            let code = res.data.code;
            if (code === 200) {
              alert("修改成功")
            }
            this.reload()
          })
        }
      })

    },

    addMainly(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.$axios.post('/mainly/saveMainly', this.mainlyDataForm).then(res => {
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
    getMainly(currentPage) {
      const _this = this
      _this.$axios.get("/mainly/getMainly?currentPage=" + currentPage).then(res => {
        // console.log(res)
        _this.mainlyData = res.data.data.records
        console.log(_this.mainlyData)
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
        _this.currentPage = res.data.data.current

      })
    },
    deleteMainly(id) {
      const _this = this
      _this.$axios.post("/mainly/deleteMainly?id=" + id).then(res => {
        let code = res.data.code;
        if (code === 200) {
          alert("删除成功")
        } else {
          alert("删除失败")
        }
        this.reload()
      })
    },
    getLikeMainly() {
      alert("submit")
    }
  },
  // 启动页面展示数据
  created() {
    this.getMainly(1)
  },
}
</script>

<style scoped>
.m_public {
  margin-top: 20px;
}

.m_page {
  margin: 0 auto;
  text-align: center;
}

</style>
