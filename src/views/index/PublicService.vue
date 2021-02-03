<template>
  <div class="m_background">
    <Header></Header>

    <div class="m_enum" >
      <!--广告展示-->
      <el-row :data="publicsadtData">
        <el-col :span="8" v-for="publics in publicsadtData" :key="publics.psaId">
          <el-card :body-style="{ padding: '3px' }">
            <img :src="publics.psaImg" class="image" style="height: 220px;">
            <div style="padding: 10px;">
              <span>{{ publics.psaName }}</span>
              <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="details(publics)">查看详情</el-button>
                  <el-dialog title="广告详情" :visible.sync="PublicDialog">

                    <div>
                      <img :src="detailsData.psaImg" style="width: 100%;height: 360px">
                    </div>
                    <br>
                    名称：<h2>{{ detailsData.psaName }}</h2>
                    <div style="height: 180px;">
                      优惠介绍：
                      <h2>
                        <p style="line-height: 2em;text-indent: 2em;">
                          {{ detailsData.psaIntroduce }}
                        </p>
                      </h2>
                    </div>

                    地址/联系方式：<h2>{{ detailsData.psaAddress }}</h2>
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
      PublicDialog: false,
      publicsadtData: [{
        psaId: '',
        psaImg: '',
        psaName: '',
        psaIntroduce: '',
        psaAddress: ''
      }],
    }
  },
  methods: {
    getPublicsadt() {
      const _this = this
      this.$axios.get("/publicsadt/getPublicIndex").then(res => {
        _this.publicsadtData = res.data.data
        console.log(_this.publicsadtData)
      })
    },
    details(val) {
      this.PublicDialog = true;
      this.detailsData = val
    }
  },
  created() {
    this.getPublicsadt()
  },
  name: "PublicService",
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
