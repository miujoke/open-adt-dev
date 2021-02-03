<template>
  <div class="m_background">
    <Header></Header>

    <div class="m_enum" >
      <!--广告展示-->
      <el-row :data="electronicData">
        <el-col :span="8" v-for="electronic in electronicData" :key="electronic.eleId">
          <el-card :body-style="{ padding: '3px' }">
            <img :src="electronic.eleImg" class="image" style="height: 220px;">
            <div style="padding: 10px;">
              <span>{{ electronic.eleName }}</span>
              <div class="bottom clearfix">
                  <el-button type="text" class="button" @click="details(electronic)">查看详情</el-button>
                  <el-dialog title="广告详情" :visible.sync="EleDialog">

                    <div>
                      <img :src="detailsData.eleImg" style="width: 100%;height: 360px">
                    </div>
                    <br>
                    名称：<h2>{{ detailsData.eleName }}</h2>
                    <div style="height: 180px;">
                      优惠介绍：
                      <h2>
                        <p style="line-height: 2em;text-indent: 2em;">
                          {{ detailsData.eleIntroduce }}
                        </p>
                      </h2>
                    </div>

                    地址/联系方式：<h2>{{ detailsData.eleAddress }}</h2>
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
      EleDialog: false,
      electronicData: [{
        eleId: '',
        eleImg: '',
        eleName: '',
        eleIntroduce: '',
        eleAddress: ''
      }],
    }
  },
  methods: {
    getElectronic() {
      const _this = this
      this.$axios.get("/electronic/getElectronic").then(res => {
        _this.electronicData = res.data.data
        console.log(_this.electronicData)
      })
    },
    details(val) {
      this.EleDialog = true;
      this.detailsData = val
    }
  },
  created() {
    this.getElectronic()
  },
  name: "Electronic",
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
