<template>
       <div @click="change($event)" class="card">
           <el-card v-for="(title,index) in showCard" :key="index">
              <div><h1>{{title.name}}</h1></div>
              <div class='article'>{{title.instr}}</div>
              <div class="foot">
                <div>
                    <!--el-image加载本地图片方法-->
                    <el-avatar :src="require('../../../assets/head.jpeg')" fit='fill' size='medium'></el-avatar>
                    <span>{{title.auth}}</span>
                </div>
                <div style="float:right">
                    <div>
                        <i class="iconfont icon-zanpress"></i>
                        <span v-for="(count,index) in title.count" :key="index">{{count.zanCount}}</span>
                    </div>
                    <div>
                        <div class="iconfont icon-vertical_line"></div>
                        <i class="iconfont icon-xiaoxi"></i>
                        <span>{{broCount}}</span>
                    </div>
                    <div>
                        <div class="iconfont icon-vertical_line"></div>
                        <i class="iconfont icon-yanjing"></i>
                        <span>{{info}}</span>
                    </div>
                </div>
              </div>
           </el-card>
       </div>
</template>
<script>
import {createNamespacedHelpers} from 'vuex'
//该组件中只用到一种模块，所以可以使用createNamespacedHelpers 创建基于某个命名空间辅助函数
const {mapGetters,mapActions} = createNamespacedHelpers('contextModules')
export default {
    data () {
        return {
            activeIndex:'2',
            broCount:30,
            info:20,
            x:0,
        }
    },
    created () {
         this.getCard()
    },
    methods: {
        change(event){
            const e=event.target
            const p=e.currentTarget
            console.log(p)
            console.log(e.value)
            //用this.$refs.admin.style.color为什么会报错？
            if(e.className.includes('icon-zanpress')){
                if(this.x!=0){
                    e.nextElementSibling.innerHTML--
                    this.x=0
                }else{
                    e.nextElementSibling.innerHTML++
                }
            }
        },
        ...mapActions(['getCard'])
    },
    computed:{
        ...mapGetters(['showCard'])
    }
}
</script>
<style lang='scss' scoped>
$show:0 0 5px rgb(87, 87, 87);
.card{
    box-shadow:0 0 5px rgb(87, 87, 87);
    z-index:1000
}
.card::after{
    clear: both;
}
.el-card{
    border-bottom: 1px solid rgb(214, 211, 208);
    h1{
        height: 50px;
        margin:0;
        font-size: 30px;
    }
    .article{
        width: 721px;
        min-width: 721px;
        text-overflow: ellipsis;  /* ellipsis:显示省略符号来代表被修剪的文本  string:使用给定的字符串来代表被修剪的文本*/ 
        white-space: nowrap;   /* nowrap:规定段落中的文本不进行换行   */ 
        overflow: hidden; /*超出部分隐藏*/
        font-size: 10px;
        color: rgb(126, 124, 124)
    }
    .foot div{
        display: inline-block;
        margin-top:10px;
        span{
            margin-left: 7px;
            color: rgb(15, 94, 240)
        }
    }
}
.active{
    color: red
}
</style>