import axios from "axios"
import connectToDBPaths from "@/server/utils/connectDBPaths"
import { Learner } from "@/server/models/LearnerModel"
export const sendApi = async (data, uri) => {
    return await axios.post(uri, data)
}

const getLearnerPathsFunc = async() => {
    return await Learner.find({}).distinct("_id");
}

export const getLearnerPaths = async() => {
    const handler = connectToDBPaths(getLearnerPathsFunc);
    var ids = await handler();
    ids = ids.map((id) => {return id.toString()})
    // const ids = idsObj.learners;
    console.log(ids)
    return ids;
}