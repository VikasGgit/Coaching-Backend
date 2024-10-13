import express, { urlencoded }  from "express";
import  dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const PORT= process.env.PORT
import sliderServices from "./services/slider.services.js"
import misServices from "./services/mischellenous.services.js"
import courseServices from "./services/course.services.js"
import { connnect } from "./db/connect.js";

const app = express();
connnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/slider', sliderServices); 
app.use('/api/mis', misServices); 
app.use('/api/course', courseServices); 

app.get('/', (req, res) => {
    res.send("Welcome to the channel")
})

app.listen(PORT, ()=>{
    console.log('Are you sure listening on port', PORT);
})