import mongoose from "mongoose";

const connectToDatabase = async()=>{
    try {
        mongoose.set('strictQuery',false);
        const connect = await mongoose.connect(process.env.MONGODB_URL,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
        });
        console.log(`MongoDB is connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

export default connectToDatabase;