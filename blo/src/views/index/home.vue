<template>
  <el-row>
    <el-col :span="24" class="sticky">
      <base-Nav class="el-nav"></base-Nav>
    </el-col>
    <el-col :span="24">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
<style lang='scss' scoped>
.el-col{
  margin-bottom: 20px;
  .el-nav{
    box-shadow: 5px 4px 10px rgb(87, 87, 87);
  }
}
.sticky{
  position: sticky;/*吸顶效果*/
  top: 0;
  z-index: 9999;
}
</style>
