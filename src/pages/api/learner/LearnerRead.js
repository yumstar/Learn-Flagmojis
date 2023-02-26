// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Learner} from '@/server/models/LearnerModel'
import jwt from 'jsonwebtoken'
import connectToDB from '@/server/utils/connectDB'
import { getCookie, hasCookie } from "cookies-next"
dotenv.config()
const handler = async(req, res) => {
  if(req.method === 'GET'){
    try {
      const userToken = getCookie("userToken", {req, res});
      jwt.verify(userToken, process.env.PRIVATE_KEY, function(err, decoded) {
        if(err) {
          res.status(500).send({message: "Error"})
        }
        const userId = decoded.id;
        Learner.findOne({_id: userId}).then((learner) => { return res.status(200).json({name: learner.name, email: learner.name})})
        .catch((error) => { return res.status(400).json({message: "error"})})
      })
      res.status(200).send(userToken)
    }
    catch(error) {
      res.status(400).send({message: "Error"})
    }
  }
  else {
    res.status(500).send({message: "Error"})
  }
}
export default connectToDB(handler)
