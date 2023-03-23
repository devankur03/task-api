import express,{Express, Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();
const app : Express= express();

const PORT = process.env.PORT || 8001;

app.get("/",(req:Request, res:Response)=>{
    res.send("Task APis, Thanks")
})

app.listen(PORT);
