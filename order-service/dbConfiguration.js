import { mongoose } from 'mongoose'
import dotenv from 'dotenv';


dotenv.config()

const uri = process.env.MONGODB_URL

console.log("uri", uri)


export default async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("You connect to mongodb url")
    } catch (err) {
        console.error('❌ MongoDB error:', err)
    }

}

