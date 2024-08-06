import axios from "axios";

const $host = axios.create({
    baseURL:'http://193.53.127.64:5003/'
})

export {
    $host,
}