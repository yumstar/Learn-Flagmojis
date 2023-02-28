import axios from "axios"
import https from 'https'
import http from 'http'
import connectToDBPaths from "@/server/utils/connectDBPaths"
import dbConnect from "@/server/utils/dbConnect"
import { Learner } from "@/server/models/LearnerModel"
export const sendApi = async (data, uri) => {
    return await axios.post(uri, data)
}
export const getData = async (uri) => {
//     var response;
//     const responses = await http.get({
//         hostname: 'localhost',
//         port: 3000,
//         path: uri,
//         agent: false
//     }, (res) => {response = res;})
//     return responses
const res = await axios.get(uri);
return res.data;
}
const getLearnerPathsFunc = async() => {
    return await Learner.find({}).distinct("_id");
}
const getLearnerInfoFunc = async(id) => {
    return await Learner.findById(id)
}

export const getLearnerPaths = async() => {
    const handler = connectToDBPaths(getLearnerPathsFunc);
    var ids = await handler();
    ids = ids.map((id) => {return id.toString()})
    // const ids = idsObj.learners;
    return ids;
}

export const getLearnerInfo = async(id) => {
    await dbConnect();
    return await Learner.findById(id)
}