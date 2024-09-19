import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> { 
    // in ts void is used to indicate that the function can return any datatype
  
    // chieck if we have a connection to the database
    if (connection.isConnected) {
        console.log("Already connected");
        return;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        // console.log(db.connections);
        // console.log(db);
        connection.isConnected = db.connections[0].readyState;

        console.log("Connected to database");

    } catch (error) {
        console.log("Error connecting to database", error);

        process.exit(1)
    }

}

export default dbConnect;