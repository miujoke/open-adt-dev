<template>
<div>
  <!--面包屑导航--->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row :gutter="20" class="mgb20">
    <el-col :span="12"></el-col>
    <h3>广告分类比例</h3>
    <div style="background-color: white">
      <ve-pie></ve-pie>
    </div>
  </el-row>
</div>
</template>

<script>
export default {
name: "Index"
}
</script>

<style scoped>

</style>
