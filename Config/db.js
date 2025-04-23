import mongoose from 'mongoose';                                        // Import the Mongoose library for MongoDB object modeling

                                                                        // Asynchronous function to establish a connection to the MongoDB database
export const connectDB = async () => {
    try {
                                                                        // Use the MONGO_URI environment variable to connect
        const conn = await mongoose.connect(process.env.MONGO_URI);

                                                                        // If successful, log the host to which we are connected
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {                                                    // If there's an error during connection, log the error message
        console.error(`Error: ${error.message}`);
        process.exit(1);                                                 // 1 means exit with failure and 0 means success
    }
};
