import axios from "axios"
export const sendApi = async (data, uri) => {
    return await axios.post(uri, data)
    // .then((res) => {return res.data})
    // .catch((error) => {return error})
} 