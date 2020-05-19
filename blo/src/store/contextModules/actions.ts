import axios from 'axios'//异步操作
export default{
  getCard(context,index){
    if(index===undefined){
      axios.get('/Json/tuijian.json').then((res)=>{
        context.commit('initCard',res.data.cards)
      })
    }else{
      const url = '/Json/'+index+".json"
      axios.get(url).then((res)=>{
        context.commit('initCard',res.data.cards)
      })
    }
  }
}