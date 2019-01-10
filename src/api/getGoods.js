import request from '@/api/request'

// 读取常用商品列表
export function getGoodsList(){
    return request({
        url:'/oftenGoods',
        method:'get',
        data:'',
    })
}
// 读取分类商品列表
export function getGoodsByType(){
    return request({
        url:'/typeGoods',
        method:'get',
        data:''
    })
}
