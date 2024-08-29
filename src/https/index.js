import axios from "axios";

const $host = axios.create({
    baseURL:'http://193.53.126.147:5003/'
})

export {
    $host,
}