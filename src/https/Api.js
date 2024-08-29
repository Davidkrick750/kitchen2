import {$host} from "./index";
import { jwtDecode } from "jwt-decode";



export const auth0 = async () => {
    const {data} = await $host.post('api/user/auth0')
    localStorage.setItem('token1', data.token)
    return (data)
}
export const auth = async (password,email) => {
    const {data} = await $host.post('api/user/auth', {password,email})
    localStorage.removeItem("token")
    localStorage.setItem('token1', data.token)
    return (data)
}

export const check = async (UserId,ItemId) => {
    const {data} = await $host.post(`api/user/checkbasket`,{UserId,ItemId})
    return data
}

export const reg = async (password,email) => {
    const {data} = await $host.post('api/user/reg', {password,email})
    return (data)
}
export const get_any_Item = async () => {
    const {data} = await $host.post('api/user/get_any_Item')
    return data
}
export const getCategoriaAll = async (id) => {
    const {data} = await $host.post('api/user/getCategoriaAll')
    return data
}
export const getCategoriaOne = async (id) => {
    const {data} = await $host.post(`api/user/getCategoriaOne`,{id})
    return data
}
export const getItemOne = async (id) => {
    const {data} = await $host.get(`api/user/getItemOne/${id}`)
    return data
}
export const getBasketItemAll = async (UserId) => {
    const {data} = await $host.post('api/user/getBasketItemAll',{UserId})
    return data
}

export const updateOneBasketItemPlus = async (id) => {
    const {data} = await $host.put('api/user/updateOneBasketItemPlus',{id})
    return data
}
export const updateOneBasketItemMinus = async (id) => {
    const {data} = await $host.put('api/user/updateOneBasketItemMinus',{id})
    return data
}

export const createBasketItem = async (id) => {
    const {data} = await $host.post('api/user/createBasketItem',id)
    return data
}
export const createbasketitem = async (UserId,ItemId) => {
    const {data} = await $host.post('api/user/createbasketitem',{UserId,ItemId})
    return data
}
export const deleteBasketItem = async (id) => {
    const {data} = await $host.delete(`api/user/deleteBasketItem/${id}`)
    return data
}


export const createLove = async (UserId,ItemId) => {
    const {data} = await $host.post(`api/user/createLove`,{UserId,ItemId})
    return data
}
export const getLove = async (UserId) => {
    const {data} = await $host.post(`api/user/getLove`,{UserId})
    return data
}
export const deleteLove = async (id) => {
    const {data} = await $host.post(`api/user/deleteLove`,{id})
    return data
}

export const gellove_ = async (UserId,ItemId) => {
    const {data} = await $host.post(`api/user/gellove_`,{UserId,ItemId})
    return data
}

export const createOrder = async (UserId,adres,price1,Name,Familia,Phone,Mail) => {
    const {data} = await $host.post(`api/user/createOrder`,{UserId,adres,price1,Name,Familia,Phone,Mail})
    return data
}

export const getOrder = async (UserId) => {
    const {data} = await $host.post(`api/user/getOrder`,{UserId})
    return data
}
