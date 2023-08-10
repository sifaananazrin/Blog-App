import express from 'express'
import mongoose from 'mongoose';
import userRouter from "./routes/user-route"
import blogRouter from "./routes/blog.route"
import cors from "cors"
const app=express();
app.use(cors())
app.use(express.json()); //which type of data we are sending 




//middleware for Routes
app.use("/api/user",userRouter)
app.use("/api/blog",blogRouter)
mongoose.connect(`mongodb+srv://Shifana15:msnunusam12@cluster0.5dhdxwq.mongodb.net/`)
.then(()=>app.listen(5000))
.then(()=>console.log("Connect to Database and listening to Port 5000"))
.catch((err)=>console.log(err))

