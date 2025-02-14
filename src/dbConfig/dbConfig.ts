import mongoose from "mongoose";

export async function ConnectDB() {
    try {

        mongoose.connect(process.env.MONGO_URI as string);
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('MongoDB connected');
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error, please make sure db is up and running: ', err)
            process.exit()
        })
    } catch (error) {
        console.log("Something went worng while connecting to DB")
        console.log(error)
    }
}