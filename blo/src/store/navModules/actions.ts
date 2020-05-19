import axios from 'axios'//异步操作
export default{
    getList(context){
        axios.get('/Json/navs.json').then((res)=>{
          context.commit('initNav',res.data.navList)
          context.commit('initAside',res.data.Menu)
        })
    }
}