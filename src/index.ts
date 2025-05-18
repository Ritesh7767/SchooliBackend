import app from './app'
import { connectDB } from './connectDB/connectDb'
import dotenv from 'dotenv'

dotenv.config()

connectDB()
.then(() => app.listen(Number(process.env.PORT) || 8080, "0.0.0.0", () => console.log("Server is listening at port ", process.env.PORT || 8080)))
.catch((error) => {
    console.error("Something went wrong, ", error)
    process.exit(-1)
})