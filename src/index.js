import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/db.js"
// Load environment variables from a .env file
dotenv.config({
    path: './.env'
})

/**
 * Connects to the MongoDB database and starts the Express server.
 *
 * @async
 * @function startServer
 * @returns {Promise<void>} A promise that resolves when the server is successfully started.
 * @throws {Error} Throws an error if the MongoDB connection fails.
 */
const startServer = async () => {
    try {
      // Connect to the MongoDB database
      await connectDB();
  
      // Start the Express server and listen on the specified port
      app.listen(process.env.PORT || 8000, () => {
        // Log a message indicating that the server is running and the port it's using
        console.log(` Server is running at port : ${process.env.PORT}`);
      });
    } catch (err) {
      // Log an error message if the MongoDB connection fails
      console.log("MONGO db connection failed !!! ", err);
    }
  };
  
  // Call the function to start the server
  startServer();
