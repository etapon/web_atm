import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL)
        console.log("mongodb is connected...")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}
