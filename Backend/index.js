const express = require("express");
const {connection} = require("./db");
const cors = require("cors");
require('dotenv').config();
const {authetication} = require("./middleware/authentication")
const app = express()
const {userRouter}  = require("./router/user.router");
const {carRouter} = require("./router/car.router")
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To The Home Page")
})

app.use("/user",userRouter)
app.use(authetication)
app.use("/car",carRouter)


app.listen(process.env.PORT,async()=>{
    try{
        console.log(`Server is running ${process.env.PORT}`);
        await connection;
        console.log("DB is Connected");
    }
    catch(e){
        console.log("Error Message",e.message)
    }
})