import mongoose from "mongoose";

export const connectDB = async() => {
   try {
     await mongoose.connect(process.env.MONGO_URL)
     const connection = mongoose.connection
 
    
 
     connection.on("error", (err) => {
         console.error(`MongoDB connection error: ${err.message}`)
         process.exit(1)
     })
   } catch (error) {
     console.error(`Error connecting to MongoDB: ${error.message}`)
     process.exit(1)
   }

}