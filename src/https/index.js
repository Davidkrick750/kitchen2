import axios from "axios";

const $host = axios.create({
    baseURL:'http://5.35.94.133:5003/'
})

const $authHost = axios.create({
    baseURL: 'http://5.35.94.133:5003/'
})




const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,

}