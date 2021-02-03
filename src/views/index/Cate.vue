<template>
  <div class="m_background">
    <Header></Header>

    <div class="m_enum" >
      <!--广告展示-->
      <el-row :data="cateData">
        <el-col :span="8" v-for="cate in cateData" :key="cate.cid">
          <el-card :body-style="{ padding: '3px' }">
            <img :src="cate.cimg" class="image" style="height: 220px;">
            <div style="padding: 10px;">
              <span>{{ cate.cname }}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="details(cate)">查看详情</el-button>
                  <el-dialog title="广告详情" :visible.sync="CateDialog">

                    <div>
                      <img :src="detailsData.cimg" style="width: 100%;height: 360px">
                    </div>
                    <br>
                    名称：<h2>{{ detailsData.cname }}</h2>
                    <div style="height: 180px;">
                      优惠介绍：
                      <h2>
                        <p style="line-height: 2em;text-indent: 2em;">
                          {{ detailsData.cintroduce }}
                        </p>
                      </h2>
                    </div>

                    地址/联系方式：<h2>{{ detailsData.caddress }}</h2>
                  </el-dialog>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  data() {
    return {
      detailsData: {},
      CateDialog: false,
      cateData: [{
        cid: '',
        cimg: '',
        cname: '',
        cintroduce: '',
        caddress: ''
      }],
    }
  },
  methods: {
    getCate() {
      const _this = this
      this.$axios.get("/cate/getCate").then(res => {
        _this.cateData = res.data.data
        console.log(_this.cateData)
      })
    },
    details(val) {
      this.CateDialog = true;
      this.detailsData = val
    }
  },

  created() {
    this.getCate()
  },
  name: "Cate",
  components: {Header, Footer}
}
</script>

<style lang="scss" scoped>

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.m_enum{
  margin-left: 10%;
  margin-right: 10%;
}
.m_background{
  background-color: #545c64;
}

</style>
