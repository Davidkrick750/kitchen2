import axios from "axios";

const $host = axios.create({
    baseURL:'http://localhost:5003/'
})

export {
    $host,
}

