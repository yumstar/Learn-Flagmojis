// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from "dotenv"
import mongoose from "mongoose"
import { Learner} from '@/server/models/LearnerModel'
import jwt from 'jsonwebtoken'
import connectToDB from '@/server/utils/connectDB'
dotenv.config()
const handler = async(req, res) => {
  if(req.method === 'GET'){
    try {
      res.status(200).send()
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
