// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongodb from 'mongodb'
import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { Learner} from '@/server/models/LearnerModel'
import yup from 'yup'
import jwt from 'jsonwebtoken'
import connectToDB from '@/server/utils/connectDB'
import { NextApiRequest, NextApiResponse } from 'next';
import {setCookie} from 'cookies-next';
dotenv.config()
const handler = async(req, res) => {
  if(req.method === 'POST'){
    try {
      // const {email, password} = req.body
      // let learnerLoginSchema = object({
      //   email: string().required().typeError("email not a string"),
      //   password: string().required().typeError("password not a string")
      // })
      // const Login = await learnerLoginSchema.validate(req.body)
      // if(error) {
      //   return res.status(400).send({message: error.details[0].message})
      // }

      const learner = await Learner.findOne({email: req.body.email})

      if(!learner) {
        return res.status(401).send({message: 'Email or password is incorrect. Please try again!'})
      }

      const correctPass = await bcrypt.compare(req.body.password, learner.password)
      if(!correctPass) {
        return res.status(401).send({message: 'Email or password is incorrect. Please try again!'})
      }

      const AuthToken = jwt.sign({name: learner.name, email: learner.email,  id: learner._id}, process.env.PRIVATE_KEY, {expiresIn: '3d'})
      setCookie('userToken', AuthToken, { req, res, maxAge: 60 * 60 * 24 * 3});
      res.status(200).send({data: {
        name: learner.name,
        email: learner.email,
      }, message: 'Logged In!'})
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

const validateLoginSchema = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("E-mail"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
} 
