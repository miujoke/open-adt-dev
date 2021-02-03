<template>
  <div class="m_background">
    <div>
      <Header></Header>
    </div>
    <!--轮播图-->
    <el-carousel :interval="3000" type="card" height="260px" loop="true" indicator-position="outside">
      <el-carousel-item v-for="item in imagesBox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>

    <div class="m_enum" >
      <!--广告展示-->
      <el-row :data="mainlyData">
        <el-col :span="8" v-for="mainly in mainlyData" :key="mainly.id">
          <el-card :body-style="{ padding: '1px' }">
            <img :src="mainly.img" class="image" style="height: 220px;">
            <div style="padding: 10px;">
              <span>{{ mainly.name }}</span>
              <div class="bottom clearfix">

                <el-button type="text" class="button" @click="details(mainly)">查看详情</el-button>
                <el-dialog title="广告详情" :visible.sync="MainlyDialog">

                  <div>
                    <img :src="detailsData.img" style="width: 100%;height: 360px">
                  </div>
                  <br>
                  名称：<h2>{{ detailsData.name }}</h2>
                  <div style="height: 180px;">
                    优惠介绍：
                      <h2>
                        <p style="line-height: 2em;text-indent: 2em;">
                        {{ detailsData.introduce }}
                        </p>
                      </h2>
                  </div>

                  地址/联系方式：<h2>{{ detailsData.address }}</h2>
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
  components: {Header, Footer},
  name: "Index",
  data() {
    return {
      MainlyDialog: false,
      mainlyData: [{
        id: '',
        img: '',
        name: '',
        introduce: '',
        address: ''

      }],
      detailsData: {},
      imagesBox: [
        {id: 0, idView: require("../../assets/img/0.png")},
        {id: 1, idView: require("../../assets/img/2.png")},
        {id: 2, idView: require("../../assets/img/3.png")},
        {id: 3, idView: require("../../assets/img/1.png")},],
    }
  },
  methods: {
    getMainly() {
      const _this = this
      this.$axios.get("/mainly/getMainlyIndex").then(res => {
        _this.mainlyData = res.data.data
        console.log(_this.mainlyData)
      })
    },
    details(val) {
      this.MainlyDialog = true;
      this.detailsData = val
    }
  },
  created() {
    this.getMainly()
  },
}

</script>

<style scoped>

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.time {
  font-size: 13px;
  color: #999;
}

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
