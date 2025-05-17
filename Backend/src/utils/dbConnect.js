import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then((db) => console.log("DB successfully connected : ", db.connection.host))
    .catch((err) => console.log("DB connection failed : ", err));
}

export default connectDB;