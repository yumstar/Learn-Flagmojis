// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongodb from 'mongodb'
import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { Learner} from '@/server/models/LearnerModel'
import Joi from 'joi'
import { JsonWebToken } from 'jsonwebtoken'
dotenv.config()
export default async function handler(req, res) {
  if(req.method === 'POST'){
    try {
      const {error} = validateLoginSchema(req.body)
      if(error) {
        return res.status(400).send({message: error.details[0].message})
      }

      const learner = await Learner.findOne({email: req.body.email})
      if(!learner) {
        return res.status(400).send({message: 'Email or password is incorrect. Please try again!'})
      }

      const correctPass = await bcrypt.compare(req.body.password, learner.password)
      if(!correctPass) {
        return res.status(400).send({message: 'Email or password is incorrect. Please try again!'})
      }


      const AuthToken = JsonWebToken.sign({...learner, id: learner._id}, process.env.PRIVATEKEY, {expiresIn: '3d'})
      res.status(200).send({data: {
        name: learner.name,
        email: learner.email,
      }, token: AuthToken, message: 'Logged In!'})
    }
    catch(error) {
    }
  }
  else {
    res.status(500).send({message: "Error"})
  }
}

const validateLoginSchema = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("E-mail"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
} 
