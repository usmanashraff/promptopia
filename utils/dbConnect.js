import mongoose from "mongoose";

let isConnected = false;

async function connectToDB(){
    mongoose.set('strictQuery', true);
    if(isConnected)
        {
            console.log("db is already connected")
            return true;
        }

        try {
            await mongoose.connect(process.env.MONGO_URI, {
                dbName: 'share_prompt',
            })
            console.log('db connected')
            return true
        } catch (error) {
            console.log('error in connecting db', error);
            process.exit(1)
            return false
        }
}
export default connectToDB;