import axios from "axios";

const $host = axios.create({
    baseURL:'https://kitchen-glow.com/'
})

export {
    $host,
}

