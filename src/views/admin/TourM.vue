<template>
  <div>
    <!--面包屑导航--->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告管理</el-breadcrumb-item>
      <el-breadcrumb-item>旅游胜地广告</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
name: "TourM"
}
</script>

<style scoped>

</style>
