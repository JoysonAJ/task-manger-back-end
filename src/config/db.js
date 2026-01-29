import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

/**
 * Connects to the MongoDB database.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws {Error} Throws an error if the connection fails.
 */

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the connection URI and database name
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        // Log a success message with the host of the connected database
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        // Log an error message if the connection fails
        console.log("MONGODB connection FAILED ", error);
        // Exit the process with a failure code
        process.exit(1);
    }
}

// Export the connectDB function as the default export of this module
export default connectDB;