import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { ApiError } from "./utils/ApiError.js";

dotenv.config();

//App
const app = express();

// Port
const port = process.env.PORT || 5000;

// Middlerware 
app.use(express.json())



// Routes
import {router as healthcheckRouter} from './routes/healthcheck.route.js'
import {router as authenticationRouter} from './routes/auth.route.js'

app.use('/api/v1/' , healthcheckRouter)
app.use('/api/v1/auth' , authenticationRouter)



// Server and Database connection
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
