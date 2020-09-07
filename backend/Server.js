import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config";
import userRouter from "./routes/userRoute";
import productRouter from "./routes/productRoutes";
import cors from "cors";
import path from "path"

const PORT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());

app.use(cors());

dotenv.config();

//const mongoDbUrl = config.mongoDbUrl;
const mongoDbUrl = process.env.MONGODB_URI || "mongodb+srv://freezwiz:wizdoz@cluster0.fdboo.mongodb.net/shoppingcart?retryWrites=true&w=majority";

mongoose
    .connect(mongoDbUrl, {
        useCreateIndex     : true,
        useUnifiedTopology : true,
        useNewUrlParser    : true
    })
    .catch((err) => console.log(err));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

if(process.env.NODE_ENV==="production"){
    app.use(express.static("frontend/build"))
    app.get("*", (request, response)=>{
        response.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("Server now listening on port : " + PORT);
});
