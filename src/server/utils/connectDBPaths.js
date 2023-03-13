import mongoose from 'mongoose';
// import dotenv from 'dotenv'
// dotenv.config()
const connectToDBPaths = (handler) => async () => {
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    await mongoose.connect(process.env.NEXT_PUBLIC_LEARN_URI, {useNewUrlParser: true, useUnifiedTopology: true});
    return handler();
}

export default connectToDBPaths