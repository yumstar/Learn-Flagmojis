import mongoose from 'mongoose';

export const connectToDB = (handler) => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
    return handler(req, res);
}