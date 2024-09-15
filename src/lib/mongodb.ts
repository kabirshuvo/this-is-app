import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database is Already Connected: -_-");
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Promotopea Database connection failed: ", error);
    process.exit(1);
  }
}
export default dbConnect;
