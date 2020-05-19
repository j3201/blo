<template>
    <el-container id="container">
        <el-aside style="width:120px;top:75px;" :class="{navBarWrap:navBarFixed}" >
            <!--方法一：使用事件委托，向子组件传递值，判断渲染全部，还是部分-->
            <!--方法二：使用路由传参，判定。具体实现待定；方法三：使用组件间通信-->
            <el-menu id="aside" mode="horizintal" @select="change"  :default-active="active" active-text-color="red">
                <template v-for="(menu,index) in menuList">
                    <el-menu-item class="item"  :key="index" :index="menu.id"><span>{{menu.name}}</span></el-menu-item>
                </template>
            </el-menu>
        </el-aside>
        <!--通过点击不同的索引获取不同的参数进行数据渲染-->
        <el-main :class="navBarFixed == true ? 'navBar' :''">
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
        </el-main>
    </el-container>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'
//若该组件中只用到一种模块，所以可以使用createNamespacedHelpers 创建基于某个命名空间辅助函数
//const {mapGetters,mapActions} = createNamespacedHelpers('contextModules')
export default {
    data () {
        return {
            active:"",
            navBarFixed:false,
            activeIndex:'2',
            broCount:30,
            info:20,
            x:0,
        }
    },
    created () {
         this.$store.dispatch('contextModules/getCard')//初试化卡片数据

         this.getList()//初始化导航栏
         this.active = this.$store.getters.showActive//初始化导航栏高亮
    },
    mounted() {
        window.addEventListener("scroll", this.hidemenu); //监听滚动事件
         //sessionStorage存储
        if(sessionStorage.getItem("active")!==null){
            this.active = sessionStorage.getItem('active')
        }
    },
    computed:{
        ...mapState('navModules',['menuList']),
        ...mapGetters('navModules',['showActive']),
        ...mapGetters('contextModules',['showCard'])
    },
    methods: {
        ...mapActions('navModules',['getList']),
        change(index){
            this.active=index
            sessionStorage.setItem('active',index)
            //切换不同的索引，通过actions获取不同的数据
            this.$store.dispatch('contextModules/getCard',index)
        },
        //使用js实现侧边栏顶部吸顶效果
        hidemenu() {
            const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
            //当滚动超过50时，实现吸顶效果（导航高度为50）
            if (scrollTop > 49) {
                this.navBarFixed = true
            }else{
                this.navBarFixed = false
            }
            
            //使用js取消侧边栏左侧吸顶效果
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            if (scrollLeft > 50) {
                this.BarFixed = true
            }else{
                this.BarFixed = false
            }
        }
    }
}
</script>
<style lang="scss" scoped>
#container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    .el-aside{
        height:672px;
        box-shadow: 0 0 5px rgb(223, 219, 219);
    }
    .el-menu{
        text-align: center;
        box-shadow:0 0 5px rgb(223, 219, 219);
        .el-menu-item{
            color: rgb(12, 12, 12)
        }
    }
    .el-main{
        width: 500px;
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
    }
}
.is-active{
    color: red
}
//吸顶效果
.navBarWrap {
    position: sticky;
    top: 65px;
    z-index:1000
 }
 .navBar{
     min-width:740px;
 }
.el-menu-item:hover{
    color: rgb(230, 20, 20)
}
</style>