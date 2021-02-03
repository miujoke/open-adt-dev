<template>
<div>
  <!--面包屑导航--->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>广告管理</el-breadcrumb-item>
    <el-breadcrumb-item>美食广告</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
name: "CateM"
}
</script>

<style scoped>

</style>
