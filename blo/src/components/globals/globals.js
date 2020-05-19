import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent=require.context(
'.',
false,
/base[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName=>{
//获取组件配置
const componentConfig=requireComponent(fileName)
//获取组件PascaCase命名
const componentName=upperFirst(camelCase(fileName.split('/').pop().replace(/\.\w+$/,''))
)
//全局注册组件
Vue.component(componentName,componentConfig.default||componentConfig)     
})