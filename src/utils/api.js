import axios from "axios"
export const sendApi = (data, uri) => {
    axios.post(uri, data)
    .then((res) => {return res.data})
    .catch((error) => {return error})
}  