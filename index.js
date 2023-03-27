const express =  require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userroute")
const { authorisation } = require("./routes/auth")
const { postRouter } = require("./routes/postroute")

const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(authorisation)
//Auth is before posts since it needs it to check
app.use("/posts",postRouter)
app.listen(process.env.Port,async(req,res)=>{
    try {
        await connection
        console.log(`server is running on ${process.env.Port}`)
    } catch (error) {
        console.log({"error":error.messege})
    }
})
