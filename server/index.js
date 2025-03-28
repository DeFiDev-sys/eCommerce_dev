import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./db.js";
import express from "express";
import cors from "cors";

//Routes
import { productsRoutes } from "./router/productsRoute.js";
import { userRoutes } from "./router/userRoute.js";

//init server
connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

//send a google clent id res through an api
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_CLIENT_ID);
});

//create port to listen too
const port = 5000;

//testing the db is running
app.get("/", (req, res) => {
  res.send("Api is running");
});

//listening to the port
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
