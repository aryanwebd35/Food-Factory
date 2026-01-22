import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect(process.env.DB_URI).then(() => console.log("DB Connected"));

}


