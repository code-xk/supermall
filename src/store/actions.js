import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context,payload){
        return new Promise((resolve,reject) => {

        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if(oldProduct){  //数量加一
            // oldProduct.count += 1
            context.commit(ADD_COUNTER,oldProduct)
            resolve('当前商品数量加一')
        } else{          //添加新商品
            payload.count = 1
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART,payload)
            resolve('添加了新商品')
        }
        })
    }
}