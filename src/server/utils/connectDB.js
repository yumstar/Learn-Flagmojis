import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const connectToDB = (handler) => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    await mongoose.connect(process.env.LEARN_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    return handler(req, res);
}

export default connectToDB