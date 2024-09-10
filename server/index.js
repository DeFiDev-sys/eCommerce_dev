import dotenv from "dotenv"
dotenv.config()
import connectToDatabase from "./db.js";
import express from "express";
import cors from "cors"


//Routes
import { productsRoutes } from "./router/productsRoute.js";



//init server
connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productsRoutes);

//create port to listen too
const port = 5000;

//testing the db is running
app.get('/',(req,res)=>{
    res.send('Api is running');
});

//listening to the port
app.listen(port,() =>{
    console.log(`server is running on port: ${port}`)
});