import axios from "axios";

const $host = axios.create({
    baseURL:'http://wet-love.com:8081/'
})

export {
    $host,
}