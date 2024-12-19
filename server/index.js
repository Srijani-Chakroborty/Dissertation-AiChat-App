import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import {OpenAI} from "openai"
import openaiRoutes from "./routes/openai.js"
import authRoutes from "./routes/auth.js"

dotenv.config();
const app=express()
app.use(express.json())
app.use(helmet())

app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors())



const openai=new OpenAI({
    apiKey:process.env.OPEN_API_KEY,
})
export const openain=new OpenAI(openai)

app.use('/openai',openaiRoutes)
app.use('/auth', authRoutes)

const PORT=process.env.PORT||9000;
app.listen(PORT,()=>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})