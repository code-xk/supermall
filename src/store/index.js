import Vue from "vue"
import Vuex from "vuex"

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations,
        //mutations唯一的目的就是修改state中状态
        //mutations中的每个方法尽可能完成的事件比较单一一点。
        
            //find()方法 查找数组里第一个满足条件的值，并返回a
            //如果没有符合条件的元素返回undefind
            //例
            // let test = [1,2,3,4,5];
            // let a = test.find(item => item > 3);
            // console.log(a);   //打印4
      
    actions,
    getters
})

//3.挂载到vue实例上
export default store