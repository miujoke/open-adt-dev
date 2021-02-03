<template>
  <div>
  <!--面包屑导航--->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>广告管理</el-breadcrumb-item>
    <el-breadcrumb-item>电子广告</el-breadcrumb-item>
  </el-breadcrumb>

    <div class="m_public">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入查找的内容" v-model="likeEle.name" clearable @clear="getEle">
            <el-button slot="append" icon="el-icon-search" @click="getLikeEle"></el-button>
          </el-input>
        </el-col>
        <el-col span="4" style="margin-left: 50%">
          <el-button type="primary" @click="addDialogFormVisible = true">添加广告</el-button>
        </el-col>
      </el-row>

      <el-dialog title="添加广告" :visible.sync="addDialogFormVisible">
        <el-form :model="eleDataForm" :rules="eleRules" ref="eleDataForm" label-width="100px"
                 class="demo-ruleForm">

          <div>
            <!-- 文件上传模块-->
            <Upload @success="res => eleDataForm.eleImg = res"></Upload>
            <el-form-item label="图片名称" prop="eleImg">
              <el-input v-model="eleDataForm.eleImg" disabled></el-input>
            </el-form-item>
          </div>

          <el-form-item label="名称" prop="eleName">
            <el-input v-model="eleDataForm.eleName"></el-input>
          </el-form-item>
          <el-form-item label="广告介绍" prop="eleIntroduce">
            <el-input v-model="eleDataForm.eleIntroduce"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="eleAddress">
            <el-input v-model="eleDataForm.eleAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addEle('eleDataForm')">添加</el-button>
            <el-button @click="addDialogFormVisible = false">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!--公益列表-->
    <div>
      <el-table
          :data="eleData"
          style="width: 100%"
      >
        <el-table-column
            prop="eleId"
            label="ID"
            width="180">
        </el-table-column>

        <el-table-column
            prop="eleImg"
            label="图片"
            width="180">
          <!--插入图片链接的代码-->
          <template slot-scope="scope">
            <img :src="scope.row.eleImg" alt="" style="width: 80px;height: 80px">
          </template>
        </el-table-column>

        <el-table-column
            prop="eleName"
            label="名称"
            width="180">
        </el-table-column>

        <el-table-column
            prop="eleIntroduce"
            label="广告介绍"
            width="180">
        </el-table-column>

        <el-table-column
            prop="eleAddress"
            label="地址"
            width="180">
        </el-table-column>


        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteEle(scope.row.eleId)">删除</el-button>

            <!--publicDataForm = scope.row 弹出框获取当前行的数据-->
            <el-button type="primary" @click="dialogFormVisible = true;eleDataForm = scope.row">修改</el-button>
            <el-dialog title="修改广告信息" :visible.sync="dialogFormVisible">

              <div style="margin-left: 20%">
                <img :src="eleDataForm.eleImg" alt="" style="width: 360px;height: 360px">
              </div>
              <el-form :model="eleDataForm" :rules="updateEleRules" ref="eleDataForm" label-width="100px"
                       class="demo-ruleForm">
                <el-form-item label="名称" prop="eleName">
                  <el-input v-model="eleDataForm.eleName" disabled></el-input>
                </el-form-item>
                <el-form-item label="广告介绍" prop="eleIntroduce">
                  <el-input v-model="eleDataForm.eleIntroduce"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="eleAddress">
                  <el-input v-model="eleDataForm.eleAddress"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateEle('eleDataForm')">修改</el-button>
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
                     @current-change=getEle>
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
      likeEle:{},
      eleData: [{
        eleId: '',
        eleImg: '',
        eleName: '',
        eleIntroduce: '',
        eleAddress: ''

      }],

      eleDataForm: {
        eleId: '',
        eleImg: '',
        eleName: '',
        eleIntroduce: '',
        eleAddress: ''
      },
      eleRules: {
        eleName: [
          {required: true, message: '请输入名称', trigger: 'change'},
          {min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur'}
        ],
        eleIntroduce: [
          {required: true, message: '请输入介绍', trigger: 'change'},
          {min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur'}
        ],
        eleAddress: [
          {required: true, message: '请输入地址', trigger: 'change'},
          {min: 3, max: 128, message: '长度在 3 到 128 个字符', trigger: 'blur'}
        ],
      },
      updateEleRules: {
        eleIntroduce: [
          {required: true, message: '请输入介绍', trigger: 'change'},
          {min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur'}
        ],
        eleAddress: [
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
    updateEle(forName) {
      this.$refs[forName].validate((valida) => {
        if (valida) {
          this.$axios.post("/electronic/updateEle", this.eleDataForm).then(res => {
            let code = res.data.code;
            if (code === 200) {
              alert("修改成功")
            }
            this.reload()
          })
        }
      })

    },

    addEle(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.$axios.post('/electronic/saveEle', this.eleDataForm).then(res => {
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
    getEle(currentPage) {
      const _this = this
      _this.$axios.get("/electronic/getEle?currentPage=" + currentPage).then(res => {
        // console.log(res)
        _this.eleData = res.data.data.records
        console.log(_this.eleData)
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
        _this.currentPage = res.data.data.current

      })
    },
    deleteEle(id) {
      const _this = this
      _this.$axios.post("/electronic/deleteEle?id=" + id).then(res => {
        let code = res.data.code;
        if (code === 200) {
          alert("删除成功")
        } else {
          alert("删除失败")
        }
        this.reload()
      })
    },
    getLikeEle() {
      alert("submit")
    }
  },
  // 启动页面展示数据
  created() {
    this.getEle(1)
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

