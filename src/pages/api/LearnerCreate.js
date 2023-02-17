// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose"
import connectToDB  from '@/server/utils/connectDB'
import dotenv from "dotenv"
import bcrypt from 'bcrypt'
import { object, string} from 'yup';
import { Learner, validateSchema } from '@/server/models/LearnerModel.js'
// import clientPromise from '@/server/utils/mongodb'
dotenv.config()
const handler = async (req, res) => {
  // res.send(req.method)
  if(req.method == 'POST'){
    try {
      const {name, email, password} = req.body
      // let learnerSchema = object({
      //   name: string().required().typeError("Name not a string"),
      //   email: string().required().typeError("email not a string"),
      //   password: string().required().typeError("password not a string")
      // })
      // const Learner = await learnerSchema.validate(req.body)
      // const {error, value} = schema.validate(req.body)
      // res.send(value)
      // if(error) {
      //   return res.status(400)
      // }
      const learner = await Learner.findOne({email: req.body.email})
      if(learner) {
        return res.status(400).json({message: 'An account already exists with this email. Please use a different one.'})
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT))
      const hashedPass = await bcrypt.hash(req.body.password, salt)

      await Learner.create({name: req.body.name, email: req.body.email, password: hashedPass})
      res.status(200).json({message: 'Learner registered'})
    }
    catch(error) {
      return res.status(500).send("Error")
      // return res.status(500).json({message: "Error"})
    }
  }
  else {
    return res.status(500).json({message: "Error"})
  }
}

export default connectToDB(handler);

