<template>
        <div id="navMenu">
          <el-menu mode="horizontal" :default-active="$route.name" active-text-color="red" router @select='changeNav'>
            <template v-for="(item,index) in showNav">
              <el-menu-item  :key="index" :index="item.path"><span>{{item.name}}</span></el-menu-item>
            </template>
            <el-menu-item id="input" index="input"><el-input placeholder='搜CSDN'> <el-button siz="mini" slot="append" icon="el-icon-search"></el-button></el-input></el-menu-item>
            <el-menu-item id="button" index='create'><el-button class="navBt">创作中心</el-button></el-menu-item>
            <el-menu-item index="loginRes"><span>登录/注册</span></el-menu-item>
          </el-menu>
        </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
//该组件中只用到一种模块，所以可以使用createNamespacedHelpers 创建基于某个命名空间辅助函数
const {mapGetters,mapActions} = createNamespacedHelpers('navModules')
export default {
  data(){
    return {
    }
  },
  created(){
    this.getList()
  },
  computed:{
    ...mapGetters(['showNav'])
  },
  methods:{
    ...mapActions(['getList']),
    changeNav(index){
        sessionStorage.setItem('active','tuijian')
    }
  }
}
</script>
<style lang='scss' scoped>
$backColor:rgb(248, 246, 246);
$color:rgb(7, 7, 7);
$hoverColor:rgb(250, 4, 4);
#navMenu{
    width:auto;
    min-width: 1200px;
    background-color: $backColor;
  .el-menu{
    display: flex;
    width: 1200px;
    height: 50px;
    margin: 0 auto;
    border: 0;
    background-color: $backColor;
    .el-menu-item{
      height: 50px;
      line-height: 50px;
      color: $color
    }
    .navBt{
      height: 40px;
      border:0;
      background-color: $hoverColor;
      color: $color
    }
  }
  .el-menu-item:hover{
    background-color: $backColor;
    color: $hoverColor
  }
}
</style>
